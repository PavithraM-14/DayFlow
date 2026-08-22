const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Company = require("../models/company.model");
const User = require("../models/user.model");
const PendingSignup = require("../models/pendingSignup.model");
const EmployeeRequest = require("../models/employeeRequest.model");
const { generateOtp } = require("../utils/otp");
const { sendSignupOtpEmail } = require("../utils/email");
const { signAuthToken } = require("../utils/token");
const {
  isValidEmail,
  validatePassword,
  validatePhone,
  isValidOtp,
} = require("../utils/validation");

const OTP_EXPIRY_MINUTES = PendingSignup.OTP_EXPIRY_MINUTES;
const MAX_OTP_ATTEMPTS = 5; // wrong codes before a resend is required
const MAX_OTP_SENDS = 5; // sends per staged sign-up
const BCRYPT_ROUNDS = 10;

const isProduction = () => process.env.NODE_ENV === "production";

// Dev-only convenience: when SMTP isn't configured, the code can be
// printed to the console and echoed back as `devOtp` so the sign-up flow
// is testable without real credentials. This is gated on TWO independent
// conditions, both of which must hold:
//   1) NODE_ENV must not be "production", and
//   2) EXPOSE_DEV_OTP must be explicitly set to "true".
// A single misconfigured/unset NODE_ENV can no longer leak a real
// verification code — someone would also have to deliberately opt in via
// EXPOSE_DEV_OTP. In production this is hard-disabled regardless of
// EXPOSE_DEV_OTP (see assertOtpDevExposureSafety, called at boot).
const devOtpExposureEnabled = () =>
  !isProduction() && process.env.EXPOSE_DEV_OTP === "true";

/**
 * Refuses to start if a production deploy has EXPOSE_DEV_OTP=true, so a
 * copy-pasted or leftover .env value can never leak real sign-up codes in
 * a live environment. Mirrors assertJwtSecret()'s fail-fast-at-boot shape.
 */
const assertOtpDevExposureSafety = () => {
  if (isProduction() && process.env.EXPOSE_DEV_OTP === "true") {
    console.error(
      "[AUTH] EXPOSE_DEV_OTP=true in production. Refusing to start — this " +
        "would leak sign-up verification codes in API responses and logs. " +
        "Remove EXPOSE_DEV_OTP from the production environment."
    );
    process.exit(1);
  }
};

const fail = (res, status, message, extra = {}) =>
  res.status(status).json({ success: false, message, ...extra });

/**
 * Puts a freshly generated code on the staged sign-up and emails it.
 *
 * When SMTP is not configured (local development) the code can be logged
 * to the server console and echoed back as `devOtp` so the flow is
 * testable without credentials — but only when devOtpExposureEnabled()
 * says so. See that function for the two-condition gate.
 */
const issueOtp = async (pending, { name, email }) => {
  const otp = generateOtp();

  pending.otp = otp;
  pending.otpTimestamp = new Date();
  pending.otpAttempts = 0;
  pending.otpSendCount = (pending.otpSendCount || 0) + 1;
  await pending.save();

  let delivered = false;
  try {
    const result = await sendSignupOtpEmail({
      email,
      otp,
      name,
      expiryMinutes: OTP_EXPIRY_MINUTES,
    });
    delivered = result.delivered;
  } catch (error) {
    // Do not leak SMTP internals to the client, but make the failure loud
    // in the logs — an undelivered code is not a successful send.
    console.error("[AUTH] Failed to send sign-up OTP email:", error.message);
    throw Object.assign(new Error("Could not send the verification email"), {
      status: 502,
    });
  }

  if (!delivered) {
    if (devOtpExposureEnabled()) {
      console.log(
        `[AUTH] SMTP not configured — verification code for ${email} is ${otp}`
      );
    } else {
      // Never print the raw code when exposure isn't explicitly enabled —
      // not even in development — so a stray log aggregator or shared
      // terminal can't leak it. Enable EXPOSE_DEV_OTP=true locally (see
      // .env.example) to see codes without real SMTP credentials.
      console.log(
        `[AUTH] SMTP not configured — verification email for ${email} was not sent`
      );
    }
  }

  return {
    emailDelivered: delivered,
    ...(devOtpExposureEnabled() && !delivered ? { devOtp: otp } : {}),
  };
};

/**
 * POST /api/auth/signup/hr/send-otp   (multipart/form-data)
 *
 * Validates the whole HR sign-up form, stages it, and emails a code.
 * Nothing is written to the Company/User collections at this point — see
 * verifyHrSignupOtp for that.
 */
const sendHrSignupOtp = async (req, res, next) => {
  try {
    const companyName = (req.body.companyName || "").trim();
    const name = (req.body.name || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const phone = (req.body.phone || "").trim();
    const { password } = req.body;

    // --- validation -----------------------------------------------------
    if (!companyName) return fail(res, 400, "Company name is required");
    if (!name) return fail(res, 400, "Name is required");
    if (!email) return fail(res, 400, "Email is required");
    if (!isValidEmail(email)) {
      return fail(res, 400, "Enter a valid email address");
    }

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.isValid) return fail(res, 400, phoneCheck.message);

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.isValid) return fail(res, 400, passwordCheck.message);

    // --- uniqueness -----------------------------------------------------
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return fail(res, 409, "An account with this email already exists");
    }

    const existingCompany = await Company.findOne({ name: companyName })
      .collation({ locale: "en", strength: 2 })
      .exec();
    if (existingCompany) {
      return fail(
        res,
        409,
        "This company is already registered. Ask its HR officer for an invite, or sign up as an employee."
      );
    }

    // --- stage the sign-up ----------------------------------------------
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const logo = req.file
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
          fileName: req.file.originalname,
        }
      : undefined;

    // A re-submitted form replaces the previous staged attempt, so the
    // record always reflects what the user last typed.
    let pending = await PendingSignup.findOne({ email }).select(
      "+otp +otpTimestamp +otpAttempts +otpSendCount +passwordHash"
    );

    if (pending) {
      pending.set({ companyName, name, phone, role: "hr", passwordHash });
      if (logo) pending.logo = logo;
      pending.otpSendCount = 0; // new form submission, fresh send budget
    } else {
      pending = new PendingSignup({
        email,
        name,
        phone,
        role: "hr",
        passwordHash,
        companyName,
        ...(logo ? { logo } : {}),
      });
    }

    const meta = await issueOtp(pending, { name, email });

    return res.status(200).json({
      success: true,
      message: "Verification code sent to your email",
      data: {
        email,
        expiresInMinutes: OTP_EXPIRY_MINUTES,
        ...meta,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/auth/signup/hr/resend-otp   { email }
 *
 * Re-issues a code against an already staged sign-up, so the user does
 * not have to retype the form.
 */
const resendHrSignupOtp = async (req, res, next) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();

    if (!isValidEmail(email)) {
      return fail(res, 400, "Enter a valid email address");
    }

    // `company: null` keeps this on the HR flow's own records: an
    // employee joining as an HR has role "hr" too, but always carries a
    // company reference.
    const pending = await PendingSignup.findOne({
      email,
      role: "hr",
      company: null,
    }).select(
      "+otp +otpTimestamp +otpAttempts +otpSendCount"
    );

    if (!pending) {
      return fail(
        res,
        404,
        "This sign-up has expired. Please fill in the form again."
      );
    }

    if ((pending.otpSendCount || 0) >= MAX_OTP_SENDS) {
      return fail(
        res,
        429,
        "Too many codes requested for this email. Please start the sign-up again in a few minutes."
      );
    }

    const meta = await issueOtp(pending, { name: pending.name, email });

    return res.status(200).json({
      success: true,
      message: "A new verification code is on its way",
      data: { email, expiresInMinutes: OTP_EXPIRY_MINUTES, ...meta },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/auth/signup/hr/verify-otp   { email, otp }
 *
 * The point where records actually get created: on a valid code the
 * staged sign-up becomes a Company plus its first User (role "hr"), and
 * the staging record is dropped.
 */
const verifyHrSignupOtp = async (req, res, next) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const otp = String(req.body.otp || "").trim();

    if (!isValidEmail(email)) {
      return fail(res, 400, "Enter a valid email address");
    }
    if (!isValidOtp(otp)) {
      return fail(res, 400, "Enter the 6-digit code from your email");
    }

    // `company: null` keeps this on the HR flow's own records: an
    // employee joining as an HR has role "hr" too, but always carries a
    // company reference.
    const pending = await PendingSignup.findOne({
      email,
      role: "hr",
      company: null,
    }).select(
      "+otp +otpTimestamp +otpAttempts +otpSendCount +passwordHash"
    );

    if (!pending) {
      return fail(
        res,
        404,
        "This sign-up has expired. Please fill in the form again."
      );
    }

    if (!pending.otp) {
      return fail(
        res,
        400,
        "No active code for this email. Please request a new one."
      );
    }

    if (!pending.isOtpValid(otp)) {
      pending.otpAttempts = (pending.otpAttempts || 0) + 1;

      // Burn the code once it has been guessed at too many times, so a
      // wrong-code loop cannot be used to brute-force it.
      if (pending.otpAttempts >= MAX_OTP_ATTEMPTS) {
        pending.otp = undefined;
        pending.otpTimestamp = undefined;
        await pending.save();
        return fail(
          res,
          429,
          "Too many incorrect attempts. Please request a new code."
        );
      }

      await pending.save();
      return fail(res, 400, "That code is invalid or has expired", {
        attemptsRemaining: MAX_OTP_ATTEMPTS - pending.otpAttempts,
      });
    }

    // Re-check uniqueness: someone else may have registered the same
    // email or company while this code was sitting in an inbox.
    if (await User.findOne({ email })) {
      await pending.deleteOne();
      return fail(res, 409, "An account with this email already exists");
    }

    let company;
    let user;

    try {
      company = await Company.create({
        name: pending.companyName,
        ...(pending.logo && pending.logo.data
          ? {
              logo: {
                data: pending.logo.data,
                contentType: pending.logo.contentType,
                fileName: pending.logo.fileName,
              },
            }
          : {}),
      });

      user = await User.create({
        name: pending.name,
        email: pending.email,
        phone: pending.phone,
        role: "hr",
        passwordHash: pending.passwordHash,
        company: company._id,
        emailVerifiedAt: new Date(),
      });
    } catch (error) {
      // Keep the two documents consistent: an orphaned company with no HR
      // officer would block that name from ever being registered again.
      if (company && !user) {
        await Company.deleteOne({ _id: company._id }).catch(() => {});
      }
      if (error.code === 11000) {
        return fail(
          res,
          409,
          "That company or email was just registered. Please sign in instead."
        );
      }
      throw error;
    }

    await pending.deleteOne();

    return res.status(201).json({
      success: true,
      message: "Email verified — your company and HR account have been created",
      data: {
        company: company.toJSON(),
        user: user.toJSON(),
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/auth/signup/employee/send-otp
 *   { companyId, role, name, email, phone, password }
 *
 * Step 1 of joining an existing company. Same staging trick as the HR
 * flow — nothing is written to users until the code is verified — except
 * the company already exists, so it is referenced rather than created.
 */
const sendEmployeeSignupOtp = async (req, res, next) => {
  try {
    const companyId = (req.body.companyId || "").trim();
    const role = (req.body.role || "").trim().toLowerCase();
    const name = (req.body.name || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const phone = (req.body.phone || "").trim();
    const { password } = req.body;

    // --- validation -----------------------------------------------------
    if (!companyId) return fail(res, 400, "Select your company");
    if (!mongoose.isValidObjectId(companyId)) {
      return fail(res, 400, "Select your company from the list");
    }
    if (!User.ROLES.includes(role)) {
      return fail(res, 400, "Select the role you are joining as");
    }
    if (!name) return fail(res, 400, "Name is required");
    if (!email) return fail(res, 400, "Email is required");
    if (!isValidEmail(email)) {
      return fail(res, 400, "Enter a valid email address");
    }

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.isValid) return fail(res, 400, phoneCheck.message);

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.isValid) return fail(res, 400, passwordCheck.message);

    const company = await Company.findById(companyId).select("name");
    if (!company) {
      return fail(res, 404, "That company is no longer registered");
    }

    // --- already known? -------------------------------------------------
    if (await User.findOne({ email })) {
      return fail(
        res,
        409,
        "An account with this email already exists. Try signing in instead."
      );
    }

    const openRequest = await EmployeeRequest.findOne({
      email,
      status: "pending",
    }).populate("company", "name");

    if (openRequest) {
      return fail(
        res,
        409,
        `You already have a request waiting for approval at ${
          openRequest.company?.name || "your company"
        }.`
      );
    }

    // --- stage it -------------------------------------------------------
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    let pending = await PendingSignup.findOne({ email }).select(
      "+otp +otpTimestamp +otpAttempts +otpSendCount +passwordHash"
    );

    if (pending) {
      // Re-submitting replaces the previous attempt, including switching
      // from an abandoned HR sign-up to an employee one.
      pending.set({
        name,
        phone,
        role,
        passwordHash,
        company: company._id,
        companyName: undefined,
        logo: undefined,
      });
      pending.otpSendCount = 0;
    } else {
      pending = new PendingSignup({
        email,
        name,
        phone,
        role,
        passwordHash,
        company: company._id,
      });
    }

    const meta = await issueOtp(pending, { name, email });

    return res.status(200).json({
      success: true,
      message: "Verification code sent to your email",
      data: {
        email,
        companyName: company.name,
        expiresInMinutes: OTP_EXPIRY_MINUTES,
        ...meta,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/auth/signup/employee/resend-otp   { email }
 */
const resendEmployeeSignupOtp = async (req, res, next) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();

    if (!isValidEmail(email)) {
      return fail(res, 400, "Enter a valid email address");
    }

    const pending = await PendingSignup.findOne({
      email,
      company: { $ne: null },
    }).select("+otp +otpTimestamp +otpAttempts +otpSendCount");

    if (!pending) {
      return fail(
        res,
        404,
        "This sign-up has expired. Please fill in the form again."
      );
    }

    if ((pending.otpSendCount || 0) >= MAX_OTP_SENDS) {
      return fail(
        res,
        429,
        "Too many codes requested for this email. Please start the sign-up again in a few minutes."
      );
    }

    const meta = await issueOtp(pending, { name: pending.name, email });

    return res.status(200).json({
      success: true,
      message: "A new verification code is on its way",
      data: { email, expiresInMinutes: OTP_EXPIRY_MINUTES, ...meta },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/auth/signup/employee/verify-otp   { email, otp }
 *
 * A valid code turns the staged sign-up into a join request for the
 * chosen company. Deliberately does NOT create a User — that only
 * happens when HR approves the request.
 */
const verifyEmployeeSignupOtp = async (req, res, next) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const otp = String(req.body.otp || "").trim();

    if (!isValidEmail(email)) {
      return fail(res, 400, "Enter a valid email address");
    }
    if (!isValidOtp(otp)) {
      return fail(res, 400, "Enter the 6-digit code from your email");
    }

    const pending = await PendingSignup.findOne({
      email,
      company: { $ne: null },
    }).select("+otp +otpTimestamp +otpAttempts +otpSendCount +passwordHash");

    if (!pending) {
      return fail(
        res,
        404,
        "This sign-up has expired. Please fill in the form again."
      );
    }

    if (!pending.otp) {
      return fail(
        res,
        400,
        "No active code for this email. Please request a new one."
      );
    }

    if (!pending.isOtpValid(otp)) {
      pending.otpAttempts = (pending.otpAttempts || 0) + 1;

      if (pending.otpAttempts >= MAX_OTP_ATTEMPTS) {
        pending.otp = undefined;
        pending.otpTimestamp = undefined;
        await pending.save();
        return fail(
          res,
          429,
          "Too many incorrect attempts. Please request a new code."
        );
      }

      await pending.save();
      return fail(res, 400, "That code is invalid or has expired", {
        attemptsRemaining: MAX_OTP_ATTEMPTS - pending.otpAttempts,
      });
    }

    // Re-check: an account or another request may have appeared while the
    // code sat in an inbox.
    if (await User.findOne({ email })) {
      await pending.deleteOne();
      return fail(res, 409, "An account with this email already exists");
    }

    const company = await Company.findById(pending.company).select("name");
    if (!company) {
      await pending.deleteOne();
      return fail(res, 404, "That company is no longer registered");
    }

    let request;
    try {
      request = await EmployeeRequest.create({
        name: pending.name,
        email: pending.email,
        phone: pending.phone,
        role: pending.role,
        passwordHash: pending.passwordHash,
        company: company._id,
        status: "pending",
        emailVerifiedAt: new Date(),
      });
    } catch (error) {
      // Trips the partial unique index on { email, status: 'pending' }.
      if (error.code === 11000) {
        await pending.deleteOne();
        return fail(
          res,
          409,
          "You already have a request waiting for approval."
        );
      }
      throw error;
    }

    await pending.deleteOne();

    return res.status(201).json({
      success: true,
      message: "Email verified — your request has been sent to your company's HR",
      data: {
        request: request.toJSON(),
        company: { _id: company._id, name: company.name },
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/auth/login   { email, password }
 *
 * Email + password for now; signing in with the employee Login ID comes
 * later (it needs an identifier on the User model first).
 *
 * On success the client gets a JWT plus the user, whose `role` decides
 * which dashboard the frontend lands on.
 */
const login = async (req, res, next) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    if (!email) return fail(res, 400, "Email is required");
    if (!isValidEmail(email)) {
      return fail(res, 400, "Enter a valid email address");
    }
    // Deliberately not run through validatePassword: the sign-up policy
    // must not be echoed back here, or the error text would tell an
    // attacker which guesses were even worth making.
    if (!password) return fail(res, 400, "Password is required");

    // passwordHash is `select: false` on the model, so it has to be asked
    // for explicitly.
    const user = await User.findOne({ email })
      .select("+passwordHash")
      .populate("company", "name");

    // One message for "no such account" and "wrong password" alike, so
    // the endpoint cannot be used to discover which emails are registered.
    const INVALID_CREDENTIALS = "Incorrect email or password";

    // No account yet — but there may be a join request under this email,
    // in which case the honest answer is "waiting on HR" or "rejected"
    // rather than "wrong password".
    //
    // The password is still checked first: telling a stranger that an
    // address has a pending request would leak exactly what the generic
    // message above exists to hide. Only the actual applicant, who can
    // produce the password, learns the status.
    if (!user) {
      const request = await EmployeeRequest.findOne({
        email,
        status: { $in: ["pending", "rejected"] },
      })
        .select("+passwordHash")
        .sort({ createdAt: -1 })
        .populate("company", "name");

      if (!request) return fail(res, 401, INVALID_CREDENTIALS);

      const requestPasswordMatches = await bcrypt.compare(
        password,
        request.passwordHash
      );
      if (!requestPasswordMatches) return fail(res, 401, INVALID_CREDENTIALS);

      const companyName = request.company?.name || "your company";

      if (request.status === "pending") {
        return fail(
          res,
          403,
          `Your request to join ${companyName} is still waiting for approval. ` +
            "You will be able to sign in once their HR accepts it.",
          { code: "REQUEST_PENDING", companyName }
        );
      }

      return fail(
        res,
        403,
        `Your request to join ${companyName} was rejected. ` +
          "Please contact your company's HR if you think this is a mistake.",
        { code: "REQUEST_REJECTED", companyName }
      );
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) return fail(res, 401, INVALID_CREDENTIALS);

    const token = signAuthToken(user);

    return res.status(200).json({
      success: true,
      message: "Signed in",
      data: {
        token,
        user: user.toJSON(),
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/auth/me
 *
 * Confirms a stored token is still good and returns fresh user details —
 * what the dashboard guard calls on load, so a deleted or edited account
 * cannot keep browsing on a token issued before the change.
 */
const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.sub).populate("company", "name");

    if (!user) return fail(res, 401, "Your session is no longer valid");

    return res.status(200).json({
      success: true,
      message: "",
      data: { user: user.toJSON() },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  sendHrSignupOtp,
  resendHrSignupOtp,
  verifyHrSignupOtp,
  sendEmployeeSignupOtp,
  resendEmployeeSignupOtp,
  verifyEmployeeSignupOtp,
  login,
  me,
  assertOtpDevExposureSafety,
  // Reused by employee.controller.js for the same dev-secret-exposure
  // tradeoff when emailing a temp password for an HR-created account.
  devOtpExposureEnabled,
  // exported for tests / reuse
  OTP_EXPIRY_MINUTES,
  MAX_OTP_ATTEMPTS,
};

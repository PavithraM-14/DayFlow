const bcrypt = require("bcryptjs");

const Company = require("../models/company.model");
const User = require("../models/user.model");
const PendingSignup = require("../models/pendingSignup.model");
const { generateOtp } = require("../utils/otp");
const { sendSignupOtpEmail } = require("../utils/email");
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

const isDev = () => process.env.NODE_ENV !== "production";

const fail = (res, status, message, extra = {}) =>
  res.status(status).json({ success: false, message, ...extra });

/**
 * Puts a freshly generated code on the staged sign-up and emails it.
 *
 * When SMTP is not configured (local development) the code is logged to
 * the server console and echoed back as `devOtp` so the flow is testable
 * without credentials. Both of those are suppressed in production.
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
    console.log(
      `[AUTH] SMTP not configured — verification code for ${email} is ${otp}`
    );
  }

  return {
    emailDelivered: delivered,
    ...(isDev() && !delivered ? { devOtp: otp } : {}),
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

    const pending = await PendingSignup.findOne({ email, role: "hr" }).select(
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

    const pending = await PendingSignup.findOne({ email, role: "hr" }).select(
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

module.exports = {
  sendHrSignupOtp,
  resendHrSignupOtp,
  verifyHrSignupOtp,
  // exported for tests / reuse
  OTP_EXPIRY_MINUTES,
  MAX_OTP_ATTEMPTS,
};

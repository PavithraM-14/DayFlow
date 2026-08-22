const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/user.model");
const Company = require("../models/company.model");
const Attendance = require("../models/attendance.model");
const { isValidEmail, validatePhone } = require("../utils/validation");
const { sendTempPasswordEmail } = require("../utils/email");

const fail = (res, status, message, extra = {}) =>
  res.status(status).json({ success: false, message, ...extra });

const BCRYPT_ROUNDS = 10;

// Same dev-only exposure gate the OTP flow uses (auth.controller.js) —
// reused here rather than duplicated, since it's the same class of
// tradeoff: a generated secret that must never leak in production or by
// a misconfigured NODE_ENV.
const { devOtpExposureEnabled } = require("./auth.controller");

/**
 * GET /api/employees
 *
 * HR's directory. Adds each employee's live status for today (present /
 * absent / on-leave) so the card grid doesn't need a second round trip.
 */
const listEmployees = async (req, res, next) => {
  try {
    const employees = await User.find({ company: req.auth.company })
      .populate("manager", "name")
      .sort({ name: 1 })
      .lean();

    const today = Attendance.dayKey();
    const todaysAttendance = await Attendance.find({
      company: req.auth.company,
      date: today,
    }).lean();

    const statusByEmployee = new Map(
      todaysAttendance.map((r) => [String(r.employee), r.status])
    );

    const rows = employees.map((emp) => ({
      ...emp,
      passwordHash: undefined,
      todayStatus: statusByEmployee.get(String(emp._id)) || "unmarked",
    }));

    return res.status(200).json({ success: true, data: { employees: rows } });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/employees/:id
 *
 * View-only detail, per the wireframe note ("cards open the employee
 * info page in a view-only mode"). HR can open anyone at their company;
 * an employee can only open their own record.
 */
const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return fail(res, 400, "Invalid employee id");

    if (req.auth.role !== "hr" && String(req.auth.sub) !== id) {
      return fail(res, 403, "You can only view your own profile");
    }

    const employee = await User.findOne({ _id: id, company: req.auth.company }).populate(
      "manager",
      "name jobPosition"
    );
    if (!employee) return fail(res, 404, "Employee not found");

    return res.status(200).json({ success: true, data: { employee: employee.toJSON() } });
  } catch (error) {
    return next(error);
  }
};

// Fields an employee may change on their own record. Everything else on
// this list is HR-only (see updateEmployee below).
const SELF_EDITABLE_FIELDS = ["phone", "address", "personalEmail", "about", "skills"];

// Fields HR may change on anyone at their company. Deliberately excludes
// email/role/company/passwordHash — those go through dedicated, more
// careful flows (or aren't editable at all) rather than a generic PATCH.
const HR_EDITABLE_FIELDS = [
  "name",
  "phone",
  "department",
  "jobPosition",
  "manager",
  "location",
  "dateOfJoining",
  "dateOfBirth",
  "gender",
  "maritalStatus",
  "nationality",
  "personalEmail",
  "address",
  "about",
  "skills",
  "bankDetails",
  "salary",
  "leaveAllocation",
];

/**
 * PATCH /api/employees/:id
 *
 * Per the spec: "Employees can edit limited fields ... Admin can edit
 * all employee details."
 */
const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return fail(res, 400, "Invalid employee id");

    const isSelf = String(req.auth.sub) === id;
    const isHr = req.auth.role === "hr";
    if (!isSelf && !isHr) {
      return fail(res, 403, "You can only edit your own profile");
    }

    const employee = await User.findOne({ _id: id, company: req.auth.company });
    if (!employee) return fail(res, 404, "Employee not found");

    const allowedFields = isHr ? HR_EDITABLE_FIELDS : SELF_EDITABLE_FIELDS;

    if (req.body.phone !== undefined) {
      const phoneCheck = validatePhone(req.body.phone);
      if (!phoneCheck.isValid) return fail(res, 400, phoneCheck.message);
    }
    if (req.body.personalEmail && !isValidEmail(req.body.personalEmail)) {
      return fail(res, 400, "Enter a valid personal email address");
    }
    if (isHr && req.body.manager && !mongoose.isValidObjectId(req.body.manager)) {
      return fail(res, 400, "Invalid manager id");
    }

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        employee.set(field, req.body[field]);
      }
    });

    await employee.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated",
      data: { employee: employee.toJSON() },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/employees   { name, email, role, department, jobPosition, ... }
 *
 * HR creating an employee directly, per the spec's note: "Normal user
 * cannot register, so when HR/Admin creates a new user/employee, their
 * ID should also be created ... password should be auto generated for
 * the first time." A random password is generated, emailed, and never
 * returned in the response — matching the same production-safety rule
 * the sign-up OTP flow follows (see auth.controller.js's issueOtp).
 */
const createEmployee = async (req, res, next) => {
  try {
    const name = (req.body.name || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const role = (req.body.role || "employee").trim().toLowerCase();

    if (!name) return fail(res, 400, "Name is required");
    if (!isValidEmail(email)) return fail(res, 400, "Enter a valid email address");
    if (!User.ROLES.includes(role)) return fail(res, 400, "Invalid role");

    if (await User.findOne({ email })) {
      return fail(res, 409, "An account with this email already exists");
    }

    const company = await Company.findById(req.auth.company);
    if (!company) return fail(res, 404, "Company not found");

    const tempPassword = crypto.randomBytes(9).toString("base64url"); // 12 chars
    const passwordHash = await bcrypt.hash(tempPassword, BCRYPT_ROUNDS);

    const employee = await User.create({
      name,
      email,
      phone: req.body.phone || "",
      role,
      passwordHash,
      company: company._id,
      department: req.body.department || "",
      jobPosition: req.body.jobPosition || "",
      location: req.body.location || "",
      manager: mongoose.isValidObjectId(req.body.manager) ? req.body.manager : null,
      dateOfJoining: req.body.dateOfJoining ? new Date(req.body.dateOfJoining) : new Date(),
      emailVerifiedAt: new Date(), // HR is vouching for this address directly
    });

    let delivered = false;
    try {
      const result = await sendTempPasswordEmail({
        email,
        name,
        tempPassword,
        loginId: employee.loginId,
        companyName: company.name,
      });
      delivered = result.delivered;
    } catch (error) {
      console.error("[EMPLOYEE] Failed to send temp-password email:", error.message);
    }

    if (!delivered) {
      // Same gate as OTP exposure: never print a real secret unless a
      // human has explicitly opted into it for local testing.
      if (devOtpExposureEnabled()) {
        console.log(
          `[EMPLOYEE] SMTP not configured — temp password for ${email} is ${tempPassword}`
        );
      } else {
        console.log(
          `[EMPLOYEE] SMTP not configured — temp-password email for ${email} was not sent`
        );
      }
    }

    return res.status(201).json({
      success: true,
      message: delivered
        ? `${employee.name}'s account was created and their temporary password was emailed to them`
        : `${employee.name}'s account was created. Email delivery is not configured, so they'll need the password from your server logs (dev) or a manual reset.`,
      data: { employee: employee.toJSON() },
    });
  } catch (error) {
    return next(error);
  }
};

/** PATCH /api/employees/:id/avatar (multipart, field "avatar") */
const updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return fail(res, 400, "Invalid employee id");

    const isSelf = String(req.auth.sub) === id;
    if (!isSelf && req.auth.role !== "hr") {
      return fail(res, 403, "You can only change your own photo");
    }
    if (!req.file) return fail(res, 400, "No image uploaded");

    const employee = await User.findOneAndUpdate(
      { _id: id, company: req.auth.company },
      { avatar: { data: req.file.buffer, contentType: req.file.mimetype } },
      { new: true }
    );
    if (!employee) return fail(res, 404, "Employee not found");

    return res.status(200).json({ success: true, message: "Photo updated" });
  } catch (error) {
    return next(error);
  }
};

/** GET /api/employees/:id/avatar */
const getAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return fail(res, 400, "Invalid employee id");

    const employee = await User.findById(id).select("avatar company");
    if (!employee || !employee.avatar?.data) {
      return fail(res, 404, "No photo found");
    }

    const bytes = Buffer.from(employee.avatar.data);
    res.type(employee.avatar.contentType || "application/octet-stream");
    res.set("Cache-Control", "private, max-age=86400");
    return res.end(bytes);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listEmployees,
  getEmployee,
  updateEmployee,
  createEmployee,
  updateAvatar,
  getAvatar,
};

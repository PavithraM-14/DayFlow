const mongoose = require("mongoose");

const { generateLoginId } = require("../utils/loginId");

const ROLES = ["hr", "employee"];

/**
 * A person who signs in to Dayflow. Every user belongs to exactly one
 * company; the first user of a company is always its HR officer (created
 * together with the company in the HR sign-up flow).
 *
 * Passwords are only ever stored as a bcrypt hash, and passwordHash is
 * `select: false` so it never leaves the DB layer by accident.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [120, "Name cannot exceed 120 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      enum: {
        values: ROLES,
        message: "Role must be one of: " + ROLES.join(", "),
      },
      required: [true, "Role is required"],
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
      select: false,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    emailVerifiedAt: {
      type: Date,
      default: null,
    },

    // --- HRMS profile fields (frontend/docs/*.pdf & the excalidraw wireframe) ---

    // Display-only reference id (see utils/loginId.js). NOT a sign-in
    // credential — sign-in is still email + password (auth.controller.js).
    loginId: { type: String, trim: true, index: true },

    // Job info
    department: { type: String, trim: true, default: "" },
    jobPosition: { type: String, trim: true, default: "" },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    location: { type: String, trim: true, default: "" },
    dateOfJoining: { type: Date, default: null },

    // Personal details
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, trim: true, default: "" },
    maritalStatus: { type: String, trim: true, default: "" },
    nationality: { type: String, trim: true, default: "" },
    personalEmail: { type: String, trim: true, lowercase: true, default: "" },
    address: { type: String, trim: true, default: "" },
    about: { type: String, trim: true, maxlength: 2000, default: "" },
    skills: { type: [String], default: [] },
    certifications: { type: [String], default: [] },

    avatar: {
      data: Buffer,
      contentType: String,
    },

    bankDetails: {
      bankName: { type: String, trim: true, default: "" },
      accountNumber: { type: String, trim: true, default: "" },
      ifscCode: { type: String, trim: true, default: "" },
      uanNumber: { type: String, trim: true, default: "" },
      panNumber: { type: String, trim: true, default: "" },
    },

    // Salary structure. `components` holds only the overrides an HR has
    // set for this person — anything omitted falls back to the defaults
    // in utils/payroll.js (DEFAULTS), which mirror the spec's example.
    salary: {
      wage: { type: Number, default: 0, min: 0 },
      wageType: { type: String, enum: ["fixed"], default: "fixed" },
      workingDaysPerWeek: { type: Number, default: 5, min: 1, max: 7 },
      breakTimeMinutes: { type: Number, default: 60, min: 0 },
      components: {
        basicPercentOfWage: Number,
        hraPercentOfBasic: Number,
        standardAllowanceFlat: Number,
        performanceBonusPercentOfBasic: Number,
        ltaPercentOfBasic: Number,
        pfEmployeePercentOfBasic: Number,
        pfEmployerPercentOfBasic: Number,
        professionalTaxFlat: Number,
      },
    },

    // Annual leave allocation, per the spec's example balances ("24 Days
    // Available" paid, "07 Days Available" sick). HR can adjust per
    // employee; unpaid leave is deliberately unbounded (no allocation).
    leaveAllocation: {
      paid: { type: Number, default: 24, min: 0 },
      sick: { type: Number, default: 7, min: 0 },
    },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    if (ret.avatar) {
      ret.avatar = { contentType: ret.avatar.contentType, hasAvatar: Boolean(ret.avatar.contentType) };
    }
    return ret;
  },
});

/**
 * Assigns the display Login ID once, on first creation. Requires
 * `require("../utils/loginId")` rather than requiring the Company model
 * directly here to avoid a require cycle — the id it needs (code) is
 * fetched through a plain query instead.
 */
userSchema.pre("save", async function assignLoginId(next) {
  if (!this.isNew || this.loginId) return next();

  try {
    if (!this.dateOfJoining) this.dateOfJoining = new Date();

    const Company = mongoose.model("Company");
    const company = await Company.findById(this.company).select("code").lean();

    this.loginId = await generateLoginId({
      User: this.constructor,
      company,
      name: this.name,
      dateOfJoining: this.dateOfJoining,
    });
  } catch (error) {
    // A Login ID is a display convenience, not a security boundary — if
    // it can't be generated for some reason, the account should still be
    // created rather than blocking sign-up/approval on it.
    console.error("[USER] Could not generate loginId:", error.message);
  }

  next();
});

const User = mongoose.model("User", userSchema);

// Exposed so controllers/validators share one source of truth for roles.
User.ROLES = ROLES;

module.exports = User;

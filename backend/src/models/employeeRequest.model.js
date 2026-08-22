const mongoose = require("mongoose");

const STATUSES = ["pending", "approved", "rejected"];
const ROLES = ["hr", "employee"];

/**
 * Someone who has verified their email and asked to join an existing
 * company, waiting on that company's HR to let them in.
 *
 * This sits between PendingSignup (pre-OTP staging, self-expiring) and
 * User (a real account). Nothing here can sign in: the User document is
 * only created when HR approves, which is the whole point of the queue.
 *
 * The record is kept after approval or rejection rather than deleted, so
 * HR keeps an audit trail of who asked, who decided, and when — and so a
 * rejected applicant can be told they were rejected instead of silently
 * failing to log in.
 */
const employeeRequestSchema = new mongoose.Schema(
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
      lowercase: true,
      trim: true,
    },
    phone: { type: String, trim: true, default: "" },

    // What the applicant asked to be. HR sees this before approving, and
    // approval creates the User with exactly this role.
    role: {
      type: String,
      enum: { values: ROLES, message: "Role must be one of: " + ROLES.join(", ") },
      required: [true, "Role is required"],
    },

    // Carried over from the staged sign-up so approval does not have to
    // ask the applicant for their password again.
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

    status: {
      type: String,
      enum: { values: STATUSES, message: "Unknown status" },
      default: "pending",
      index: true,
    },

    // Set together when HR decides.
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reviewedAt: { type: Date, default: null },

    // Always set — a request only exists once the OTP has been verified.
    emailVerifiedAt: { type: Date, default: null },

    // The User created on approval, so the audit trail points at the
    // account it produced.
    approvedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

// One open request per email at a time. Partial rather than plain unique:
// a rejected applicant must be able to apply again, and an approved one
// still has their old record on file.
employeeRequestSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { status: "pending" } }
);

// Drives the HR queue: newest pending first, scoped to one company.
employeeRequestSchema.index({ company: 1, status: 1, createdAt: -1 });

employeeRequestSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    return ret;
  },
});

const EmployeeRequest = mongoose.model("EmployeeRequest", employeeRequestSchema);

EmployeeRequest.STATUSES = STATUSES;

module.exports = EmployeeRequest;

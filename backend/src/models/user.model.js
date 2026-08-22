const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);

// Exposed so controllers/validators share one source of truth for roles.
User.ROLES = ROLES;

module.exports = User;

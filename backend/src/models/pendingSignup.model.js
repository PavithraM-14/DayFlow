const mongoose = require("mongoose");

const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES || 10);

// How long a half-finished sign-up is kept before Mongo removes it. Longer
// than the OTP lifetime so an expired code can still be re-sent onto the
// same staged record instead of forcing the user to retype the form.
const STAGING_TTL_MINUTES = Number(process.env.SIGNUP_STAGING_TTL_MINUTES || 60);

/**
 * A sign-up that has been submitted but not yet verified.
 *
 * The real Company and User documents are only created *after* the email
 * OTP is verified, so everything the form collected — including the
 * company logo and the already-hashed password — is parked here in the
 * meantime. The record is deleted on success and expires on its own
 * (TTL index) if the user walks away.
 */
const pendingSignupSchema = new mongoose.Schema(
  {
    // Identity of the person signing up
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true, default: "" },
    role: { type: String, enum: ["hr", "employee"], required: true },
    passwordHash: { type: String, required: true, select: false },

    // Company being registered — HR flow only, where the company does not
    // exist yet and is created on verification.
    companyName: { type: String, trim: true },
    logo: {
      data: Buffer,
      contentType: String,
      fileName: String,
    },

    // Company being joined — employee flow, where the company already
    // exists and verification produces a request to join it instead.
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },

    // OTP state
    otp: { type: String, select: false, maxlength: 10 },
    otpTimestamp: { type: Date, select: false },
    otpAttempts: { type: Number, default: 0, select: false },
    otpSendCount: { type: Number, default: 0, select: false },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

// Self-cleaning: Mongo drops abandoned staged sign-ups.
pendingSignupSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: STAGING_TTL_MINUTES * 60 }
);

/**
 * True only when the supplied code matches and is still inside its
 * validity window. Same contract as PetApp's User.isOTPValid.
 */
pendingSignupSchema.methods.isOtpValid = function (
  otp,
  expirationMinutes = OTP_EXPIRY_MINUTES
) {
  if (!this.otp || !this.otpTimestamp) return false;
  if (this.otp !== String(otp)) return false;

  const ageInMinutes = (Date.now() - this.otpTimestamp.getTime()) / (1000 * 60);
  return ageInMinutes <= expirationMinutes;
};

pendingSignupSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.otp;
    delete ret.otpTimestamp;
    delete ret.passwordHash;
    if (ret.logo) {
      ret.logo = { contentType: ret.logo.contentType, fileName: ret.logo.fileName };
    }
    return ret;
  },
});

const PendingSignup = mongoose.model("PendingSignup", pendingSignupSchema);

PendingSignup.OTP_EXPIRY_MINUTES = OTP_EXPIRY_MINUTES;

module.exports = PendingSignup;

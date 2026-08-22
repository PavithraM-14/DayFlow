// Deliberately permissive: catches obvious typos ("no @", trailing dot)
// without rejecting valid-but-unusual addresses.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isValidEmail = (email) =>
  typeof email === "string" && EMAIL_REGEX.test(email.trim());

const MIN_PASSWORD_LENGTH = 8;

const validatePassword = (password) => {
  if (typeof password !== "string" || !password) {
    return { isValid: false, message: "Password is required" };
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    };
  }
  return { isValid: true };
};

// Digits, spaces and the usual separators; 7–15 digits once stripped
// (E.164 allows at most 15).
const validatePhone = (phone) => {
  if (!phone) return { isValid: true }; // optional field
  if (typeof phone !== "string") {
    return { isValid: false, message: "Phone must be a string" };
  }
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return { isValid: false, message: "Enter a valid phone number" };
  }
  return { isValid: true };
};

const isValidOtp = (otp) => /^\d{6}$/.test(String(otp || "").trim());

module.exports = {
  isValidEmail,
  validatePassword,
  validatePhone,
  isValidOtp,
  MIN_PASSWORD_LENGTH,
};

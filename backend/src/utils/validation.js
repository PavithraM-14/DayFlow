// Deliberately permissive: catches obvious typos ("no @", trailing dot)
// without rejecting valid-but-unusual addresses.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isValidEmail = (email) =>
  typeof email === "string" && EMAIL_REGEX.test(email.trim());

const MIN_PASSWORD_LENGTH = 8;

// bcrypt hashes only the first 72 bytes and silently ignores the rest, so
// a longer password would give a false sense of strength — and two
// passwords sharing a 72-byte prefix would be interchangeable. Rejected
// up front instead. Bytes, not characters: one emoji can cost four.
const MAX_PASSWORD_BYTES = 72;

/**
 * The sign-up password policy, in one place so the API and the sign-up
 * forms cannot drift apart. The frontend mirrors this list in
 * frontend/src/utils/passwordPolicy.js — keep the two in step.
 *
 * `label` is written to read as a checklist item on the form.
 */
const PASSWORD_RULES = [
  {
    key: "length",
    label: `At least ${MIN_PASSWORD_LENGTH} characters`,
    test: (password) => password.length >= MIN_PASSWORD_LENGTH,
  },
  {
    key: "lowercase",
    label: "A lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
  {
    key: "uppercase",
    label: "An uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    key: "number",
    label: "A number",
    test: (password) => /\d/.test(password),
  },
  {
    key: "symbol",
    label: "A symbol (for example ! ? @ # $)",
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

/**
 * Applied to every sign-up (HR and employee alike). Deliberately NOT
 * applied on login: echoing the policy back there would tell an attacker
 * which guesses are even worth making, and would lock out anyone whose
 * password predates a policy change.
 */
const validatePassword = (password) => {
  if (typeof password !== "string" || !password) {
    return { isValid: false, message: "Password is required" };
  }

  if (Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES) {
    return {
      isValid: false,
      message: `Password cannot be longer than ${MAX_PASSWORD_BYTES} characters`,
    };
  }

  const failed = PASSWORD_RULES.filter((rule) => !rule.test(password));

  if (failed.length) {
    // Report everything that is missing at once, so the form does not
    // dribble out one requirement per submit.
    const missing = failed.map((rule) => rule.label.toLowerCase());
    return {
      isValid: false,
      message: `Password must contain: ${missing.join(", ")}`,
      failedRules: failed.map((rule) => rule.key),
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
  MAX_PASSWORD_BYTES,
  PASSWORD_RULES,
};

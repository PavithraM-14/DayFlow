/**
 * Mirror of the sign-up password policy in
 * backend/src/utils/validation.js — keep the two in step.
 *
 * Duplicated rather than fetched so the checklist can react as the user
 * types, with no round-trip. The backend stays the authority: it runs the
 * same rules on every sign-up, so a stale copy here can only ever be
 * over-permissive in the UI, never let a weak password through.
 */
export const MIN_PASSWORD_LENGTH = 8;

// bcrypt hashes only the first 72 bytes, so anything longer is a false
// sense of strength. Bytes, not characters: one emoji can cost four.
export const MAX_PASSWORD_BYTES = 72;

export const PASSWORD_RULES = [
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

/** Byte length, matching how the backend measures against the cap. */
const byteLength = (value) =>
  typeof TextEncoder !== "undefined"
    ? new TextEncoder().encode(value).length
    : // Older engines: count UTF-8 bytes via encodeURIComponent escapes.
      encodeURIComponent(value).replace(/%[0-9A-F]{2}/g, "x").length;

/** Which rules a password currently satisfies — drives the checklist. */
export const checkPassword = (password = "") =>
  PASSWORD_RULES.map((rule) => ({
    key: rule.key,
    label: rule.label,
    met: rule.test(password),
  }));

/**
 * Same shape and wording as the backend's validatePassword, so a form can
 * block an obviously-bad submit locally and still show the server's
 * message verbatim if anything slips through.
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }

  if (byteLength(password) > MAX_PASSWORD_BYTES) {
    return {
      isValid: false,
      message: `Password cannot be longer than ${MAX_PASSWORD_BYTES} characters`,
    };
  }

  const failed = PASSWORD_RULES.filter((rule) => !rule.test(password));

  if (failed.length) {
    const missing = failed.map((rule) => rule.label.toLowerCase());
    return {
      isValid: false,
      message: `Password must contain: ${missing.join(", ")}`,
    };
  }

  return { isValid: true };
};

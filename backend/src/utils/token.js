const jwt = require("jsonwebtoken");

const DEFAULT_EXPIRES_IN = "7d";

// Password-reset tokens are short-lived and single-purpose: the
// `purpose` claim keeps a reset token from ever being accepted anywhere
// a normal auth token is expected, and vice versa.
const RESET_TOKEN_PURPOSE = "password-reset";
const RESET_TOKEN_EXPIRES_IN = "45m";

// Only ever used when JWT_SECRET is unset outside production, so the login
// flow is testable on a fresh clone. Tokens signed with it are worthless,
// which is the point — assertJwtSecret() blocks it in production.
const DEV_FALLBACK_SECRET = "dayflow-insecure-development-secret";

const isProduction = () => process.env.NODE_ENV === "production";

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (secret) return secret;

  if (isProduction()) {
    throw Object.assign(new Error("Server auth is not configured"), {
      status: 500,
    });
  }

  return DEV_FALLBACK_SECRET;
};

/**
 * Fails fast at boot rather than at first login, so a misconfigured
 * production deploy cannot come up silently signing tokens nobody
 * intended. In development it only warns.
 */
const assertJwtSecret = () => {
  if (process.env.JWT_SECRET) return;

  if (isProduction()) {
    console.error(
      "[AUTH] JWT_SECRET is not set. Refusing to start in production — " +
        "see .env.example for how to generate one."
    );
    process.exit(1);
  }

  console.warn(
    "[AUTH] JWT_SECRET is not set; falling back to an insecure development " +
      "secret. Set one in .env before deploying."
  );
};

/**
 * The signed session token handed to the client on login.
 *
 * Payload is deliberately minimal — an id, plus the role and company the
 * dashboards route on. Anything that can go stale (name, email) is read
 * from the database instead, so a token never carries outdated identity.
 */
const signAuthToken = (user) => {
  // `user.company` is an ObjectId on a plain read but a whole document
  // once populated — String() on the latter yields the inspected object,
  // not an id, which then fails to cast on every query that uses it.
  const company = user.company?._id ?? user.company;

  return jwt.sign(
    {
      sub: String(user._id),
      role: user.role,
      company: company ? String(company) : null,
    },
    getSecret(),
    { expiresIn: process.env.JWT_EXPIRES_IN || DEFAULT_EXPIRES_IN }
  );
};

/** Returns the decoded payload, or null for any invalid/expired token. */
const verifyAuthToken = (token) => {
  try {
    return jwt.verify(token, getSecret());
  } catch {
    return null;
  }
};

/**
 * A short-lived, single-purpose token emailed as the "reset password"
 * link. Signed with the same secret as the session token, but carries a
 * `purpose` claim so it can never be replayed as a session token.
 */
const signResetToken = (user) =>
  jwt.sign(
    { sub: String(user._id), purpose: RESET_TOKEN_PURPOSE },
    getSecret(),
    { expiresIn: RESET_TOKEN_EXPIRES_IN }
  );

/**
 * Returns the decoded payload only for a token that is valid, unexpired,
 * AND carries the password-reset purpose claim — null otherwise. This is
 * what keeps a session token (or anyone else's token) from being usable
 * to reset a password.
 */
const verifyResetToken = (token) => {
  try {
    const payload = jwt.verify(token, getSecret());
    if (payload.purpose !== RESET_TOKEN_PURPOSE) return null;
    return payload;
  } catch {
    return null;
  }
};

module.exports = {
  assertJwtSecret,
  signAuthToken,
  verifyAuthToken,
  signResetToken,
  verifyResetToken,
};

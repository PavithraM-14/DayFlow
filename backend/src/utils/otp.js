const crypto = require("crypto");

/**
 * Generates a numeric one-time password.
 *
 * Uses crypto.randomInt rather than Math.random — Math.random is not
 * cryptographically random, so its output is predictable from previous
 * values, which is exactly the property an OTP must not have.
 */
const generateOtp = (length = 6) => {
  let otp = "";
  for (let i = 0; i < length; i += 1) {
    otp += crypto.randomInt(0, 10).toString();
  }
  return otp;
};

module.exports = { generateOtp };

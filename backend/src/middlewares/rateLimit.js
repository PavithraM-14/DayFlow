const rateLimit = require("express-rate-limit");

/**
 * Login has no other brute-force protection — unlike the OTP flow, which
 * already burns a code after MAX_OTP_ATTEMPTS wrong guesses. Ten tries per
 * 15 minutes per IP is generous for a real user (who mistypes a password
 * once or twice) and expensive for a script guessing passwords across many
 * accounts from one address.
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many sign-in attempts. Please try again later." },
});

/**
 * Sign-up OTP requests already carry a per-record send budget
 * (MAX_OTP_SENDS in auth.controller.js), but that's keyed on the email in
 * the request body — nothing stops one IP from cycling through many
 * different email addresses to spam OTP emails. This caps that per IP.
 */
const otpRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many verification requests. Please try again later." },
});

module.exports = { loginLimiter, otpRequestLimiter };

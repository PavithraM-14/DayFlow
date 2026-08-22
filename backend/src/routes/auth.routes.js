const express = require("express");

const authController = require("../controllers/auth.controller");
const { uploadCompanyLogo } = require("../middlewares/upload");
const { requireAuth } = require("../middlewares/auth");
const { loginLimiter, otpRequestLimiter } = require("../middlewares/rateLimit");

const router = express.Router();

// Sign in with email + password. The response carries the JWT and the
// user, whose role picks the dashboard on the client. Rate-limited per
// IP — unlike the OTP flow below, nothing else here throttles repeated
// password guesses against one account.
router.post("/login", loginLimiter, authController.login);

// Re-validates a stored token on page load and returns fresh user details.
router.get("/me", requireAuth, authController.me);

// Change password from the profile Security tab (requires the current one).
router.patch("/password", requireAuth, authController.changePassword);

// Forgot / reset password. otpRequestLimiter is reused here rather than
// adding a new limiter — it already caps repeated requests per IP across
// different target emails, which is exactly the risk on this endpoint too.
router.post("/forgot-password", otpRequestLimiter, authController.forgotPassword);
router.post("/reset-password", otpRequestLimiter, authController.resetPassword);

// HR sign-up — email OTP flow.
//
//   1. POST /signup/hr/send-otp     stage the form, email a 6-digit code
//   2. POST /signup/hr/resend-otp   re-issue the code (form is kept)
//   3. POST /signup/hr/verify-otp   verify, then create Company + HR User
//
// send-otp is multipart/form-data because it carries the company logo;
// the other two are plain JSON. otpRequestLimiter caps how many of these
// one IP can fire regardless of which email each one targets — the
// per-record MAX_OTP_SENDS budget in the controller only limits repeats
// against a single email.
router.post("/signup/hr/send-otp", otpRequestLimiter, uploadCompanyLogo, authController.sendHrSignupOtp);
router.post("/signup/hr/resend-otp", otpRequestLimiter, authController.resendHrSignupOtp);
router.post("/signup/hr/verify-otp", authController.verifyHrSignupOtp);

// Employee sign-up — same email OTP flow against a company that already
// exists. Verification creates a *join request*, not a user: the account
// itself is only created when that company's HR approves it.
//
//   1. POST /signup/employee/send-otp     stage the form, email a code
//   2. POST /signup/employee/resend-otp   re-issue the code
//   3. POST /signup/employee/verify-otp   verify, then queue the request
router.post("/signup/employee/send-otp", otpRequestLimiter, authController.sendEmployeeSignupOtp);
router.post("/signup/employee/resend-otp", otpRequestLimiter, authController.resendEmployeeSignupOtp);
router.post("/signup/employee/verify-otp", authController.verifyEmployeeSignupOtp);

module.exports = router;

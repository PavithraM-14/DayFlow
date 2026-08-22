const express = require("express");

const authController = require("../controllers/auth.controller");
const { uploadCompanyLogo } = require("../middlewares/upload");

const router = express.Router();

// HR sign-up — email OTP flow.
//
//   1. POST /signup/hr/send-otp     stage the form, email a 6-digit code
//   2. POST /signup/hr/resend-otp   re-issue the code (form is kept)
//   3. POST /signup/hr/verify-otp   verify, then create Company + HR User
//
// send-otp is multipart/form-data because it carries the company logo;
// the other two are plain JSON.
router.post("/signup/hr/send-otp", uploadCompanyLogo, authController.sendHrSignupOtp);
router.post("/signup/hr/resend-otp", authController.resendHrSignupOtp);
router.post("/signup/hr/verify-otp", authController.verifyHrSignupOtp);

module.exports = router;

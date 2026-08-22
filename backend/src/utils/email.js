const { getTransporter, isConfigured } = require("../config/mailer");

const APP_NAME = "Dayflow";

/**
 * Sends a message over SMTP.
 *
 * When SMTP isn't configured this resolves with { delivered: false }
 * instead of throwing, so a developer can run the whole sign-up flow
 * locally without credentials — the caller then logs the code to the
 * server console. In production a missing/broken transport should be a
 * hard failure, so it throws when NODE_ENV === "production".
 */
const sendMail = async (message) => {
  const transporter = getTransporter();

  if (!transporter) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP is not configured (EMAIL_USER / EMAIL_PASS)");
    }
    return { delivered: false, reason: "smtp-not-configured" };
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `${APP_NAME} <${process.env.EMAIL_USER}>`,
    ...message,
  });

  return { delivered: true };
};

const otpTemplate = ({ otp, expiryMinutes, heading, intro }) => `
  <div style="font-family: -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1f1b1e;">
    <h2 style="color: #714b67; margin: 0 0 12px;">${APP_NAME} — ${heading}</h2>
    <p style="margin: 0 0 20px; line-height: 1.5;">${intro}</p>
    <div style="background: #f5eef3; border: 1px solid #e8e3e7; border-radius: 10px; padding: 22px; text-align: center; margin: 0 0 20px;">
      <div style="font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #714b67;">${otp}</div>
    </div>
    <p style="margin: 0 0 8px; line-height: 1.5;">This code expires in ${expiryMinutes} minutes.</p>
    <p style="margin: 0; color: #6b6570; font-size: 13px; line-height: 1.5;">
      If you didn't request this code, you can safely ignore this email.
    </p>
  </div>
`;

/**
 * Emails a sign-up verification code. Mirrors PetApp's sendEmailOTP: one
 * function owns both the copy and the transport call.
 */
const sendSignupOtpEmail = async ({ email, otp, name, expiryMinutes = 10 }) => {
  const greeting = name ? `Hi ${name},` : "Hi,";

  const result = await sendMail({
    to: email,
    subject: `${APP_NAME} sign-up verification code`,
    text:
      `${greeting}\n\nYour ${APP_NAME} verification code is ${otp}.\n` +
      `It expires in ${expiryMinutes} minutes.\n\n` +
      `If you didn't request this code, you can ignore this email.`,
    html: otpTemplate({
      otp,
      expiryMinutes,
      heading: "Verify your email",
      intro: `${greeting} use the code below to finish setting up your ${APP_NAME} account.`,
    }),
  });

  return result;
};

module.exports = { sendMail, sendSignupOtpEmail, isSmtpConfigured: isConfigured };

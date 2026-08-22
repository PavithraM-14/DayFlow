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

/**
 * Emails the one-time temporary password for an HR-created employee
 * account (see employee.controller.js's createEmployee). The password is
 * never put anywhere else — not the API response, not a log line —
 * unless SMTP delivery fails, in which case the caller decides whether
 * to fall back to the same dev-only console echo the sign-up OTP uses.
 */
const sendTempPasswordEmail = async ({ email, name, tempPassword, loginId, companyName }) => {
  const greeting = name ? `Hi ${name},` : "Hi,";
  const company = companyName || APP_NAME;

  return sendMail({
    to: email,
    subject: `Your ${APP_NAME} account is ready`,
    text:
      `${greeting}\n\nAn account was created for you at ${company} on ${APP_NAME}.\n` +
      (loginId ? `Your employee ID is ${loginId}.\n` : "") +
      `Sign in with this email and the temporary password: ${tempPassword}\n\n` +
      `Please sign in and change your password as soon as you can.`,
    html: `
      <div style="font-family: -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1f1b1e;">
        <h2 style="color: #714b67; margin: 0 0 12px;">${APP_NAME} — your account is ready</h2>
        <p style="margin: 0 0 8px; line-height: 1.5;">${greeting} an account was created for you at ${company}.</p>
        ${loginId ? `<p style="margin: 0 0 8px; line-height: 1.5;">Your employee ID: <strong>${loginId}</strong></p>` : ""}
        <p style="margin: 0 0 20px; line-height: 1.5;">Sign in with this email address and the temporary password below, then change it as soon as you can.</p>
        <div style="background: #f5eef3; border: 1px solid #e8e3e7; border-radius: 10px; padding: 22px; text-align: center; margin: 0 0 20px;">
          <div style="font-size: 22px; font-weight: 700; letter-spacing: 2px; color: #714b67;">${tempPassword}</div>
        </div>
      </div>
    `,
  });
};

/**
 * Emails the password-reset link. Deliberately does not confirm or deny
 * whether the account exists in its own copy — the controller only
 * calls this when a matching user was found, and the generic "if an
 * account exists..." response is what the caller sees either way.
 */
const sendPasswordResetEmail = async ({ email, name, resetLink, expiryMinutes = 45 }) => {
  const greeting = name ? `Hi ${name},` : "Hi,";

  return sendMail({
    to: email,
    subject: `Reset your ${APP_NAME} password`,
    text:
      `${greeting}\n\nWe received a request to reset your ${APP_NAME} password.\n` +
      `Use this link to choose a new one: ${resetLink}\n\n` +
      `This link expires in ${expiryMinutes} minutes.\n\n` +
      `If you didn't request this, you can safely ignore this email.`,
    html: `
      <div style="font-family: -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1f1b1e;">
        <h2 style="color: #714b67; margin: 0 0 12px;">${APP_NAME} — reset your password</h2>
        <p style="margin: 0 0 20px; line-height: 1.5;">${greeting} we received a request to reset your ${APP_NAME} password.</p>
        <div style="text-align: center; margin: 0 0 20px;">
          <a href="${resetLink}" style="display: inline-block; background: #714b67; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600;">Reset password</a>
        </div>
        <p style="margin: 0 0 8px; line-height: 1.5;">This link expires in ${expiryMinutes} minutes.</p>
        <p style="margin: 0; color: #6b6570; font-size: 13px; line-height: 1.5;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
};

module.exports = {
  sendMail,
  sendSignupOtpEmail,
  sendTempPasswordEmail,
  sendPasswordResetEmail,
  isSmtpConfigured: isConfigured,
};

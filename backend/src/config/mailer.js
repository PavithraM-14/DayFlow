const nodemailer = require("nodemailer");

let cachedTransporter = null;

const isConfigured = () =>
  Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

/**
 * Lazily builds (and caches) the SMTP transporter from the environment.
 * Returns null when no credentials are configured, which lets the caller
 * fall back to logging the OTP to the server console in development.
 */
const getTransporter = () => {
  if (!isConfigured()) return null;
  if (cachedTransporter) return cachedTransporter;

  const port = parseInt(process.env.EMAIL_PORT || "465", 10);

  cachedTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    family: 4,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return cachedTransporter;
};

module.exports = { getTransporter, isConfigured };

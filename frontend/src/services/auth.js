import apiClient from "./apiClient";

const HR_SIGNUP = "/auth/signup/hr";

/**
 * Step 1 of HR sign-up: submit the form and have a 6-digit code emailed.
 * Sent as multipart/form-data because it carries the company logo file.
 */
export const sendHrSignupOtp = ({
  companyName,
  logoFile,
  name,
  email,
  phone,
  password,
}) => {
  const formData = new FormData();
  formData.append("companyName", companyName);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone || "");
  formData.append("password", password);
  if (logoFile) formData.append("logo", logoFile);

  return apiClient.post(`${HR_SIGNUP}/send-otp`, formData);
};

/** Re-issues the code without making the user retype the form. */
export const resendHrSignupOtp = (email) =>
  apiClient.post(`${HR_SIGNUP}/resend-otp`, { email });

/**
 * Step 2 of HR sign-up: on a valid code the backend creates the Company
 * and its first User (role "hr") and returns both.
 */
export const verifyHrSignupOtp = ({ email, otp }) =>
  apiClient.post(`${HR_SIGNUP}/verify-otp`, { email, otp });

export const authService = {
  sendHrSignupOtp,
  resendHrSignupOtp,
  verifyHrSignupOtp,
};

export default authService;

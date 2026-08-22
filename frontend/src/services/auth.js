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

const EMPLOYEE_SIGNUP = "/auth/signup/employee";

/**
 * Step 1 of joining an existing company: submit the form and have a
 * 6-digit code emailed. Plain JSON — unlike the HR flow there is no logo.
 */
export const sendEmployeeSignupOtp = ({
  companyId,
  role,
  name,
  email,
  phone,
  password,
}) =>
  apiClient.post(
    `${EMPLOYEE_SIGNUP}/send-otp`,
    { companyId, role, name, email, phone: phone || "", password },
    { auth: false }
  );

export const resendEmployeeSignupOtp = (email) =>
  apiClient.post(`${EMPLOYEE_SIGNUP}/resend-otp`, { email }, { auth: false });

/**
 * Step 2: a valid code files a join request for the chosen company. It
 * does NOT create an account — that happens when the company's HR
 * approves the request.
 */
export const verifyEmployeeSignupOtp = ({ email, otp }) =>
  apiClient.post(
    `${EMPLOYEE_SIGNUP}/verify-otp`,
    { email, otp },
    { auth: false }
  );

/**
 * Sign in with email + password.
 *
 * On success `data` carries { token, user }; the user's `role` is what
 * decides which dashboard to land on. Signing in with the employee
 * Login ID is not supported yet — the backend has no such identifier.
 */
export const login = ({ email, password }) =>
  apiClient.post("/auth/login", { email, password }, { auth: false });

/** Revalidates the stored token and returns fresh user details. */
export const fetchCurrentUser = () => apiClient.get("/auth/me");

/**
 * Requests a password-reset email. Always resolves with a generic
 * success message from the backend, whether or not the address is
 * registered — nothing to branch on here beyond network/validation
 * failures.
 */
export const forgotPassword = (email) =>
  apiClient.post("/auth/forgot-password", { email }, { auth: false });

/** Submits the token from the reset link plus the chosen new password. */
export const resetPassword = (token, newPassword) =>
  apiClient.post(
    "/auth/reset-password",
    { token, password: newPassword },
    { auth: false }
  );

export const authService = {
  sendHrSignupOtp,
  resendHrSignupOtp,
  verifyHrSignupOtp,
  sendEmployeeSignupOtp,
  resendEmployeeSignupOtp,
  verifyEmployeeSignupOtp,
  login,
  fetchCurrentUser,
  forgotPassword,
  resetPassword,
};

export default authService;

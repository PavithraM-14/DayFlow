/**
 * Carries the small amount of state the HR sign-up flow needs between its
 * three pages (/signup/hr -> /signup/hr/verify -> /signup/hr/success).
 *
 * sessionStorage rather than a query string: the email shouldn't sit in
 * the URL, and this clears itself when the tab closes. Nothing secret is
 * stored — never the password.
 */
const PENDING_KEY = "dayflow:hr-signup:pending";
const RESULT_KEY = "dayflow:hr-signup:result";

// The employee flow mirrors it across its own three pages
// (/signup/employee -> .../verify -> .../submitted).
const EMPLOYEE_PENDING_KEY = "dayflow:employee-signup:pending";
const EMPLOYEE_RESULT_KEY = "dayflow:employee-signup:result";

const read = (key) => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const write = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private browsing / storage disabled — the flow degrades to the
    // "session expired, start again" path, which is handled.
  }
};

const clear = (key) => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    /* nothing to do */
  }
};

/** { email, name, companyName, devOtp?, emailDelivered } */
export const savePendingSignup = (pending) => write(PENDING_KEY, pending);
export const getPendingSignup = () => read(PENDING_KEY);
export const clearPendingSignup = () => clear(PENDING_KEY);

/** The created { company, user } documents returned by verify-otp. */
export const saveSignupResult = (result) => write(RESULT_KEY, result);
export const getSignupResult = () => read(RESULT_KEY);
export const clearSignupResult = () => clear(RESULT_KEY);

/** { email, name, companyName, role, devOtp?, emailDelivered } */
export const saveEmployeePendingSignup = (pending) =>
  write(EMPLOYEE_PENDING_KEY, pending);
export const getEmployeePendingSignup = () => read(EMPLOYEE_PENDING_KEY);
export const clearEmployeePendingSignup = () => clear(EMPLOYEE_PENDING_KEY);

/** The { request, company } the employee verify-otp step returned. */
export const saveEmployeeSignupResult = (result) =>
  write(EMPLOYEE_RESULT_KEY, result);
export const getEmployeeSignupResult = () => read(EMPLOYEE_RESULT_KEY);
export const clearEmployeeSignupResult = () => clear(EMPLOYEE_RESULT_KEY);

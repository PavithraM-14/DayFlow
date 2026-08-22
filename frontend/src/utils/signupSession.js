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

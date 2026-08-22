/**
 * Where the signed-in session lives on the client.
 *
 * localStorage rather than sessionStorage (which the sign-up flow uses):
 * staying signed in across a browser restart is the expected behaviour for
 * a dashboard, and the JWT already carries its own expiry.
 *
 * The cached user is a convenience only — it makes the first dashboard
 * paint instant instead of blank. It is never trusted on its own: the
 * dashboard guard revalidates against GET /auth/me on load, so an edited
 * localStorage entry buys nothing.
 */
const TOKEN_KEY = "dayflow:auth:token";
const USER_KEY = "dayflow:auth:user";

const canUseStorage = () => typeof window !== "undefined";

export const getAuthToken = () => {
  if (!canUseStorage()) return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const getStoredUser = () => {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveSession = ({ token, user }) => {
  if (!canUseStorage()) return;
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    if (user) window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // Private browsing / storage disabled. The sign-in still succeeded, so
    // this tab works; the guard just sends the user back to /login on the
    // next full page load.
  }
};

export const clearSession = () => {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  } catch {
    /* nothing to do */
  }
};

/**
 * Where a signed-in user belongs, by role.
 *
 * Employees go to /dashboard/profile, not /dashboard/employee — despite
 * the name, that route is the HR-facing employee *directory*. There is no
 * employee-specific dashboard yet, and profile is the one page that shows
 * a person their own details.
 */
export const dashboardPathFor = (user) =>
  user?.role === "hr" ? "/dashboard/hr" : "/dashboard/profile";

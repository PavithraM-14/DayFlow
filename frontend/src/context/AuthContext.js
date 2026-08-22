"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchCurrentUser, login as loginRequest } from "@/services/auth";
import {
  clearSession,
  getAuthToken,
  getStoredUser,
  saveSession,
} from "@/utils/authSession";

const AuthContext = createContext(null);

/**
 * Holds the signed-in user for the whole app.
 *
 * `ready` is the important flag: on the first render nothing has been read
 * from localStorage yet, so "no user" and "not looked yet" are different
 * states. Guards must wait for `ready` or they redirect signed-in users
 * straight back to /login on every refresh.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Rehydrate from storage, then confirm the token is still good against
  // the API. The cached user paints immediately; /auth/me corrects it.
  useEffect(() => {
    let cancelled = false;

    const restore = async () => {
      const token = getAuthToken();

      if (!token) {
        if (!cancelled) setReady(true);
        return;
      }

      const cached = getStoredUser();
      if (cached && !cancelled) setUser(cached);

      const response = await fetchCurrentUser();

      if (cancelled) return;

      if (response.success && response.data?.user) {
        setUser(response.data.user);
        saveSession({ user: response.data.user });
      } else if (response.status === 401) {
        // Expired, revoked, or tampered with — drop it.
        clearSession();
        setUser(null);
      }
      // Any other failure (server down, network) keeps the cached user so
      // a backend blip does not sign everyone out.

      setReady(true);
    };

    restore();

    return () => {
      cancelled = true;
    };
  }, []);

  /** Returns the raw API response so callers can show the server's message. */
  const signIn = useCallback(async ({ identifier, password }) => {
    const response = await loginRequest({ identifier, password });

    if (response.success && response.data?.token) {
      saveSession({ token: response.data.token, user: response.data.user });
      setUser(response.data.user);
    }

    return response;
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  /**
   * Re-fetches /auth/me and updates both state and the cached session, so
   * a profile edit (self or HR editing their own record) shows up
   * immediately without asking the user to sign in again.
   */
  const refreshUser = useCallback(async () => {
    const response = await fetchCurrentUser();
    if (response.success && response.data?.user) {
      setUser(response.data.user);
      saveSession({ user: response.data.user });
    }
    return response;
  }, []);

  const value = useMemo(
    () => ({ user, ready, isAuthenticated: Boolean(user), signIn, signOut, refreshUser }),
    [user, ready, signIn, signOut, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return context;
}

export default AuthContext;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Gates a whole route tree on a signed-in user. Wrap a dashboard layout's
 * tree in this rather than repeating the check per page.
 *
 * This is a client-side guard, so treat it as routing rather than
 * security: it keeps signed-out visitors out of the UI, but the real
 * protection is the API refusing requests without a valid token (see
 * backend middlewares/auth.js). Any page that reads real company data
 * still needs its endpoint authorized server-side.
 *
 * Pass `role` to additionally restrict the tree to one role.
 */
export default function RequireAuth({ children, role }) {
  const router = useRouter();
  const { ready, user, isAuthenticated } = useAuth();

  const roleAllowed = !role || user?.role === role;

  useEffect(() => {
    // `ready` matters: before the session is restored from storage
    // isAuthenticated is false for everyone, and redirecting on that
    // would bounce signed-in users out on every refresh.
    if (ready && !isAuthenticated) {
      router.replace("/login");
    }
  }, [ready, isAuthenticated, router]);

  if (!ready || !isAuthenticated) {
    return (
      <div
        className="bg-surface text-on-surface-variant font-body-md h-screen flex items-center justify-center"
        role="status"
      >
        Loading...
      </div>
    );
  }

  if (!roleAllowed) {
    return (
      <div className="bg-surface text-on-surface font-body-md h-screen flex items-center justify-center p-gutter">
        <div className="max-w-md text-center">
          <span className="material-symbols-outlined text-[40px] text-outline">
            lock
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mt-2 mb-1">
            Not available for your account
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            This area is limited to {role === "hr" ? "HR" : role} accounts.
          </p>
        </div>
      </div>
    );
  }

  return children;
}

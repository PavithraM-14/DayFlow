"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Gates every /dashboard/* route on a signed-in HR user.
 *
 * This is a client-side guard, so treat it as routing rather than
 * security: it keeps the wrong visitors out of the UI, but the real
 * protection has to be the API refusing requests without a valid token
 * and the right role (see middlewares/auth.js). Any page here that reads
 * real company data still needs its own authorization check server-side.
 *
 * The role check matters beyond tidiness: this whole tree — including
 * the New Employee Verification queue — is HR-only. Without it, an
 * employee who lands here (a stale bookmark, a shared link) would see
 * that queue in the sidebar, which is exactly the leak this guard closes.
 */
export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { ready, isAuthenticated, user } = useAuth();

  useEffect(() => {
    // `ready` matters: before the session is restored from storage
    // isAuthenticated is false for everyone, and redirecting on that would
    // bounce signed-in users out on every refresh.
    if (!ready) return;
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (user?.role !== "hr") {
      router.replace("/employee-dashboard");
    }
  }, [ready, isAuthenticated, user, router]);

  if (!ready || !isAuthenticated || user?.role !== "hr") {
    return (
      <div
        className="bg-surface text-on-surface-variant font-body-md h-screen flex items-center justify-center"
        role="status"
      >
        Loading...
      </div>
    );
  }

  return children;
}

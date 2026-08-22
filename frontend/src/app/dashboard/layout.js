"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Gates every /dashboard/* route on a signed-in user.
 *
 * This is a client-side guard, so treat it as routing rather than
 * security: it keeps signed-out visitors out of the UI, but the real
 * protection has to be the API refusing requests without a valid token
 * (see middlewares/auth.js). Any dashboard that goes on to read real
 * company data still needs its own authorization check server-side.
 *
 * Which role may see which page is not decided here — that split isn't
 * defined yet, so for now any signed-in user can reach any dashboard page.
 */
export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { ready, isAuthenticated } = useAuth();

  useEffect(() => {
    // `ready` matters: before the session is restored from storage
    // isAuthenticated is false for everyone, and redirecting on that would
    // bounce signed-in users out on every refresh.
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

  return children;
}

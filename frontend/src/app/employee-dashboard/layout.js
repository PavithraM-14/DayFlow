"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Gates every /employee-dashboard/* route on a signed-in employee.
 *
 * This tree had no layout guard at all before — anyone could open these
 * pages without signing in. Mirrors /dashboard/layout.js's guard, with
 * the role check flipped: HR officers get sent back to their own shell
 * instead of the employee one.
 *
 * As with the HR guard, this is routing, not security — the API's own
 * auth/role checks (middlewares/auth.js) are what actually protect data.
 */
export default function EmployeeDashboardLayout({ children }) {
  const router = useRouter();
  const { ready, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (user?.role === "hr") {
      router.replace("/dashboard/hr");
    }
  }, [ready, isAuthenticated, user, router]);

  if (!ready || !isAuthenticated || user?.role === "hr") {
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

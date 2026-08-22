"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { dashboardPathFor } from "@/utils/authSession";

/**
 * /dashboard has no UI of its own — each role has its own landing page.
 * It exists so there is one stable URL to send people to (after login, or
 * from a bookmark) without every caller having to know the role mapping.
 *
 * The surrounding layout has already established that someone is signed
 * in, so by the time this renders there is a user to route on.
 */
export default function DashboardIndexPage() {
 const router = useRouter();
 const { user } = useAuth();

 useEffect(() => {
 if (user) router.replace(dashboardPathFor(user));
 }, [user, router]);

 return (
 <div
 className="bg-surface text-on-surface-variant font-body-md h-screen flex items-center justify-center"
 role="status"
 >
 Loading...
 </div>
 );
}

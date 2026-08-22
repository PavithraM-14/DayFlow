"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import CheckInWidget from "@/components/CheckInWidget";

/**
 * Single source of truth for both dashboard sidebars.
 *
 * Every /dashboard/* and /employee-dashboard/* page used to carry its own
 * hand-copied sidebar markup, with the "active" item hardcoded per file.
 * Whichever file a link was copy-pasted from decided which item lit up —
 * so highlighting worked only when whoever wrote that page remembered to
 * update it, which is why it looked "sometimes right, sometimes wrong".
 *
 * Centering the nav list and computing the active item from the real URL
 * (usePathname) makes that whole class of bug structurally impossible:
 * there is exactly one place that decides what's active, and it is always
 * looking at where the browser actually is.
 *
 * `variant` also decides which items exist at all — "New Employee
 * Verification" and the HR-only "Employees" directory simply are not in
 * EMPLOYEE_NAV, so there is no per-page checkbox to forget.
 */
const HR_NAV = [
  { href: "/dashboard/hr", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/employee", label: "Employees", icon: "groups" },
  {
    href: "/dashboard/verification",
    label: "New Employee Verification",
    icon: "how_to_reg",
  },
  { href: "/dashboard/attendance", label: "Attendance", icon: "pending_actions" },
  { href: "/dashboard/time-off", label: "Time Off", icon: "calendar_today" },
  { href: "/dashboard/payroll", label: "Payroll", icon: "payments" },
  { href: "/dashboard/reports", label: "Reports", icon: "assessment" },
];

const EMPLOYEE_NAV = [
  { href: "/employee-dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/employee-dashboard/attendance", label: "Attendance", icon: "timer" },
  { href: "/employee-dashboard/time-off", label: "Time Off", icon: "event_busy" },
  { href: "/employee-dashboard/profile", label: "My Profile", icon: "person" },
  { href: "/employee-dashboard/payroll", label: "Payroll", icon: "payments" },
];

const PROFILE_PATH = { hr: "/dashboard/profile", employee: "/employee-dashboard/profile" };

/** Exact match for a dashboard root, prefix match for everything nested under it. */
const matchesRoute = (pathname, href, isRoot) =>
  isRoot ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

const initials = (name) =>
  (name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

export default function DashboardShell({
  variant = "hr",
  searchPlaceholder = "Search employees, documents...",
  children,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const items = variant === "employee" ? EMPLOYEE_NAV : HR_NAV;
  const rootHref = items[0].href;

  useEffect(() => {
    const onClickAway = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, []);

  const handleLogout = () => {
    signOut();
    router.replace("/login");
  };

  return (
    <div className="bg-surface text-on-surface font-body-md h-screen flex overflow-hidden">
      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col bg-surface-container-lowest border-r border-outline-variant h-screen w-64 fixed left-0 py-6 px-4 z-50">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined">water_drop</span>
          </div>
          <div>
            <h1 className="text-title-md font-title-md font-black text-primary">Dayflow</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">HR Management</p>
          </div>
        </div>

        <ul className="flex flex-col gap-1 flex-grow">
          {items.map((item) => {
            const active = matchesRoute(pathname, item.href, item.href === rootHref);
            return (
              <li key={item.href}>
                <Link
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    active
                      ? "text-on-secondary-container bg-secondary-container font-bold scale-[0.98]"
                      : "text-on-surface-variant hover:bg-surface-container-highest"
                  }`}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    className="material-symbols-outlined"
                    style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto border-t border-outline-variant pt-4">
          <ul className="flex flex-col gap-1">
            <li>
              {variant === "hr" ? (
                <Link
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all"
                  href="/dashboard/settings"
                >
                  <span className="material-symbols-outlined">settings</span>
                  <span>Settings</span>
                </Link>
              ) : (
                <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all cursor-not-allowed opacity-60"
                  title="Coming soon"
                >
                  <span className="material-symbols-outlined">settings</span>
                  <span>Settings</span>
                </a>
              )}
            </li>
            <li>
              {variant === "hr" ? (
                <Link
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all"
                  href="/dashboard/help"
                >
                  <span className="material-symbols-outlined">help_outline</span>
                  <span>Help</span>
                </Link>
              ) : (
                <a
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all cursor-not-allowed opacity-60"
                  title="Coming soon"
                >
                  <span className="material-symbols-outlined">help_outline</span>
                  <span>Help</span>
                </a>
              )}
            </li>
            <li>
              <button
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-all"
                onClick={handleLogout}
                type="button"
              >
                <span className="material-symbols-outlined">logout</span>
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-grow flex flex-col md:ml-64 w-full h-screen overflow-hidden">
        {/* TopAppBar */}
        <header className="bg-surface flex justify-between items-center h-16 px-gutter border-b border-outline-variant sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-grow max-w-md">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-[10px] focus:ring-2 focus:ring-primary-container focus:border-primary focus:outline-none transition-colors text-body-sm font-body-sm"
                placeholder={searchPlaceholder}
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            {/* Persistent check-in/out systray — employees can punch in or
                out from any page, per the wireframe's header widget. */}
            {variant === "employee" && (
              <div className="pr-1 border-r border-outline-variant mr-1">
                <CheckInWidget />
              </div>
            )}

            <button
              className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant relative"
              title="Notifications (coming soon)"
              type="button"
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>

            {/* Profile avatar — clicking opens My Profile / Log Out, per the wireframe note */}
            <div className="relative" ref={menuRef}>
              <button
                className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm"
                onClick={() => setMenuOpen((open) => !open)}
                type="button"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                {initials(user?.name)}
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-[10px] shadow-lg py-1 z-50"
                  role="menu"
                >
                  <div className="px-4 py-2 border-b border-outline-variant">
                    <p className="font-body-sm text-body-sm font-medium text-on-surface truncate">
                      {user?.name || "Signed in"}
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                      {user?.email || ""}
                    </p>
                  </div>
                  <Link
                    className="flex items-center gap-2 px-4 py-2 font-body-sm text-body-sm text-on-surface hover:bg-surface-container-highest transition-colors"
                    href={PROFILE_PATH[variant] || PROFILE_PATH.hr}
                    onClick={() => setMenuOpen(false)}
                    role="menuitem"
                  >
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    My Profile
                  </Link>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 font-body-sm text-body-sm text-error hover:bg-error-container hover:text-on-error-container transition-colors"
                    onClick={handleLogout}
                    role="menuitem"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Canvas */}
        <main className="flex-grow overflow-y-auto p-gutter bg-surface">
          <div className="max-w-[1120px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

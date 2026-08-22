"use client";

import { useCallback, useEffect, useState } from "react";
import {
  checkIn,
  checkOut,
  myAttendance,
  emitAttendanceChanged,
  onAttendanceChanged,
} from "@/services/attendance";

/**
 * The persistent check-in/out "systray" from the wireframe — a compact
 * control that lives in the shared top app bar so an employee can punch in
 * or out from any page, not just the dashboard home.
 *
 * It owns its own copy of "today" (fetched from /attendance/me) and keeps
 * it in sync with the fuller attendance/dashboard cards through the
 * ATTENDANCE_CHANGED event: any check-in/out anywhere re-fetches all of
 * them, so the header and the page never disagree.
 */
const formatTime = (value) => {
  if (!value) return "--:--";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "--:--"
    : date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
};

export default function CheckInWidget() {
  const [today, setToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const response = await myAttendance();
    if (response.success) {
      setToday(response.data?.today || null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    // Re-fetch when any other surface changes attendance.
    return onAttendanceChanged(load);
  }, [load]);

  const act = async (fn, fallback) => {
    setBusy(true);
    setError("");
    const response = await fn();
    setBusy(false);
    if (response.success) {
      setToday(response.data?.record || null);
      emitAttendanceChanged();
    } else {
      setError(response.message || fallback);
    }
  };

  const checkedIn = Boolean(today?.checkIn);
  const checkedOut = Boolean(today?.checkOut);

  // A red dot means "not in yet", green pulsing means "currently in",
  // grey means "done for the day" — matching the wireframe's status dot.
  const dotClass = checkedOut
    ? "bg-outline"
    : checkedIn
    ? "bg-secondary animate-pulse"
    : "bg-error animate-pulse";

  return (
    <div className="flex items-center gap-2" title={error || undefined}>
      <span className={`w-2.5 h-2.5 rounded-full ${dotClass}`} aria-hidden="true"></span>

      {loading ? (
        <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline">
          …
        </span>
      ) : checkedOut ? (
        <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline">
          Day complete
        </span>
      ) : checkedIn ? (
        <>
          <span className="font-label-sm text-label-sm text-on-surface-variant hidden md:inline">
            Since {formatTime(today?.checkIn)}
          </span>
          <button
            onClick={() => act(checkOut, "Could not check out.")}
            disabled={busy}
            className="bg-secondary text-on-secondary font-label-sm text-label-sm px-3 py-1.5 rounded-lg hover:bg-opacity-90 transition-all active:scale-95 flex items-center gap-1.5 disabled:opacity-60"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span className="hidden sm:inline">Check Out</span>
          </button>
        </>
      ) : (
        <button
          onClick={() => act(checkIn, "Could not check in.")}
          disabled={busy}
          className="bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1.5 rounded-lg hover:bg-opacity-90 transition-all active:scale-95 flex items-center gap-1.5 disabled:opacity-60"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">fingerprint</span>
          <span className="hidden sm:inline">Check In</span>
        </button>
      )}
    </div>
  );
}

'use client';

import { useCallback, useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import {
  checkIn,
  checkOut,
  myAttendance,
  emitAttendanceChanged,
  onAttendanceChanged,
} from '@/services/attendance';

const STATUS_LABEL = {
  present: 'Present',
  'half-day': 'Half Day',
  leave: 'On Leave',
  absent: 'Absent',
};

const formatTime = (value) => {
  if (!value) return '--:--';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '--:--'
    : date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', weekday: 'short' });
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const now = new Date();

export default function EmployeeAttendance() {
  // 1-indexed month + full year, so we can move the window backward/forward.
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const [records, setRecords] = useState([]);
  const [today, setToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const isCurrentMonth = month === now.getMonth() + 1 && year === now.getFullYear();

  const load = useCallback(
    async ({ quiet = false } = {}) => {
      if (!quiet) setLoading(true);
      const response = await myAttendance(month, year);
      if (response.success) {
        setRecords((response.data?.records || []).slice().reverse());
        setToday(response.data?.today || null);
        setError('');
      } else {
        setError(response.message || 'Could not load your attendance.');
      }
      setLoading(false);
    },
    [month, year]
  );

  useEffect(() => {
    load();
    return onAttendanceChanged(() => load({ quiet: true }));
  }, [load]);

  const goPrevMonth = () => {
    setMonth((m) => {
      if (m === 1) {
        setYear((y) => y - 1);
        return 12;
      }
      return m - 1;
    });
  };

  const goNextMonth = () => {
    if (isCurrentMonth) return; // don't navigate into the future
    setMonth((m) => {
      if (m === 12) {
        setYear((y) => y + 1);
        return 1;
      }
      return m + 1;
    });
  };

  const totalMinutes = records.reduce((sum, r) => sum + (r.workMinutes || 0), 0);
  const hoursLabel = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;

  const handleCheckIn = async () => {
    setBusy(true);
    setError('');
    const response = await checkIn();
    setBusy(false);
    if (response.success) {
      load({ quiet: true });
      emitAttendanceChanged();
    } else setError(response.message || 'Could not check in.');
  };

  const handleCheckOut = async () => {
    setBusy(true);
    setError('');
    const response = await checkOut();
    setBusy(false);
    if (response.success) {
      load({ quiet: true });
      emitAttendanceChanged();
    } else setError(response.message || 'Could not check out.');
  };

  const checkedIn = Boolean(today?.checkIn);
  const checkedOut = Boolean(today?.checkOut);

  return (
    <DashboardShell variant="employee">
      <div className="mb-gutter">
        <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold">Attendance Overview</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Check in, check out, and review your attendance history.</p>
      </div>

      {error && (
        <div className="mb-gutter flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-gutter">
        <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-title-md text-title-md text-on-surface">Today</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Status:{' '}
                <strong className={checkedIn ? 'text-secondary' : 'text-error'}>
                  {checkedOut ? 'Checked out' : checkedIn ? 'Checked in' : 'Not checked in'}
                </strong>
              </p>
            </div>
            {!checkedIn ? (
              <button
                onClick={handleCheckIn}
                disabled={busy}
                className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-lg shadow-sm hover:bg-opacity-90 transition-all flex items-center gap-2 disabled:opacity-60"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">fingerprint</span>
                Check In
              </button>
            ) : !checkedOut ? (
              <button
                onClick={handleCheckOut}
                disabled={busy}
                className="bg-secondary text-on-secondary font-label-sm text-label-sm px-6 py-3 rounded-lg shadow-sm hover:bg-opacity-90 transition-all flex items-center gap-2 disabled:opacity-60"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Check Out
              </button>
            ) : (
              <span className="font-label-sm text-label-sm text-on-surface-variant px-4 py-2">Day complete</span>
            )}
          </div>
        </div>
        <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <div className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">
            Hours Logged ({MONTHS[month - 1].slice(0, 3)})
          </div>
          <div className="font-display-lg text-display-lg text-primary font-bold">{hoursLabel}</div>
        </div>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-bright">
          <h3 className="font-title-md text-title-md text-on-surface">Detailed Attendance Log</h3>
          {/* Month navigator — the wireframe's <- Month -> control. */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrevMonth}
              className="w-9 h-9 rounded-lg border border-outline-variant hover:bg-surface-container-highest text-on-surface-variant flex items-center justify-center transition-colors"
              title="Previous month"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <span className="font-body-sm text-body-sm font-medium text-on-surface min-w-[130px] text-center tabular-nums">
              {MONTHS[month - 1]} {year}
            </span>
            <button
              onClick={goNextMonth}
              disabled={isCurrentMonth}
              className="w-9 h-9 rounded-lg border border-outline-variant hover:bg-surface-container-highest text-on-surface-variant flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Next month"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8FA] border-b border-outline-variant">
                <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Date</th>
                <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Status</th>
                <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Check In</th>
                <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Check Out</th>
                <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Work Hours</th>
                <th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Extra Hours</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface">
              {loading ? (
                <tr><td className="p-4 text-on-surface-variant text-center" colSpan={6}>Loading…</td></tr>
              ) : records.length === 0 ? (
                <tr><td className="p-4 text-on-surface-variant text-center" colSpan={6}>No attendance recorded for this month.</td></tr>
              ) : (
                records.map((record) => (
                  <tr key={record._id} className="border-t border-outline-variant/50">
                    <td className="p-4">{formatDate(record.date)}</td>
                    <td className="p-4">{STATUS_LABEL[record.status] || record.status}</td>
                    <td className="p-4">{formatTime(record.checkIn)}</td>
                    <td className="p-4">{formatTime(record.checkOut)}</td>
                    <td className="p-4">{record.workHoursLabel || '--'}</td>
                    <td className="p-4">{record.extraHoursLabel || '0h 0m'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardShell>
  );
}

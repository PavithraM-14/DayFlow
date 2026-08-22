'use client';

import { useCallback, useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/context/AuthContext';
import { checkIn, checkOut, emitAttendanceChanged, onAttendanceChanged } from '@/services/attendance';
import { dashboardSummary } from '@/services/dashboard';

const formatTime = (value) => {
  if (!value) return '--:--';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '--:--'
    : date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

const timeAgo = (value) => {
  if (!value) return '';
  const diffMs = Date.now() - new Date(value).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
};

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const firstName = (user?.name || '').split(' ')[0] || 'there';

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async ({ quiet = false } = {}) => {
    if (!quiet) setLoading(true);
    const response = await dashboardSummary();
    if (response.success) {
      setSummary(response.data);
      setError('');
    } else {
      setError(response.message || 'Could not load your dashboard.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    // Stay in sync with the header check-in widget (and any other surface).
    return onAttendanceChanged(() => load({ quiet: true }));
  }, [load]);

  const handleCheckIn = async () => {
    setBusy(true);
    setError('');
    const response = await checkIn();
    setBusy(false);
    if (response.success) {
      load({ quiet: true });
      emitAttendanceChanged();
    } else {
      setError(response.message || 'Could not check in.');
    }
  };

  const handleCheckOut = async () => {
    setBusy(true);
    setError('');
    const response = await checkOut();
    setBusy(false);
    if (response.success) {
      load({ quiet: true });
      emitAttendanceChanged();
    } else {
      setError(response.message || 'Could not check out.');
    }
  };

  const today = summary?.today;
  const checkedIn = Boolean(summary?.checkedInToday);
  const checkedOut = Boolean(summary?.checkedOutToday);
  const balances = summary?.balances;

  return (
    <DashboardShell variant="employee">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">Good day, {firstName}.</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Here&apos;s an overview of your workday and pending items.</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 flex flex-col gap-6">
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div>
                <h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline">schedule</span>
                  Today&apos;s Attendance
                </h3>
                <div className="mt-4 flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${checkedIn && !checkedOut ? 'bg-secondary animate-pulse' : checkedOut ? 'bg-outline' : 'bg-error animate-pulse'}`}></div>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    Status:{' '}
                    <strong className={checkedIn ? 'text-secondary font-medium' : 'text-error font-medium'}>
                      {checkedOut ? 'Checked Out' : checkedIn ? 'Checked In' : 'Not Checked In'}
                    </strong>
                  </span>
                </div>
              </div>
              {!checkedIn ? (
                <button
                  onClick={handleCheckIn}
                  disabled={busy || loading}
                  className="bg-primary text-on-primary font-label-sm text-label-sm px-8 py-3 rounded-lg shadow-sm hover:bg-opacity-90 transition-all active:scale-95 flex items-center gap-2 self-stretch md:self-auto justify-center disabled:opacity-60"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">fingerprint</span>
                  Check In Now
                </button>
              ) : !checkedOut ? (
                <button
                  onClick={handleCheckOut}
                  disabled={busy || loading}
                  className="bg-secondary text-on-secondary font-label-sm text-label-sm px-8 py-3 rounded-lg shadow-sm hover:bg-opacity-90 transition-all active:scale-95 flex items-center gap-2 self-stretch md:self-auto justify-center disabled:opacity-60"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  Check Out
                </button>
              ) : (
                <span className="font-label-sm text-label-sm text-on-surface-variant px-4 py-2">Day complete</span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-outline-variant/50">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Check-in</span>
                <span className="font-title-md text-title-md text-on-surface">{formatTime(today?.checkIn)}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Check-out</span>
                <span className="font-title-md text-title-md text-on-surface">{formatTime(today?.checkOut)}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Total Hours</span>
                <span className="font-title-md text-title-md text-on-surface">{today?.workHoursLabel || '0h 0m'}</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-title-md text-title-md text-on-surface mb-4">Leave Balances</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-secondary">flight_takeoff</span>
                  <span className="bg-secondary/10 text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded-full">Available</span>
                </div>
                <div>
                  <h4 className="font-body-sm text-body-sm text-on-surface-variant">Paid Time Off</h4>
                  <div className="font-headline-lg text-headline-lg text-on-surface mt-1">
                    {balances ? balances.paid.available : '—'} <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">days</span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-primary">local_hospital</span>
                </div>
                <div>
                  <h4 className="font-body-sm text-body-sm text-on-surface-variant">Sick Leave</h4>
                  <div className="font-headline-lg text-headline-lg text-on-surface mt-1">
                    {balances ? balances.sick.available : '—'} <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">days</span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-outline">event_busy</span>
                </div>
                <div>
                  <h4 className="font-body-sm text-body-sm text-on-surface-variant">Unpaid Leave</h4>
                  <div className="font-title-md text-title-md text-on-surface mt-1">Available on request</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="md:col-span-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 h-full min-h-[400px]">
            <h3 className="font-title-md text-title-md text-on-surface mb-6">Recent Activity</h3>
            {summary?.recentActivity?.length ? (
              <div className="relative pl-4 border-l-2 border-surface-container-highest space-y-6">
                {summary.recentActivity.map((activity, index) => (
                  <div className="relative" key={index}>
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
                    <p className="font-body-sm text-body-sm text-on-surface">
                      Your <span className="font-medium">{activity.leaveType}</span> leave request was{' '}
                      <span className="font-medium">{activity.status}</span>.
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{timeAgo(activity.at)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-body-sm text-body-sm text-on-surface-variant">Nothing to show yet — this fills in as you check in, request time off, and get payslips.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

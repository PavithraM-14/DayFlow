'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { companyAttendanceForDay } from '@/services/attendance';

const STATUS_CHIP = {
  present: 'on-time',
  'half-day': 'late',
  leave: 'late',
  absent: 'late',
};

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

// Attendance is keyed by UTC day on the backend (see attendance.model.js),
// so navigation is done in UTC to stay consistent with check-in/out.
const isoDay = (date) => date.toISOString().slice(0, 10);
const TODAY_ISO = isoDay(new Date());

const shiftDay = (iso, delta) => {
  const [y, m, d] = iso.split('-').map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + delta));
  return isoDay(next);
};

const labelForDay = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

export default function HRAttendancePage() {
  const [selectedDay, setSelectedDay] = useState(TODAY_ISO);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const isToday = selectedDay === TODAY_ISO;
  const isFuture = selectedDay >= TODAY_ISO;

  const load = useCallback(async () => {
    setLoading(true);
    const dayResponse = await companyAttendanceForDay(selectedDay);
    if (dayResponse.success) {
      setRows(dayResponse.data?.rows || []);
      setError('');
    } else {
      setError(dayResponse.message || 'Could not load attendance for that day.');
    }
    setLoading(false);
  }, [selectedDay]);

  useEffect(() => {
    load();
  }, [load]);

  // Counts reflect the *selected* day, computed from the rows so they stay
  // correct as HR navigates back through history.
  const counts = useMemo(() => {
    const present = rows.filter((r) => ['present', 'half-day'].includes(r.status)).length;
    const onLeave = rows.filter((r) => r.status === 'leave').length;
    const absent = rows.filter((r) => r.status === 'absent').length;
    return { present, onLeave, absent, total: rows.length };
  }, [rows]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) => (row.employee?.name || '').toLowerCase().includes(term));
  }, [rows, search]);

  return (
    <DashboardShell variant="hr">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg md:text-[32px] md:leading-[40px] text-on-surface mb-1">
            Attendance Log{' '}
            {isToday && (
              <span className="font-accent-marker text-accent-marker text-secondary ml-2 marker-highlight">Today</span>
            )}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Track and monitor daily employee attendance and punctuality.</p>
        </div>

        {/* Day navigator — the wireframe's <- Day/Date -> control. */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedDay((d) => shiftDay(d, -1))}
            className="w-9 h-9 rounded-lg border border-outline-variant hover:bg-surface-container-highest text-on-surface-variant flex items-center justify-center transition-colors"
            title="Previous day"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <input
            type="date"
            value={selectedDay}
            max={TODAY_ISO}
            onChange={(event) => event.target.value && setSelectedDay(event.target.value)}
            className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-2 focus:ring-primary-container outline-none transition-all"
            aria-label="Attendance date"
          />
          <button
            onClick={() => setSelectedDay((d) => shiftDay(d, 1))}
            disabled={isFuture}
            className="w-9 h-9 rounded-lg border border-outline-variant hover:bg-surface-container-highest text-on-surface-variant flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="Next day"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
          {!isToday && (
            <button
              onClick={() => setSelectedDay(TODAY_ISO)}
              className="px-3 h-9 rounded-lg border border-outline-variant hover:bg-surface-container-highest text-on-surface font-body-sm text-body-sm transition-colors"
              type="button"
            >
              Today
            </button>
          )}
        </div>
      </div>

      <p className="font-body-sm text-body-sm text-on-surface-variant -mt-4 mb-6">
        Showing <span className="font-medium text-on-surface">{labelForDay(selectedDay)}</span>
      </p>

      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card-base card-hover p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-secondary-container rounded-lg text-on-secondary-container">
              <span className="material-symbols-outlined">how_to_reg</span>
            </div>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Present</p>
            <p className="font-display-lg text-display-lg text-on-surface">{loading ? '—' : counts.present}</p>
          </div>
        </div>
        <div className="card-base card-hover p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-fixed rounded-lg text-primary">
              <span className="material-symbols-outlined">beach_access</span>
            </div>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">On Leave</p>
            <p className="font-display-lg text-display-lg text-on-surface">{loading ? '—' : counts.onLeave}</p>
          </div>
        </div>
        <div className="card-base card-hover p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-error-container rounded-lg text-on-error-container">
              <span className="material-symbols-outlined">person_off</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">Out of {counts.total} Staff</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Total Absences</p>
            <p className="font-display-lg text-display-lg text-on-surface">{loading ? '—' : counts.absent}</p>
          </div>
        </div>
      </div>

      <div className="card-base overflow-hidden">
        <div className="p-4 border-b border-outline-variant bg-surface flex justify-between items-center">
          <h3 className="font-title-md text-title-md text-on-surface">Detailed Log</h3>
          <div className="relative w-full max-w-xs hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input
              className="w-full pl-9 pr-3 py-1.5 bg-surface border border-outline-variant rounded-lg text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-on-surface-variant"
              placeholder="Search employees..."
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8FA] border-b border-outline-variant">
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Employee</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Department</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Check In</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Check Out</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Work Hours</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Extra Hours</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant">
              {loading ? (
                <tr><td colSpan={7} className="py-6 px-4 text-center text-on-surface-variant">Loading…</td></tr>
              ) : filteredRows.length === 0 ? (
                <tr><td colSpan={7} className="py-6 px-4 text-center text-on-surface-variant">No records for this day.</td></tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.employee?._id || row.employee} className="hover:bg-surface-container-lowest transition-all duration-150 h-12 bg-surface">
                    <td className="py-2 px-4 font-medium">{row.employee?.name || 'Unknown'}</td>
                    <td className="py-2 px-4 text-on-surface-variant">{row.employee?.department || '—'}</td>
                    <td className="py-2 px-4 font-medium">{formatTime(row.checkIn)}</td>
                    <td className="py-2 px-4 text-on-surface-variant">{formatTime(row.checkOut)}</td>
                    <td className="py-2 px-4 text-on-surface-variant">{row.workHoursLabel || '--'}</td>
                    <td className="py-2 px-4 text-on-surface-variant">{row.extraHoursLabel || '0h 0m'}</td>
                    <td className="py-2 px-4">
                      <span className={`status-chip ${STATUS_CHIP[row.status] || 'late'}`}>{STATUS_LABEL[row.status] || row.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

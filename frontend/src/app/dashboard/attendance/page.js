'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { attendanceSummary, companyAttendanceForDay } from '@/services/attendance';

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

export default function HRAttendancePage() {
  const [summary, setSummary] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const [summaryResponse, dayResponse] = await Promise.all([
      attendanceSummary(),
      companyAttendanceForDay(),
    ]);
    if (summaryResponse.success) setSummary(summaryResponse.data);
    if (dayResponse.success) {
      setRows(dayResponse.data?.rows || []);
      setError('');
    } else {
      setError(dayResponse.message || 'Could not load today’s attendance.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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
            Attendance Log <span className="font-accent-marker text-accent-marker text-secondary ml-2 marker-highlight">Today</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Track and monitor daily employee attendance and punctuality.</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface transition-colors font-body-sm text-body-sm font-medium border border-outline-variant"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          Refresh
        </button>
      </div>

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
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Present Today</p>
            <p className="font-display-lg text-display-lg text-on-surface">{loading ? '—' : summary?.presentToday ?? 0}</p>
          </div>
        </div>
        <div className="card-base card-hover p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-fixed rounded-lg text-primary">
              <span className="material-symbols-outlined">beach_access</span>
            </div>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">On Leave Today</p>
            <p className="font-display-lg text-display-lg text-on-surface">{loading ? '—' : summary?.onLeaveToday ?? 0}</p>
          </div>
        </div>
        <div className="card-base card-hover p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-error-container rounded-lg text-on-error-container">
              <span className="material-symbols-outlined">person_off</span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">Out of {summary?.totalStaff ?? 0} Staff</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Total Absences Today</p>
            <p className="font-display-lg text-display-lg text-on-surface">{loading ? '—' : summary?.absentToday ?? 0}</p>
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
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Total Hours</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant">
              {loading ? (
                <tr><td colSpan={6} className="py-6 px-4 text-center text-on-surface-variant">Loading…</td></tr>
              ) : filteredRows.length === 0 ? (
                <tr><td colSpan={6} className="py-6 px-4 text-center text-on-surface-variant">No records for today.</td></tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.employee?._id || row.employee} className="hover:bg-surface-container-lowest transition-all duration-150 h-12 bg-surface">
                    <td className="py-2 px-4 font-medium">{row.employee?.name || 'Unknown'}</td>
                    <td className="py-2 px-4 text-on-surface-variant">{row.employee?.department || '—'}</td>
                    <td className="py-2 px-4 font-medium">{formatTime(row.checkIn)}</td>
                    <td className="py-2 px-4 text-on-surface-variant">{formatTime(row.checkOut)}</td>
                    <td className="py-2 px-4 text-on-surface-variant">{row.workHoursLabel || '--'}</td>
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

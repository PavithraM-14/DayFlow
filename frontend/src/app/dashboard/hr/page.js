'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/DashboardShell';
import { dashboardSummary } from '@/services/dashboard';
import { listEmployees } from '@/services/employees';
import { approveLeave, listCompanyLeaves, rejectLeave } from '@/services/timeOff';

const STATUS_DOT = {
  present: 'bg-[#2e7d32]',
  'half-day': 'bg-[#d97706]',
  leave: 'bg-primary',
  absent: 'bg-error',
  unmarked: 'bg-outline-variant',
};

const formatDateRange = (start, end) => {
  const fmt = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? '—'
      : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };
  return `${fmt(start)} - ${fmt(end)}`;
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

export default function HRDashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [actingOn, setActingOn] = useState(null);
  const [notice, setNotice] = useState('');

  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);

  const loadSummary = useCallback(async () => {
    const response = await dashboardSummary();
    if (response.success) {
      setSummary(response.data);
      setError('');
    } else {
      setError(response.message || 'Could not load dashboard data.');
    }
    setLoading(false);
  }, []);

  const loadRequests = useCallback(async ({ quiet = false } = {}) => {
    if (!quiet) setRequestsLoading(true);
    const response = await listCompanyLeaves('pending');
    if (response.success) {
      setRequests((response.data?.requests || []).slice(0, 5));
    }
    setRequestsLoading(false);
  }, []);

  const loadEmployees = useCallback(async () => {
    setEmployeesLoading(true);
    const response = await listEmployees();
    if (response.success) {
      setEmployees((response.data?.employees || []).slice(0, 6));
    }
    setEmployeesLoading(false);
  }, []);

  useEffect(() => {
    loadSummary();
    loadRequests();
    loadEmployees();
  }, [loadSummary, loadRequests, loadEmployees]);

  const act = async (request, action) => {
    setActingOn(request._id);
    setNotice('');
    const response =
      action === 'approve' ? await approveLeave(request._id) : await rejectLeave(request._id);
    setActingOn(null);
    if (response.success) {
      setNotice(response.message || 'Request updated.');
      loadRequests({ quiet: true });
      loadSummary();
    }
  };

  const totalEmployees = summary?.totalEmployees ?? 0;
  const presentToday = summary?.presentToday ?? 0;
  const onLeaveToday = summary?.onLeaveToday ?? 0;
  const absentToday = Math.max(0, totalEmployees - presentToday - onLeaveToday);
  const presentPercent = totalEmployees ? Math.round((presentToday / totalEmployees) * 100) : 0;
  const leavePercent = totalEmployees ? Math.round((onLeaveToday / totalEmployees) * 100) : 0;

  return (
    <DashboardShell variant="hr">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Overview</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Welcome back. Here&apos;s what&apos;s happening today.</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-gutter">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4 card-hover flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">Total Employees</span>
            <span className="material-symbols-outlined text-outline">groups</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-display-lg text-on-surface">{loading ? '—' : totalEmployees}</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4 card-hover flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">Present Today</span>
            <span className="material-symbols-outlined text-secondary">how_to_reg</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-display-lg text-on-surface">{loading ? '—' : presentToday}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">/ {totalEmployees} total</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4 card-hover flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-16 h-16 bg-primary-fixed-dim rounded-bl-full opacity-20"></div>
          <div className="flex justify-between items-start relative z-10">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">On Leave</span>
            <span className="material-symbols-outlined text-primary">beach_access</span>
          </div>
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="font-display-lg text-display-lg text-on-surface">{loading ? '—' : onLeaveToday}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Today</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4 card-hover flex flex-col justify-between h-32 border-l-4 border-l-secondary">
          <div className="flex justify-between items-start">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">Pending Actions</span>
            <span className="material-symbols-outlined text-secondary">notification_important</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-display-lg text-on-surface">{loading ? '—' : summary?.pendingActions ?? 0}</span>
            <span className="font-body-sm text-body-sm text-error flex items-center">
              {summary ? `${summary.pendingLeave} leave, ${summary.pendingSignups} sign-up` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden">
          <div className="px-4 py-3 border-b border-outline-variant flex justify-between items-center bg-[#FAF8FA]">
            <h3 className="font-title-md text-title-md text-on-surface">Pending Requests</h3>
            <a href="/dashboard/time-off" className="font-label-sm text-label-sm text-primary hover:underline">View All</a>
          </div>
          {notice && (
            <div className="px-4 py-2 font-body-sm text-body-sm text-secondary bg-secondary-container/40">{notice}</div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF8FA] border-b border-outline-variant font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  <th className="px-4 py-3 font-medium">Employee</th>
                  <th className="px-4 py-3 font-medium">Request Type</th>
                  <th className="px-4 py-3 font-medium">Dates</th>
                  <th className="px-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {requestsLoading ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center font-body-sm text-body-sm text-on-surface-variant">Loading…</td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center font-body-sm text-body-sm text-on-surface-variant">No pending requests.</td>
                  </tr>
                ) : (
                  requests.map((request) => {
                    const busy = actingOn === request._id;
                    return (
                      <tr key={request._id} className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors h-12">
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-sm">
                              {(request.employee?.name || '?').charAt(0).toUpperCase()}
                            </div>
                            <span className="font-body-sm text-body-sm font-medium">{request.employee?.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-primary-fixed text-on-primary-fixed">
                            {request.type}
                          </span>
                        </td>
                        <td className="px-4 py-2 font-body-sm text-body-sm text-on-surface-variant">
                          {formatDateRange(request.startDate, request.endDate)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => act(request, 'approve')}
                            className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container hover:opacity-80 transition-opacity inline-flex items-center justify-center mr-1 disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-[18px]">check</span>
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => act(request, 'reject')}
                            className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors inline-flex items-center justify-center disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4">
            <h3 className="font-title-md text-title-md text-on-surface mb-4">Attendance Overview</h3>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${presentPercent}, 100`} strokeWidth="4" />
                <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${leavePercent}, 100`} strokeDashoffset={`-${presentPercent}`} strokeWidth="4" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="font-title-md text-title-md text-on-surface">{presentPercent}%</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Present</span>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> Present ({presentToday})
              </div>
              <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Leave ({onLeaveToday})
              </div>
              <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-surface-container-high"></span> Absent ({absentToday})
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4 flex-grow">
            <h3 className="font-title-md text-title-md text-on-surface mb-4">Recent Activity</h3>
            {summary?.recentActivity?.length ? (
              <div className="relative pl-4 border-l-2 border-surface-container-highest space-y-6">
                {summary.recentActivity.map((activity, index) => (
                  <div className="relative" key={index}>
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
                    <p className="font-body-sm text-body-sm text-on-surface">
                      <span className="font-medium">{activity.employeeName || 'An employee'}</span>{' '}
                      {activity.leaveType} leave was <span className="font-medium">{activity.status}</span>.
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{timeAgo(activity.at)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-body-sm text-body-sm text-on-surface-variant">Nothing to show yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Employee list widget, per the spec's Admin dashboard requirement
          ("Displays: Employee list... Ability to switch between
          employees") — clicking straight into any employee's view-only
          profile from here is that "switching". */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden mt-gutter">
        <div className="px-4 py-3 border-b border-outline-variant flex justify-between items-center bg-[#FAF8FA]">
          <h3 className="font-title-md text-title-md text-on-surface">Employees</h3>
          <Link href="/dashboard/employee" className="font-label-sm text-label-sm text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="divide-y divide-outline-variant">
          {employeesLoading ? (
            <div className="p-6 text-center font-body-sm text-body-sm text-on-surface-variant">Loading…</div>
          ) : employees.length === 0 ? (
            <div className="p-6 text-center font-body-sm text-body-sm text-on-surface-variant">No employees yet.</div>
          ) : (
            employees.map((emp) => (
              <Link
                key={emp._id}
                href={`/dashboard/profile/${emp._id}`}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-container-lowest transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">
                      {(emp.name || '?').charAt(0).toUpperCase()}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-surface-container-lowest rounded-full ${STATUS_DOT[emp.todayStatus] || STATUS_DOT.unmarked}`}
                    ></span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-body-sm text-body-sm font-medium text-on-surface truncate">{emp.name}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                      {emp.jobPosition || (emp.role === 'hr' ? 'HR' : 'Employee')}
                      {emp.department ? ` · ${emp.department}` : ''}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline flex-shrink-0">chevron_right</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

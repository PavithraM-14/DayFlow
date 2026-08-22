'use client';

import { useCallback, useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { attendanceSummary } from '@/services/attendance';
import { approveLeave, listCompanyLeaves, rejectLeave } from '@/services/timeOff';

const TYPE_LABEL = { paid: 'Paid', sick: 'Sick', unpaid: 'Unpaid' };

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

export default function HRTimeOffPage() {
  const [statusFilter, setStatusFilter] = useState('pending');
  const [requests, setRequests] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [actingOn, setActingOn] = useState(null);

  const load = useCallback(
    async ({ quiet = false } = {}) => {
      if (!quiet) setLoading(true);

      const [listResponse, approvedResponse, availabilityResponse] = await Promise.all([
        listCompanyLeaves(statusFilter),
        listCompanyLeaves('approved'),
        attendanceSummary(),
      ]);

      if (listResponse.success) {
        setRequests(listResponse.data?.requests || []);
        setPendingCount(listResponse.data?.pendingCount ?? 0);
        setError('');
      } else {
        setError(listResponse.message || 'Could not load leave requests.');
      }

      if (approvedResponse.success) {
        const now = Date.now();
        const upcoming = (approvedResponse.data?.requests || []).filter(
          (r) => new Date(r.endDate).getTime() >= now
        );
        setUpcomingCount(upcoming.length);
      }

      if (availabilityResponse.success) setAvailability(availabilityResponse.data);

      setLoading(false);
    },
    [statusFilter]
  );

  useEffect(() => {
    load();
  }, [load]);

  const act = async (request, action) => {
    setActingOn(request._id);
    setNotice('');
    const response =
      action === 'approve' ? await approveLeave(request._id) : await rejectLeave(request._id);
    setActingOn(null);
    if (response.success) {
      setNotice(response.message || 'Request updated.');
      load({ quiet: true });
    } else {
      setError(response.message || 'Could not update that request.');
    }
  };

  const availabilityPercent = availability
    ? Math.round((availability.presentToday / Math.max(1, availability.totalStaff)) * 100)
    : 0;

  return (
    <DashboardShell variant="hr" searchPlaceholder="Search employees, requests...">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">Time Off Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Review and manage employee leave requests.</p>
        </div>
      </div>

      {notice && (
        <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-secondary-container text-on-secondary-container font-body-sm text-body-sm" role="status">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{notice}</span>
        </div>
      )}
      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#f59e0b]"></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-title-md text-title-md text-on-surface">Pending Approvals</h3>
            <div className="w-10 h-10 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center">
              <span className="material-symbols-outlined">hourglass_empty</span>
            </div>
          </div>
          <span className="font-display-lg text-display-lg text-on-background">{loading ? '—' : pendingCount}</span>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 tracking-wider">Requires attention</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-title-md text-title-md text-on-surface">Upcoming Leaves</h3>
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined">event_upcoming</span>
            </div>
          </div>
          <span className="font-display-lg text-display-lg text-on-background">{loading ? '—' : upcomingCount}</span>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 tracking-wider">Approved, not yet done</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-title-md text-title-md text-on-surface">Team Availability Today</h3>
            <div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined">group</span>
            </div>
          </div>
          <span className="font-display-lg text-display-lg text-on-background">{availability ? `${availabilityPercent}%` : '—'}</span>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 tracking-wider">
            {availability ? `${availability.presentToday}/${availability.totalStaff} present` : ''}
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FAF8FA]">
          <h3 className="font-title-md text-title-md text-on-surface">
            {statusFilter === 'pending' ? 'Pending Requests' : statusFilter === 'all' ? 'All Requests' : `${statusFilter[0].toUpperCase()}${statusFilter.slice(1)} Requests`}
          </h3>
          <select
            className="bg-surface border border-outline-variant text-body-sm font-body-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-container outline-none text-on-surface"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8FA] border-b border-outline-variant">
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Employee</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Type</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Dates</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">
                  {statusFilter === 'pending' ? 'Actions' : 'Status'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr><td colSpan={4} className="py-6 px-4 text-center text-on-surface-variant font-body-sm text-body-sm">Loading…</td></tr>
              ) : requests.length === 0 ? (
                <tr><td colSpan={4} className="py-6 px-4 text-center text-on-surface-variant font-body-sm text-body-sm">No requests here.</td></tr>
              ) : (
                requests.map((request) => {
                  const busy = actingOn === request._id;
                  return (
                    <tr key={request._id} className="hover:bg-surface-container-lowest transition-colors group h-12">
                      <td className="py-3 px-4 font-body-sm text-body-sm font-medium text-on-surface">{request.employee?.name || 'Unknown'}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-container text-on-surface">
                          {TYPE_LABEL[request.type] || request.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-body-sm text-body-sm text-on-surface">
                        {formatDate(request.startDate)} - {formatDate(request.endDate)} ({request.days}d)
                      </td>
                      <td className="py-3 px-4 text-right">
                        {request.status === 'pending' ? (
                          <div className="flex justify-end gap-2">
                            <button
                              disabled={busy}
                              onClick={() => act(request, 'approve')}
                              className="w-8 h-8 rounded border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors disabled:opacity-50"
                              title="Approve"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">check</span>
                            </button>
                            <button
                              disabled={busy}
                              onClick={() => act(request, 'reject')}
                              className="w-8 h-8 rounded border border-outline-variant text-on-surface-variant hover:bg-error hover:border-error hover:text-on-error flex items-center justify-center transition-colors disabled:opacity-50"
                              title="Reject"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                          </div>
                        ) : (
                          <span className="font-body-sm text-body-sm text-on-surface-variant capitalize">{request.status}</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

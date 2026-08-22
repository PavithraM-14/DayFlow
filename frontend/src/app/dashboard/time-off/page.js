'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { attendanceSummary } from '@/services/attendance';
import { approveLeave, listCompanyLeaves, openAttachment, rejectLeave } from '@/services/timeOff';
import { listEmployees, updateEmployee } from '@/services/employees';

const TYPE_LABEL = { paid: 'Paid', sick: 'Sick', unpaid: 'Unpaid' };

const STATUS_STYLES = {
  pending: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  approved: 'bg-secondary-container text-on-secondary-container',
  rejected: 'bg-error-container text-on-error-container',
};

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function HRTimeOffPage() {
  const [tab, setTab] = useState('requests');

  const [statusFilter, setStatusFilter] = useState('pending');
  const [requests, setRequests] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [actingOn, setActingOn] = useState(null);

  // The review dialog: { request, action: 'approve' | 'reject' } while open.
  const [review, setReview] = useState(null);
  const [reviewComment, setReviewComment] = useState('');

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

  const openReview = (request, action) => {
    setReviewComment('');
    setError('');
    setReview({ request, action });
  };

  const submitReview = async () => {
    if (!review) return;
    const { request, action } = review;
    const comment = reviewComment.trim();
    setActingOn(request._id);
    setNotice('');
    const response =
      action === 'approve'
        ? await approveLeave(request._id, comment)
        : await rejectLeave(request._id, comment);
    setActingOn(null);
    if (response.success) {
      setReview(null);
      setReviewComment('');
      setNotice(response.message || 'Request updated.');
      load({ quiet: true });
    } else {
      setError(response.message || 'Could not update that request.');
    }
  };

  const viewAttachment = async (id) => {
    const response = await openAttachment(id);
    if (!response.success) setError(response.message || 'Could not open the attachment.');
  };

  const availabilityPercent = availability
    ? Math.round((availability.presentToday / Math.max(1, availability.totalStaff)) * 100)
    : 0;

  return (
    <DashboardShell variant="hr" searchPlaceholder="Search employees, requests...">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">Time Off Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Review leave requests and manage each employee&apos;s allocation.</p>
        </div>
      </div>

      {/* Tabs — Requests / Allocation, per the wireframe. */}
      <div className="flex gap-1 mb-6 border-b border-outline-variant">
        {[
          { key: 'requests', label: 'Time Off' },
          { key: 'allocation', label: 'Allocation' },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 font-label-sm text-label-sm border-b-2 -mb-px transition-colors ${
              tab === t.key
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {t.label}
          </button>
        ))}
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

      {tab === 'requests' ? (
        <>
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
                    <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider whitespace-nowrap">Start Date</th>
                    <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider whitespace-nowrap">End Date</th>
                    <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {loading ? (
                    <tr><td colSpan={6} className="py-6 px-4 text-center text-on-surface-variant font-body-sm text-body-sm">Loading…</td></tr>
                  ) : requests.length === 0 ? (
                    <tr><td colSpan={6} className="py-6 px-4 text-center text-on-surface-variant font-body-sm text-body-sm">No requests here.</td></tr>
                  ) : (
                    requests.map((request) => {
                      const busy = actingOn === request._id;
                      return (
                        <tr key={request._id} className="hover:bg-surface-container-lowest transition-colors group align-top">
                          <td className="py-3 px-4 font-body-sm text-body-sm font-medium text-on-surface">
                            {request.employee?.name || 'Unknown'}
                            {request.attachment?.fileName && (
                              <button
                                type="button"
                                onClick={() => viewAttachment(request._id)}
                                className="mt-1 flex items-center gap-1 font-label-sm text-label-sm text-primary hover:underline"
                              >
                                <span className="material-symbols-outlined text-[14px]">attach_file</span>
                                Attachment
                              </button>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-container text-on-surface">
                              {TYPE_LABEL[request.type] || request.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-body-sm text-body-sm text-on-surface whitespace-nowrap">{formatDate(request.startDate)}</td>
                          <td className="py-3 px-4 font-body-sm text-body-sm text-on-surface whitespace-nowrap">
                            {formatDate(request.endDate)}
                            <span className="text-on-surface-variant"> ({request.days}d)</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2.5 py-1 rounded-full font-label-sm text-label-sm capitalize ${STATUS_STYLES[request.status] || ''}`}>
                              {request.status}
                            </span>
                            {request.status !== 'pending' && request.reviewComments && (
                              <div className="mt-1 font-label-sm text-label-sm text-on-surface-variant italic max-w-[200px]">
                                Note: {request.reviewComments}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {request.status === 'pending' ? (
                              <div className="flex justify-end gap-2">
                                <button
                                  disabled={busy}
                                  onClick={() => openReview(request, 'approve')}
                                  className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary hover:opacity-90 flex items-center gap-1.5 transition-opacity disabled:opacity-50 font-label-sm text-label-sm"
                                  title="Approve"
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[16px]">check</span>
                                  Approve
                                </button>
                                <button
                                  disabled={busy}
                                  onClick={() => openReview(request, 'reject')}
                                  className="px-3 py-1.5 rounded-lg bg-error text-on-error hover:opacity-90 flex items-center gap-1.5 transition-opacity disabled:opacity-50 font-label-sm text-label-sm"
                                  title="Reject"
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[16px]">close</span>
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span className="font-label-sm text-label-sm text-on-surface-variant">—</span>
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
        </>
      ) : (
        <AllocationTab onError={setError} onNotice={setNotice} />
      )}

      {review && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget && actingOn === null) setReview(null);
          }}
        >
          <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="font-title-md text-title-md text-on-surface">
                {review.action === 'approve' ? 'Approve' : 'Reject'} leave request
              </h3>
              <button
                type="button"
                onClick={() => setReview(null)}
                disabled={actingOn !== null}
                className="text-on-surface-variant hover:text-on-surface disabled:opacity-50"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="mb-4 p-3 rounded-lg bg-surface-container font-body-sm text-body-sm text-on-surface">
              <p className="font-medium">{review.request.employee?.name || 'Unknown'}</p>
              <p className="text-on-surface-variant mt-0.5">
                {TYPE_LABEL[review.request.type] || review.request.type} ·{' '}
                {formatDate(review.request.startDate)} - {formatDate(review.request.endDate)} ({review.request.days}d)
              </p>
              {review.request.remarks && (
                <p className="text-on-surface-variant mt-1 italic">“{review.request.remarks}”</p>
              )}
              {review.request.attachment?.fileName && (
                <button
                  type="button"
                  onClick={() => viewAttachment(review.request._id)}
                  className="mt-2 inline-flex items-center gap-1 font-label-sm text-label-sm text-primary hover:underline"
                >
                  <span className="material-symbols-outlined text-[14px]">attach_file</span>
                  {review.request.attachment.fileName}
                </button>
              )}
            </div>

            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="review_comment">
              Comment (optional)
            </label>
            <textarea
              id="review_comment"
              rows={3}
              className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none resize-none"
              placeholder={
                review.action === 'approve'
                  ? 'Add a note for the employee (optional)…'
                  : 'Let the employee know why (optional)…'
              }
              value={reviewComment}
              onChange={(event) => setReviewComment(event.target.value)}
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                type="button"
                onClick={() => setReview(null)}
                disabled={actingOn !== null}
                className="px-4 py-2 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-highest disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitReview}
                disabled={actingOn !== null}
                className={`px-4 py-2 rounded-lg font-label-sm text-label-sm disabled:opacity-60 ${
                  review.action === 'approve'
                    ? 'bg-secondary text-on-secondary hover:opacity-90'
                    : 'bg-error text-on-error hover:opacity-90'
                }`}
              >
                {actingOn !== null
                  ? 'Working…'
                  : review.action === 'approve'
                  ? 'Approve request'
                  : 'Reject request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

/**
 * The Allocation tab: HR sets each employee's annual paid & sick day
 * allocation. Persists through the employees API (leaveAllocation is an
 * HR-editable field), so the balances the time-off logic reads come from
 * here rather than the hard-coded 24/7 defaults.
 */
function AllocationTab({ onError, onNotice }) {
  const [employees, setEmployees] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const response = await listEmployees();
    if (response.success) {
      const list = response.data?.employees || [];
      setEmployees(list);
      const seed = {};
      list.forEach((e) => {
        seed[e._id] = {
          paid: e.leaveAllocation?.paid ?? 24,
          sick: e.leaveAllocation?.sick ?? 7,
        };
      });
      setDrafts(seed);
    } else {
      onError(response.message || 'Could not load employees.');
    }
    setLoading(false);
  }, [onError]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return employees;
    return employees.filter((e) => (e.name || '').toLowerCase().includes(term));
  }, [employees, search]);

  const setDraft = (id, key, value) =>
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));

  const save = async (emp) => {
    const draft = drafts[emp._id];
    const paid = Math.max(0, Number(draft.paid) || 0);
    const sick = Math.max(0, Number(draft.sick) || 0);
    setSavingId(emp._id);
    const response = await updateEmployee(emp._id, { leaveAllocation: { paid, sick } });
    setSavingId(null);
    if (response.success) {
      onNotice(`Updated ${emp.name}'s allocation.`);
      setEmployees((prev) =>
        prev.map((e) => (e._id === emp._id ? { ...e, leaveAllocation: { paid, sick } } : e))
      );
    } else {
      onError(response.message || 'Could not update allocation.');
    }
  };

  const dirty = (emp) => {
    const d = drafts[emp._id];
    if (!d) return false;
    return (
      Number(d.paid) !== (emp.leaveAllocation?.paid ?? 24) ||
      Number(d.sick) !== (emp.leaveAllocation?.sick ?? 7)
    );
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden">
      <div className="p-4 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FAF8FA]">
        <div>
          <h3 className="font-title-md text-title-md text-on-surface">Leave Allocation</h3>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Annual paid &amp; sick days for each employee.</p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
          <input
            className="w-full pl-9 pr-3 py-1.5 bg-surface border border-outline-variant rounded-lg text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container outline-none transition-all"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8FA] border-b border-outline-variant">
              <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Employee</th>
              <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Paid Days / Year</th>
              <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sick Days / Year</th>
              <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {loading ? (
              <tr><td colSpan={4} className="py-6 px-4 text-center text-on-surface-variant font-body-sm text-body-sm">Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={4} className="py-6 px-4 text-center text-on-surface-variant font-body-sm text-body-sm">No employees.</td></tr>
            ) : (
              filtered.map((emp) => (
                <tr key={emp._id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-3 px-4 font-body-sm text-body-sm font-medium text-on-surface">
                    {emp.name}
                    <span className="block font-label-sm text-label-sm text-on-surface-variant">{emp.department || '—'}</span>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="0"
                      className="w-24 bg-surface border border-outline-variant rounded-lg py-1.5 px-2 text-on-surface font-body-sm tabular-nums focus:border-primary focus:ring-2 focus:ring-primary-container outline-none"
                      value={drafts[emp._id]?.paid ?? ''}
                      onChange={(e) => setDraft(emp._id, 'paid', e.target.value)}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="0"
                      className="w-24 bg-surface border border-outline-variant rounded-lg py-1.5 px-2 text-on-surface font-body-sm tabular-nums focus:border-primary focus:ring-2 focus:ring-primary-container outline-none"
                      value={drafts[emp._id]?.sick ?? ''}
                      onChange={(e) => setDraft(emp._id, 'sick', e.target.value)}
                    />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => save(emp)}
                      disabled={savingId === emp._id || !dirty(emp)}
                      className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {savingId === emp._id ? 'Saving…' : 'Save'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

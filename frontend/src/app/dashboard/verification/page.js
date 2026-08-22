'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  approveEmployeeRequest,
  listEmployeeRequests,
  rejectEmployeeRequest,
} from '@/services/employeeRequests';

const TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
];

const STATUS_STYLES = {
  pending: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  approved: 'bg-secondary-container text-on-secondary-container',
  rejected: 'bg-error-container text-on-error-container',
};

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * The HR queue of people asking to join the company. Accepting a request
 * is what actually creates the user account, so this page is the gate
 * between signing up and being able to sign in.
 *
 * The sidebar, header and scroll container come from the shared
 * /dashboard layout — this renders the canvas only.
 */
export default function NewEmployeeVerificationPage() {
  const { user } = useAuth();

  const [tab, setTab] = useState('pending');
  const [requests, setRequests] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  // id of the row currently being approved/rejected, so only that row's
  // buttons spin rather than the whole table.
  const [actingOn, setActingOn] = useState(null);

  const isHr = user?.role === 'hr';

  const load = useCallback(async (status, { quiet = false } = {}) => {
    if (!quiet) setLoading(true);
    setError('');

    const response = await listEmployeeRequests(status);

    if (!response.success) {
      setError(response.message || 'Could not load registration requests.');
      setRequests([]);
    } else {
      setRequests(response.data?.requests || []);
      setPendingCount(response.data?.pendingCount ?? 0);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (isHr) load(tab);
  }, [tab, isHr, load]);

  const act = async (request, action) => {
    setActingOn(request._id);
    setError('');
    setNotice('');

    const response =
      action === 'approve'
        ? await approveEmployeeRequest(request._id)
        : await rejectEmployeeRequest(request._id);

    setActingOn(null);

    if (!response.success) {
      setError(response.message || 'Could not update that request.');
      // A 409 means someone else already decided it — refresh so the
      // table stops showing a stale row.
      if (response.status === 409) load(tab, { quiet: true });
      return;
    }

    setNotice(response.message || 'Request updated.');
    load(tab, { quiet: true });
  };

  // Only HR has this queue; anyone else gets told rather than shown an
  // empty table (the API would refuse them anyway).
  if (user && !isHr) {
    return (
      <main className="flex-grow p-gutter bg-surface flex items-center justify-center">
        <div className="max-w-md text-center">
          <span className="material-symbols-outlined text-[40px] text-outline">lock</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mt-2 mb-1">
            HR access only
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            New employee verification is available to HR accounts.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex-grow p-gutter bg-surface">
        <div className="max-w-[1120px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">
              New Employee Verification
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              People who have verified their email and asked to join
              {user?.company?.name ? ` ${user.company.name}` : ' your company'}.
              Accepting a request creates their account and lets them sign in.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-5 border-b border-outline-variant">
            {TABS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                className={`px-4 py-2 -mb-px border-b-2 font-body-sm text-body-sm transition-colors ${
                  tab === item.key
                    ? 'border-primary text-primary font-bold'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {item.label}
                {item.key === 'pending' && pendingCount > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
            <button
              type="button"
              onClick={() => load(tab)}
              className="ml-auto mb-1 px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-colors flex items-center gap-1.5 font-body-sm text-body-sm"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              Refresh
            </button>
          </div>

          {error && (
            <div
              className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm"
              role="alert"
            >
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{error}</span>
            </div>
          )}
          {notice && (
            <div
              className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-secondary-container text-on-secondary-container font-body-sm text-body-sm"
              role="status"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{notice}</span>
            </div>
          )}

          {/* Table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            {loading ? (
              <div
                className="p-10 text-center text-on-surface-variant font-body-sm text-body-sm"
                role="status"
              >
                Loading requests...
              </div>
            ) : requests.length === 0 ? (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined text-[40px] text-outline">
                  {tab === 'pending' ? 'inbox' : 'history'}
                </span>
                <p className="font-title-md text-title-md text-on-surface mt-2 mb-1">
                  No {tab} requests
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {tab === 'pending'
                    ? 'New sign-ups from your company will show up here.'
                    : `Nothing has been ${tab} yet.`}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant">Name</th>
                      <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant">Contact</th>
                      <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant">Role</th>
                      <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant">Requested</th>
                      <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant">Status</th>
                      <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant text-right">
                        {tab === 'pending' ? 'Decision' : 'Reviewed'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => {
                      const busy = actingOn === request._id;

                      return (
                        <tr
                          key={request._id}
                          className="border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <span className="w-9 h-9 flex-shrink-0 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                                {request.name?.charAt(0)?.toUpperCase() || '?'}
                              </span>
                              <span className="font-body-md text-body-md text-on-surface">
                                {request.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">
                            <div>{request.email}</div>
                            {request.phone && <div>{request.phone}</div>}
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-body-sm text-body-sm text-on-surface">
                              {request.role === 'hr' ? 'HR' : 'Employee'}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant whitespace-nowrap">
                            {formatDate(request.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full font-label-sm text-label-sm ${
                                STATUS_STYLES[request.status] || ''
                              }`}
                            >
                              {request.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {request.status === 'pending' ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  disabled={busy}
                                  onClick={() => act(request, 'approve')}
                                  title={`Accept ${request.name}`}
                                  aria-label={`Accept ${request.name}'s request`}
                                  className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
                                >
                                  <span className="material-symbols-outlined text-[20px]">
                                    {busy ? 'hourglass_top' : 'check'}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  disabled={busy}
                                  onClick={() => act(request, 'reject')}
                                  title={`Reject ${request.name}`}
                                  aria-label={`Reject ${request.name}'s request`}
                                  className="w-9 h-9 rounded-full bg-error-container text-on-error-container flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
                                >
                                  <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                              </div>
                            ) : (
                              <div className="text-right font-body-sm text-body-sm text-on-surface-variant">
                                <div>{formatDate(request.reviewedAt)}</div>
                                {request.reviewedBy?.name && (
                                  <div>by {request.reviewedBy.name}</div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

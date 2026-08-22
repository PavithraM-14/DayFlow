'use client';

import { useCallback, useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { applyForLeave, myLeaves } from '@/services/timeOff';

const TYPE_LABEL = { paid: 'Paid Time Off', sick: 'Sick Leave', unpaid: 'Unpaid Leave' };
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

const emptyForm = { type: 'paid', startDate: '', endDate: '', remarks: '' };

export default function EmployeeTimeOff() {
  const [requests, setRequests] = useState([]);
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const load = useCallback(async ({ quiet = false } = {}) => {
    if (!quiet) setLoading(true);
    const response = await myLeaves();
    if (response.success) {
      setRequests(response.data?.requests || []);
      setBalances(response.data?.balances || null);
      setError('');
    } else {
      setError(response.message || 'Could not load your leave requests.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!form.startDate || !form.endDate) {
      setFormError('Choose a start and end date.');
      return;
    }

    setSubmitting(true);
    const response = await applyForLeave(form);
    setSubmitting(false);

    if (!response.success) {
      setFormError(response.message || 'Could not submit that request.');
      return;
    }

    setForm(emptyForm);
    setNotice(response.message || 'Request submitted.');
    load({ quiet: true });
  };

  return (
    <DashboardShell variant="employee">
      <div className="mb-8">
        <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Time Off</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Manage your leave requests and view balances.</p>
      </div>

      {notice && (
        <div className="mb-6 flex items-start gap-2 p-3 rounded-lg bg-secondary-container text-on-secondary-container font-body-sm text-body-sm" role="status">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{notice}</span>
        </div>
      )}
      {error && (
        <div className="mb-6 flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-8 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
            <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              Current Balances
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-surface-container border border-surface-variant">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Paid Time Off</p>
                <div className="flex items-end gap-2">
                  <span className="font-headline-lg text-headline-lg text-primary">{balances ? balances.paid.available : '—'}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                    of {balances ? balances.paid.allocated : '—'} days available
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-surface-container border border-surface-variant">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Sick Leave</p>
                <div className="flex items-end gap-2">
                  <span className="font-headline-lg text-headline-lg text-secondary">{balances ? balances.sick.available : '—'}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                    of {balances ? balances.sick.allocated : '—'} days available
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="p-6 border-b border-surface-variant flex justify-between items-center bg-[#FAF8FA]">
              <h3 className="font-title-md text-title-md text-on-surface">Recent Requests</h3>
            </div>
            {loading ? (
              <div className="p-6 text-center text-on-surface-variant font-body-sm text-body-sm">Loading…</div>
            ) : requests.length === 0 ? (
              <div className="p-6 text-center text-on-surface-variant font-body-sm text-body-sm">No requests yet.</div>
            ) : (
              <div className="divide-y divide-outline-variant">
                {requests.map((request) => (
                  <div key={request._id} className="p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-body-sm text-body-sm font-medium text-on-surface">{TYPE_LABEL[request.type] || request.type}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                        {formatDate(request.startDate)} – {formatDate(request.endDate)} ({request.days}d)
                      </p>
                    </div>
                    <span className={`inline-block px-2.5 py-1 rounded-full font-label-sm text-label-sm ${STATUS_STYLES[request.status] || ''}`}>
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 h-full flex flex-col">
            <h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">edit_calendar</span>
              Request Time Off
            </h3>
            <form onSubmit={submit} className="flex-1 flex flex-col gap-4">
              {formError && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{formError}</span>
                </div>
              )}
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="leave_type">Leave Type</label>
                <select
                  className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all"
                  id="leave_type"
                  name="leave_type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="paid">Paid Time Off</option>
                  <option value="sick">Sick Leave</option>
                  <option value="unpaid">Unpaid Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="start_date">Start Date</label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all"
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="end_date">End Date</label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all"
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="reason">Remarks (Optional)</label>
                <textarea
                  className="w-full h-full min-h-[100px] bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all resize-none"
                  id="reason"
                  name="reason"
                  placeholder="Briefly describe your request..."
                  rows="3"
                  value={form.remarks}
                  onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                ></textarea>
              </div>
              <div className="mt-4 pt-4 border-t border-outline-variant">
                <button
                  className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary font-title-md text-title-md py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  type="submit"
                  disabled={submitting}
                >
                  <span className="material-symbols-outlined font-light text-[20px]">send</span>
                  {submitting ? 'Submitting…' : 'Submit Request'}
                </button>
                <p className="text-center font-accent-marker text-accent-marker text-on-surface-variant mt-3 opacity-70">
                  Needs HR approval
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/context/AuthContext';
import { applyForLeave, myLeaves, openAttachment } from '@/services/timeOff';

const TYPE_LABEL = { paid: 'Paid Time Off', sick: 'Sick Leave', unpaid: 'Unpaid Leave' };
const STATUS_STYLES = {
  pending: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  approved: 'bg-secondary-container text-on-secondary-container',
  rejected: 'bg-error-container text-on-error-container',
};

// Calendar day tints per leave type.
const TYPE_STYLE = {
  paid: { chip: 'bg-[#d1e0ff] text-[#0b57d0]', dot: 'bg-[#0b57d0]' },
  sick: { chip: 'bg-[#cdeee2] text-[#0a6c53]', dot: 'bg-[#0a6c53]' },
  unpaid: { chip: 'bg-[#fde7c9] text-[#9a5a06]', dot: 'bg-[#9a5a06]' },
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const dayKey = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

// Inclusive calendar-day count between two YYYY-MM-DD strings (mirrors the
// backend's inclusiveDays), so the modal can preview the allocation.
const inclusiveDays = (startStr, endStr) => {
  if (!startStr || !endStr) return 0;
  const s = new Date(`${startStr}T00:00:00Z`);
  const e = new Date(`${endStr}T00:00:00Z`);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime()) || e < s) return 0;
  return Math.round((e - s) / 86400000) + 1;
};

const emptyForm = { type: 'paid', startDate: '', endDate: '', remarks: '' };

const now = new Date();

export default function EmployeeTimeOff() {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calYear, setCalYear] = useState(now.getFullYear());

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const fileInputRef = useRef(null);
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

  // Map each covered day → { type, status }, preferring approved over
  // pending; rejected requests are ignored on the calendar.
  const dayMap = useMemo(() => {
    const map = new Map();
    requests
      .filter((r) => r.status === 'approved' || r.status === 'pending')
      .forEach((r) => {
        const s = new Date(r.startDate);
        const e = new Date(r.endDate);
        const cursor = new Date(Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()));
        const end = new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()));
        while (cursor <= end) {
          const key = dayKey(cursor.getUTCFullYear(), cursor.getUTCMonth(), cursor.getUTCDate());
          const existing = map.get(key);
          if (!existing || (existing.status === 'pending' && r.status === 'approved')) {
            map.set(key, { type: r.type, status: r.status });
          }
          cursor.setUTCDate(cursor.getUTCDate() + 1);
        }
      });
    return map;
  }, [requests]);

  const calendarCells = useMemo(() => {
    const firstDow = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDow; i += 1) cells.push(null);
    for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
    return cells;
  }, [calMonth, calYear]);

  const goPrev = () => {
    setCalMonth((m) => (m === 0 ? (setCalYear((y) => y - 1), 11) : m - 1));
  };
  const goNext = () => {
    setCalMonth((m) => (m === 11 ? (setCalYear((y) => y + 1), 0) : m + 1));
  };

  const openModal = () => {
    setForm(emptyForm);
    setAttachmentFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormError('');
    setModalOpen(true);
  };

  const requestedDays = inclusiveDays(form.startDate, form.endDate);

  const submit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!form.startDate || !form.endDate) {
      setFormError('Choose a start and end date.');
      return;
    }

    setSubmitting(true);
    const response = await applyForLeave({ ...form, attachment: attachmentFile });
    setSubmitting(false);

    if (!response.success) {
      setFormError(response.message || 'Could not submit that request.');
      return;
    }

    setModalOpen(false);
    setForm(emptyForm);
    setAttachmentFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setNotice(response.message || 'Request submitted.');
    load({ quiet: true });
  };

  const viewAttachment = async (id) => {
    const response = await openAttachment(id);
    if (!response.success) setError(response.message || 'Could not open the attachment.');
  };

  const todayKey = dayKey(now.getFullYear(), now.getMonth(), now.getDate());

  return (
    <DashboardShell variant="employee">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Time Off</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">View your leave calendar, balances and requests.</p>
        </div>
        <button
          type="button"
          onClick={openModal}
          className="bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-sm text-label-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm self-start"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Request Time Off
        </button>
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

      {/* Balances */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-gutter">
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Paid Time Off</p>
          <div className="flex items-end gap-2">
            <span className="font-headline-lg text-headline-lg text-primary tabular-nums">{balances ? balances.paid.available : '—'}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mb-1">of {balances ? balances.paid.allocated : '—'} days available</span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Sick Leave</p>
          <div className="flex items-end gap-2">
            <span className="font-headline-lg text-headline-lg text-secondary tabular-nums">{balances ? balances.sick.available : '—'}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant mb-1">of {balances ? balances.sick.allocated : '—'} days available</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Calendar */}
        <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-title-md text-title-md text-on-surface">{MONTHS[calMonth]} {calYear}</h3>
            <div className="flex items-center gap-2">
              <button onClick={goPrev} type="button" title="Previous month" className="w-9 h-9 rounded-lg border border-outline-variant hover:bg-surface-container-highest text-on-surface-variant flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button onClick={goNext} type="button" title="Next month" className="w-9 h-9 rounded-lg border border-outline-variant hover:bg-surface-container-highest text-on-surface-variant flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((w) => (
              <div key={w} className="text-center font-label-sm text-label-sm text-on-surface-variant uppercase py-1">{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarCells.map((day, idx) => {
              if (day === null) return <div key={`e${idx}`} className="aspect-square" />;
              const key = dayKey(calYear, calMonth, day);
              const entry = dayMap.get(key);
              const isToday = key === todayKey;
              const style = entry ? TYPE_STYLE[entry.type] : null;
              return (
                <div
                  key={key}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center relative border font-body-sm text-body-sm ${
                    entry
                      ? `${style.chip} ${entry.status === 'pending' ? 'border-dashed border-current' : 'border-transparent'}`
                      : 'border-transparent text-on-surface'
                  } ${isToday ? 'ring-2 ring-primary' : ''}`}
                  title={entry ? `${TYPE_LABEL[entry.type]} · ${entry.status}` : undefined}
                >
                  <span className="tabular-nums">{day}</span>
                  {entry && <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${style.dot}`}></span>}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-outline-variant font-label-sm text-label-sm text-on-surface-variant">
            <span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded bg-[#0b57d0] inline-block"></i> Paid</span>
            <span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded bg-[#0a6c53] inline-block"></i> Sick</span>
            <span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded bg-[#9a5a06] inline-block"></i> Unpaid</span>
            <span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded border border-dashed border-on-surface-variant inline-block"></i> Pending</span>
            <span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded ring-2 ring-primary inline-block"></i> Today</span>
          </div>
        </div>

        {/* Recent requests */}
        <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="p-4 border-b border-outline-variant bg-[#FAF8FA]">
            <h3 className="font-title-md text-title-md text-on-surface">Recent Requests</h3>
          </div>
          {loading ? (
            <div className="p-6 text-center text-on-surface-variant font-body-sm text-body-sm">Loading…</div>
          ) : requests.length === 0 ? (
            <div className="p-6 text-center text-on-surface-variant font-body-sm text-body-sm">No requests yet.</div>
          ) : (
            <div className="divide-y divide-outline-variant max-h-[420px] overflow-y-auto">
              {requests.map((request) => (
                <div key={request._id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-body-sm text-body-sm font-medium text-on-surface">{TYPE_LABEL[request.type] || request.type}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                        {formatDate(request.startDate)} – {formatDate(request.endDate)} ({request.days}d)
                      </p>
                    </div>
                    <span className={`shrink-0 inline-block px-2.5 py-1 rounded-full font-label-sm text-label-sm ${STATUS_STYLES[request.status] || ''}`}>
                      {request.status}
                    </span>
                  </div>
                  {request.attachment?.fileName && (
                    <button
                      type="button"
                      onClick={() => viewAttachment(request._id)}
                      className="mt-1.5 inline-flex items-center gap-1 font-label-sm text-label-sm text-primary hover:underline"
                    >
                      <span className="material-symbols-outlined text-[14px]">attach_file</span>
                      {request.attachment.fileName}
                    </button>
                  )}
                  {request.reviewComments && (
                    <p className="mt-1.5 font-label-sm text-label-sm text-on-surface-variant italic">HR note: {request.reviewComments}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Request modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget && !submitting) setModalOpen(false);
          }}
        >
          <div className="w-full max-w-lg bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
              <h3 className="font-title-md text-title-md text-on-surface">Time Off Request</h3>
              <button type="button" onClick={() => setModalOpen(false)} disabled={submitting} className="text-on-surface-variant hover:text-on-surface disabled:opacity-50" aria-label="Close">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={submit} className="p-6 flex flex-col gap-4">
              {formError && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Employee</label>
                <input
                  className="w-full bg-surface-container border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface-variant font-body-md"
                  value={user?.name || 'You'}
                  readOnly
                />
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="leave_type">Time Off Type</label>
                <select
                  className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                  id="leave_type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="paid">Paid Time Off</option>
                  <option value="sick">Sick Leave</option>
                  <option value="unpaid">Unpaid Leave</option>
                </select>
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Validity Period</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                    type="date"
                    aria-label="Start date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  />
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                    type="date"
                    aria-label="End date"
                    value={form.endDate}
                    min={form.startDate || undefined}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Allocation</span>
                <span className="font-title-md text-title-md text-on-surface tabular-nums">
                  {requestedDays ? `${requestedDays} day${requestedDays === 1 ? '' : 's'}` : '—'}
                </span>
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="reason">Remarks (optional)</label>
                <textarea
                  className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none resize-none"
                  id="reason"
                  rows="2"
                  placeholder="Briefly describe your request..."
                  value={form.remarks}
                  onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                ></textarea>
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="attachment">
                  Attachment {form.type === 'sick' ? '(sick leave certificate)' : '(optional)'}
                </label>
                <input
                  ref={fileInputRef}
                  className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-sm text-body-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-secondary-container file:text-on-secondary-container file:font-label-sm file:text-label-sm hover:file:opacity-90 focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                  id="attachment"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                  onChange={(e) => setAttachmentFile(e.target.files?.[0] || null)}
                />
                {attachmentFile && (
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 truncate">{attachmentFile.name}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-outline-variant">
                <button type="button" onClick={() => setModalOpen(false)} disabled={submitting} className="px-4 py-2 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-highest disabled:opacity-50">
                  Discard
                </button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-secondary text-on-secondary rounded-lg font-label-sm text-label-sm hover:opacity-90 disabled:opacity-60 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  {submitting ? 'Submitting…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

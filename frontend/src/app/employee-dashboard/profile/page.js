'use client';

import { useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import DocumentsPanel from '@/components/DocumentsPanel';
import TagListEditor from '@/components/TagListEditor';
import { useAuth } from '@/context/AuthContext';
import { updateEmployee } from '@/services/employees';

export default function EmployeeProfile() {
  const { user, refreshUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    phone: user?.phone || '',
    personalEmail: user?.personalEmail || '',
    address: user?.address || '',
    about: user?.about || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [skills, setSkills] = useState(user?.skills || []);
  const [certifications, setCertifications] = useState(user?.certifications || []);
  const [savingTags, setSavingTags] = useState(false);

  const [editingBank, setEditingBank] = useState(false);
  const [bankForm, setBankForm] = useState({
    bankName: user?.bankDetails?.bankName || '',
    accountNumber: user?.bankDetails?.accountNumber || '',
    ifscCode: user?.bankDetails?.ifscCode || '',
    uanNumber: user?.bankDetails?.uanNumber || '',
    panNumber: user?.bankDetails?.panNumber || '',
  });
  const [savingBank, setSavingBank] = useState(false);

  const saveTags = async (nextSkills, nextCertifications) => {
    if (!user?._id) return;
    setSavingTags(true);
    setNotice('');
    const response = await updateEmployee(user._id, { skills: nextSkills, certifications: nextCertifications });
    setSavingTags(false);
    if (response.success) {
      await refreshUser();
      setNotice('Skills & certifications updated.');
    } else {
      setError(response.message || 'Could not save that.');
    }
  };

  const saveBank = async (event) => {
    event.preventDefault();
    if (!user?._id) return;
    setSavingBank(true);
    setNotice('');
    const response = await updateEmployee(user._id, { bankDetails: bankForm });
    setSavingBank(false);
    if (response.success) {
      await refreshUser();
      setEditingBank(false);
      setNotice('Bank details updated.');
    } else {
      setError(response.message || 'Could not save bank details.');
    }
  };

  const startEditing = () => {
    setForm({
      phone: user?.phone || '',
      personalEmail: user?.personalEmail || '',
      address: user?.address || '',
      about: user?.about || '',
    });
    setError('');
    setEditing(true);
  };

  const save = async (event) => {
    event.preventDefault();
    if (!user?._id) return;
    setSaving(true);
    setError('');
    const response = await updateEmployee(user._id, form);
    setSaving(false);
    if (response.success) {
      await refreshUser();
      setEditing(false);
      setNotice('Profile updated.');
    } else {
      setError(response.message || 'Could not save changes.');
    }
  };

  return (
    <DashboardShell variant="employee">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant pb-4">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface">{user?.name || 'My Profile'}</h2>
          <p className="font-title-md text-title-md text-primary mt-2">{user?.company?.name || ''}</p>
        </div>
        {!editing && (
          <button
            type="button"
            onClick={startEditing}
            className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1 self-start"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span> Edit contact details
          </button>
        )}
      </div>

      {notice && (
        <div className="mt-gutter flex items-start gap-2 p-3 rounded-lg bg-secondary-container text-on-secondary-container font-body-sm text-body-sm" role="status">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{notice}</span>
        </div>
      )}
      {error && (
        <div className="mt-gutter flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mt-gutter">
        <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xl">
              {(user?.name || '?').charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="inline-block px-2 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase mb-1">Active</span>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Login ID: {user?.loginId || '—'}</p>
            </div>
          </div>

          {!editing ? (
            <div className="space-y-4">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Email</p>
                <p className="font-body-md text-body-md">{user?.email}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Phone</p>
                <p className="font-body-md text-body-md">{user?.phone || '—'}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Personal Email</p>
                <p className="font-body-md text-body-md">{user?.personalEmail || '—'}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Address</p>
                <p className="font-body-md text-body-md">{user?.address || '—'}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">About</p>
                <p className="font-body-md text-body-md">{user?.about || '—'}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={save} className="flex flex-col gap-4">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Phone</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Personal Email</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                  value={form.personalEmail}
                  onChange={(e) => setForm({ ...form, personalEmail: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Address</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">About</label>
                <textarea
                  className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none resize-none"
                  rows={3}
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-highest">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:opacity-90 disabled:opacity-60">
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary">work</span>
            <h3 className="font-title-md text-title-md">Role &amp; Organization</h3>
          </div>
          {user?.department || user?.jobPosition ? (
            <div className="grid grid-cols-2 gap-4 font-body-sm text-body-sm">
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Department</p>
                <p>{user?.department || '—'}</p>
              </div>
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Job Position</p>
                <p>{user?.jobPosition || '—'}</p>
              </div>
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Location</p>
                <p>{user?.location || '—'}</p>
              </div>
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Date of Joining</p>
                <p>{user?.dateOfJoining ? new Date(user.dateOfJoining).toLocaleDateString() : '—'}</p>
              </div>
            </div>
          ) : (
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Job details, department, and manager will show here once HR fills them in on your record.
            </p>
          )}
        </div>

        <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <h3 className="font-title-md text-title-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">workspace_premium</span>
            Skills &amp; Certifications
          </h3>
          <div className="mb-4">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Skills</p>
            <TagListEditor
              value={skills}
              onChange={(next) => {
                setSkills(next);
                saveTags(next, certifications);
              }}
              placeholder="Add a skill"
            />
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Certifications</p>
            <TagListEditor
              value={certifications}
              onChange={(next) => {
                setCertifications(next);
                saveTags(skills, next);
              }}
              placeholder="Add a certification"
            />
          </div>
          {savingTags && <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">Saving…</p>}
        </div>

        <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-title-md text-title-md flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_balance</span>
              Bank Details
            </h3>
            {!editingBank && (
              <button
                type="button"
                onClick={() => setEditingBank(true)}
                className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span> Edit
              </button>
            )}
          </div>
          {!editingBank ? (
            <div className="grid grid-cols-1 gap-3 font-body-sm text-body-sm">
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Bank Name</p>
                <p>{bankForm.bankName || '—'}</p>
              </div>
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Account Number</p>
                <p>{bankForm.accountNumber || '—'}</p>
              </div>
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">IFSC Code</p>
                <p>{bankForm.ifscCode || '—'}</p>
              </div>
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">PAN No</p>
                <p>{bankForm.panNumber || '—'}</p>
              </div>
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">UAN No</p>
                <p>{bankForm.uanNumber || '—'}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={saveBank} className="flex flex-col gap-3">
              {['bankName', 'accountNumber', 'ifscCode', 'panNumber', 'uanNumber'].map((field) => (
                <div key={field}>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1 capitalize">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                    value={bankForm[field]}
                    onChange={(e) => setBankForm({ ...bankForm, [field]: e.target.value })}
                  />
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-1">
                <button type="button" onClick={() => setEditingBank(false)} className="px-4 py-2 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-highest">
                  Cancel
                </button>
                <button type="submit" disabled={savingBank} className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:opacity-90 disabled:opacity-60">
                  {savingBank ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <h3 className="font-title-md text-title-md mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">description</span>
            My Documents
          </h3>
          {user?._id && <DocumentsPanel employeeId={user._id} canUpload />}
        </div>
      </div>
    </DashboardShell>
  );
}

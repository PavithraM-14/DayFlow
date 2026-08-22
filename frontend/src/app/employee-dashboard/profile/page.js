'use client';

import { useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import DocumentsPanel from '@/components/DocumentsPanel';
import TagListEditor from '@/components/TagListEditor';
import AvatarUploader from '@/components/AvatarUploader';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import { useAuth } from '@/context/AuthContext';
import { updateEmployee } from '@/services/employees';

const toDateInput = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
};

const displayDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString();
};

const TABS = [
  { key: 'resume', label: 'Resume' },
  { key: 'private', label: 'Private Info' },
  { key: 'security', label: 'Security' },
];

const BANK_FIELDS = [
  ['bankName', 'Bank Name'],
  ['accountNumber', 'Account Number'],
  ['ifscCode', 'IFSC Code'],
  ['panNumber', 'PAN No'],
  ['uanNumber', 'UAN No'],
];

export default function EmployeeProfile() {
  const { user, refreshUser } = useAuth();

  const [tab, setTab] = useState('resume');

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(buildForm(user));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [skills, setSkills] = useState(user?.skills || []);
  const [certifications, setCertifications] = useState(user?.certifications || []);
  const [interests, setInterests] = useState(user?.interests || []);
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

  function buildForm(u) {
    return {
      phone: u?.phone || '',
      personalEmail: u?.personalEmail || '',
      address: u?.address || '',
      about: u?.about || '',
      dateOfBirth: toDateInput(u?.dateOfBirth),
      gender: u?.gender || '',
      maritalStatus: u?.maritalStatus || '',
      nationality: u?.nationality || '',
    };
  }

  const saveTags = async (payload, successMsg) => {
    if (!user?._id) return;
    setSavingTags(true);
    setNotice('');
    const response = await updateEmployee(user._id, payload);
    setSavingTags(false);
    if (response.success) {
      await refreshUser();
      setNotice(successMsg);
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
    setForm(buildForm(user));
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

  const card = 'bg-surface-container-lowest border border-outline-variant rounded-xl p-6';
  const inputClass =
    'w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none';

  return (
    <DashboardShell variant="employee">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-outline-variant pb-6">
        <AvatarUploader
          employeeId={user?._id}
          name={user?.name}
          canEdit
          className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-2xl shrink-0"
          textClassName="text-2xl"
        />
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface">{user?.name || 'My Profile'}</h2>
          <p className="font-title-md text-title-md text-primary mt-1">
            {user?.jobPosition || 'Employee'}{user?.department ? ` · ${user.department}` : ''}
          </p>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Login ID: {user?.loginId || '—'}</p>
        </div>
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

      {/* Tabs */}
      <div className="flex gap-1 mt-gutter mb-gutter border-b border-outline-variant">
        {TABS.map((t) => (
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

      {/* RESUME */}
      {tab === 'resume' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className={`md:col-span-8 ${card}`}>
            <h3 className="font-title-md text-title-md mb-3">About</h3>
            <p className="font-body-md text-body-md text-on-surface mb-6">{user?.about || 'No summary added yet — add one from Private Info.'}</p>

            <div className="grid grid-cols-2 gap-4 font-body-sm text-body-sm border-t border-outline-variant pt-4">
              <Field label="Department" value={user?.department} />
              <Field label="Job Position" value={user?.jobPosition} />
              <Field label="Location" value={user?.location} />
              <Field label="Date of Joining" value={displayDate(user?.dateOfJoining)} />
            </div>
          </div>

          <div className={`md:col-span-4 ${card}`}>
            <h3 className="font-title-md text-title-md mb-4">Documents</h3>
            {user?._id && <DocumentsPanel employeeId={user._id} canUpload />}
          </div>

          <div className={`md:col-span-4 ${card}`}>
            <h3 className="font-title-md text-title-md mb-4">Skills</h3>
            <TagListEditor value={skills} onChange={(next) => { setSkills(next); saveTags({ skills: next }, 'Skills updated.'); }} placeholder="Add a skill" />
          </div>
          <div className={`md:col-span-4 ${card}`}>
            <h3 className="font-title-md text-title-md mb-4">Certifications</h3>
            <TagListEditor value={certifications} onChange={(next) => { setCertifications(next); saveTags({ certifications: next }, 'Certifications updated.'); }} placeholder="Add a certification" />
          </div>
          <div className={`md:col-span-4 ${card}`}>
            <h3 className="font-title-md text-title-md mb-4">Interests &amp; Hobbies</h3>
            <TagListEditor value={interests} onChange={(next) => { setInterests(next); saveTags({ interests: next }, 'Interests updated.'); }} placeholder="Add an interest" />
            {savingTags && <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">Saving…</p>}
          </div>
        </div>
      )}

      {/* PRIVATE INFO */}
      {tab === 'private' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className={`md:col-span-8 ${card}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-title-md text-title-md">Contact &amp; Personal</h3>
              {!editing && (
                <button type="button" onClick={startEditing} className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                </button>
              )}
            </div>

            {!editing ? (
              <div className="grid grid-cols-2 gap-4 font-body-sm text-body-sm">
                <Field label="Email" value={user?.email} />
                <Field label="Phone" value={user?.phone} />
                <Field label="Personal Email" value={user?.personalEmail} />
                <Field label="Address" value={user?.address} />
                <Field label="Date of Birth" value={displayDate(user?.dateOfBirth)} />
                <Field label="Gender" value={user?.gender} />
                <Field label="Marital Status" value={user?.maritalStatus} />
                <Field label="Nationality" value={user?.nationality} />
                <div className="col-span-2">
                  <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">About</p>
                  <p>{user?.about || '—'}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={save} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Labeled label="Phone"><input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Labeled>
                  <Labeled label="Personal Email"><input className={inputClass} value={form.personalEmail} onChange={(e) => setForm({ ...form, personalEmail: e.target.value })} /></Labeled>
                  <Labeled label="Date of Birth"><input type="date" className={inputClass} value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} /></Labeled>
                  <Labeled label="Gender"><input className={inputClass} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} /></Labeled>
                  <Labeled label="Marital Status"><input className={inputClass} value={form.maritalStatus} onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })} /></Labeled>
                  <Labeled label="Nationality"><input className={inputClass} value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} /></Labeled>
                  <div className="col-span-2">
                    <Labeled label="Address"><input className={inputClass} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></Labeled>
                  </div>
                </div>
                <Labeled label="About">
                  <textarea className={`${inputClass} resize-none`} rows={3} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
                </Labeled>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-highest">Cancel</button>
                  <button type="submit" disabled={saving} className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:opacity-90 disabled:opacity-60">
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className={`md:col-span-4 ${card}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-title-md text-title-md flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">account_balance</span>
                Bank Details
              </h3>
              {!editingBank && (
                <button type="button" onClick={() => setEditingBank(true)} className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                </button>
              )}
            </div>
            {!editingBank ? (
              <div className="grid grid-cols-1 gap-3 font-body-sm text-body-sm">
                {BANK_FIELDS.map(([key, label]) => (
                  <Field key={key} label={label} value={bankForm[key]} />
                ))}
              </div>
            ) : (
              <form onSubmit={saveBank} className="flex flex-col gap-3">
                {BANK_FIELDS.map(([key, label]) => (
                  <Labeled key={key} label={label}>
                    <input className={inputClass} value={bankForm[key]} onChange={(e) => setBankForm({ ...bankForm, [key]: e.target.value })} />
                  </Labeled>
                ))}
                <div className="flex justify-end gap-3 pt-1">
                  <button type="button" onClick={() => setEditingBank(false)} className="px-4 py-2 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-highest">Cancel</button>
                  <button type="submit" disabled={savingBank} className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:opacity-90 disabled:opacity-60">
                    {savingBank ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SECURITY */}
      {tab === 'security' && (
        <div className={card}>
          <h3 className="font-title-md text-title-md mb-4">Change Password</h3>
          <ChangePasswordForm />
        </div>
      )}
    </DashboardShell>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">{label}</p>
      <p className="font-body-md text-body-md">{value || '—'}</p>
    </div>
  );
}

function Labeled({ label, children }) {
  return (
    <div>
      <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">{label}</label>
      {children}
    </div>
  );
}

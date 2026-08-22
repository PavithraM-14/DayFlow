'use client';

import { useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import AvatarUploader from '@/components/AvatarUploader';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import { useAuth } from '@/context/AuthContext';
import { updateEmployee } from '@/services/employees';

export default function HRSelfProfilePage() {
  const { user, refreshUser } = useAuth();

  const [tab, setTab] = useState('profile');
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
    <DashboardShell variant="hr">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-primary-container to-secondary-container opacity-20 absolute w-full top-0"></div>
        <div className="p-gutter relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 mt-8">
          <AvatarUploader
            employeeId={user?._id}
            name={user?.name}
            canEdit
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-display-lg text-[40px] border-4 border-surface-container-lowest shadow-sm shrink-0"
            textClassName="font-display-lg text-[40px]"
          />
          <div className="flex-1">
            <h2 className="font-headline-lg text-headline-lg text-on-background">{user?.name || 'My Profile'}</h2>
            <p className="font-title-md text-title-md text-on-surface-variant mb-1">{user?.company?.name || 'HR'}</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Login ID: {user?.loginId || '—'}</p>
          </div>
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

      <div className="flex gap-1 mt-gutter border-b border-outline-variant">
        {[
          { key: 'profile', label: 'Profile' },
          { key: 'security', label: 'Security' },
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

      {tab === 'security' && (
        <div className="mt-gutter bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
          <h3 className="font-title-md text-title-md mb-4">Change Password</h3>
          <ChangePasswordForm />
        </div>
      )}

      {tab === 'profile' && (
      <div className="mt-gutter bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-title-md text-title-md">Contact Details</h3>
          {!editing && (
            <button type="button" onClick={startEditing} className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">edit</span> Edit
            </button>
          )}
        </div>

        {!editing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body-sm text-body-sm">
            <div>
              <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Email</p>
              <p>{user?.email}</p>
            </div>
            <div>
              <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Phone</p>
              <p>{user?.phone || '—'}</p>
            </div>
            <div>
              <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Personal Email</p>
              <p>{user?.personalEmail || '—'}</p>
            </div>
            <div>
              <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Address</p>
              <p>{user?.address || '—'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">About</p>
              <p>{user?.about || '—'}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={save} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="md:col-span-2">
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Address</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
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
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
      )}
    </DashboardShell>
  );
}

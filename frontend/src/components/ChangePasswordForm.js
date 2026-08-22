"use client";

import { useState } from "react";
import { changePassword } from "@/services/auth";

/**
 * The Security tab's change-password form. Requires the current password
 * and confirms the new one client-side before hitting the API (which
 * enforces the real strength policy).
 */
export default function ChangePasswordForm() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!form.currentPassword || !form.newPassword) {
      setError("Enter your current and new password.");
      return;
    }
    if (form.newPassword !== form.confirm) {
      setError("The new passwords do not match.");
      return;
    }

    setSaving(true);
    const response = await changePassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    });
    setSaving(false);

    if (response.success) {
      setNotice("Password changed.");
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
    } else {
      setError(response.message || "Could not change your password.");
    }
  };

  const inputClass =
    "w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none";

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 max-w-md">
      {notice && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary-container text-on-secondary-container font-body-sm text-body-sm" role="status">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{notice}</span>
        </div>
      )}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Current Password</label>
        <input type="password" className={inputClass} value={form.currentPassword} onChange={set("currentPassword")} autoComplete="current-password" />
      </div>
      <div>
        <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">New Password</label>
        <input type="password" className={inputClass} value={form.newPassword} onChange={set("newPassword")} autoComplete="new-password" />
      </div>
      <div>
        <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Confirm New Password</label>
        <input type="password" className={inputClass} value={form.confirm} onChange={set("confirm")} autoComplete="new-password" />
      </div>

      <div>
        <button type="submit" disabled={saving} className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:opacity-90 disabled:opacity-60">
          {saving ? "Changing…" : "Change Password"}
        </button>
      </div>
    </form>
  );
}

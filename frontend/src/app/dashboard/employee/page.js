'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/DashboardShell';
import { createEmployee, listEmployees } from '@/services/employees';

const STATUS_DOT = {
  present: 'bg-[#2e7d32]',
  'half-day': 'bg-[#d97706]',
  leave: 'bg-primary',
  absent: 'bg-error',
  unmarked: 'bg-outline-variant',
};

const STATUS_LABEL = {
  present: 'Present',
  'half-day': 'Half Day',
  leave: 'On Leave',
  absent: 'Absent',
  unmarked: 'Unmarked',
};

const initials = (name) =>
  (name || '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  role: 'employee',
  department: '',
  jobPosition: '',
  location: '',
  dateOfJoining: '',
};

export default function EmployeeDirectoryPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const response = await listEmployees();
    if (response.success) {
      setEmployees(response.data?.employees || []);
      setError('');
    } else {
      setError(response.message || 'Could not load employees.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const departments = useMemo(() => {
    const set = new Set(employees.map((e) => e.department).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [employees]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return employees.filter((emp) => {
      if (department !== 'All' && emp.department !== department) return false;
      if (status !== 'All' && emp.todayStatus !== status) return false;
      if (term && !`${emp.name} ${emp.email}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [employees, search, department, status]);

  const openModal = () => {
    setForm(emptyForm);
    setFormError('');
    setShowModal(true);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError('');

    const response = await createEmployee(form);
    setSaving(false);

    if (!response.success) {
      setFormError(response.message || 'Could not create that employee.');
      return;
    }

    setShowModal(false);
    setNotice(response.message || 'Employee created.');
    load();
  };

  return (
    <DashboardShell variant="hr" searchPlaceholder="Search employees...">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Employee Directory</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage and view all team members across the organization.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden shadow-sm">
            <select
              className="border-none bg-transparent py-2 pl-4 pr-8 font-label-sm text-label-sm text-on-surface focus:ring-0 cursor-pointer"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
              ))}
            </select>
            <div className="w-px bg-outline-variant"></div>
            <select
              className="border-none bg-transparent py-2 pl-4 pr-8 font-label-sm text-label-sm text-on-surface focus:ring-0 cursor-pointer"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="present">Present</option>
              <option value="half-day">Half Day</option>
              <option value="leave">On Leave</option>
              <option value="absent">Absent</option>
              <option value="unmarked">Unmarked</option>
            </select>
          </div>
          <input
            className="hidden sm:block w-48 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-[10px] font-body-sm text-body-sm focus:ring-2 focus:ring-primary-container focus:border-primary outline-none"
            placeholder="Search by name or email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            type="text"
          />
          <button
            onClick={openModal}
            className="bg-primary text-on-primary px-4 py-2 rounded-[10px] font-label-sm text-label-sm flex items-center gap-2 hover:bg-tertiary-container transition-colors shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Employee
          </button>
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

      {loading ? (
        <div className="p-10 text-center text-on-surface-variant font-body-sm text-body-sm">Loading employees...</div>
      ) : filtered.length === 0 ? (
        <div className="p-10 text-center text-on-surface-variant font-body-sm text-body-sm">No employees match those filters.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((emp) => (
            <div
              key={emp._id}
              className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col items-center text-center card-hover transition-shadow group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-display-lg text-[28px] border border-outline-variant shadow-sm">
                  {initials(emp.name)}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-4 h-4 border-2 border-surface-container-lowest rounded-full ${STATUS_DOT[emp.todayStatus] || STATUS_DOT.unmarked}`}
                  title={STATUS_LABEL[emp.todayStatus] || 'Unmarked'}
                ></span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface mb-1">{emp.name}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">{emp.jobPosition || (emp.role === 'hr' ? 'HR' : 'Employee')}</p>
              <span className="px-3 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/50">
                {emp.department || 'Unassigned'}
              </span>
              <div className="flex gap-2 mt-5 w-full pt-4 border-t border-surface-container-highest">
                <Link
                  href={`/dashboard/profile/${emp._id}`}
                  className="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface"
                >
                  View
                </Link>
                <a
                  href={`mailto:${emp.email}`}
                  className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface-variant"
                  title={emp.email}
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
              <h3 className="font-title-md text-title-md text-on-surface">Add Employee</h3>
              <button onClick={() => setShowModal(false)} type="button" className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={submitForm} className="p-6 flex flex-col gap-4">
              {formError && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{formError}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Full Name</label>
                  <input
                    required
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Email</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Phone</label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Role</label>
                  <select
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="employee">Employee</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Department</label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Job Position</label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                    value={form.jobPosition}
                    onChange={(e) => setForm({ ...form, jobPosition: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Location</label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Date of Joining</label>
                  <input
                    type="date"
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
                    value={form.dateOfJoining}
                    onChange={(e) => setForm({ ...form, dateOfJoining: e.target.value })}
                  />
                </div>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                A temporary password will be emailed to this address so they can sign in.
              </p>
              <div className="flex justify-end gap-3 pt-2 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {saving ? 'Creating…' : 'Create Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

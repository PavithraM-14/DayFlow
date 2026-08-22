'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/DashboardShell';
import DocumentsPanel from '@/components/DocumentsPanel';
import TagListEditor from '@/components/TagListEditor';
import AvatarUploader from '@/components/AvatarUploader';
import { getEmployee, updateEmployee } from '@/services/employees';
import { getSalary, updateSalary } from '@/services/payroll';

const toDateInput = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
};

const currency = (value) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    value || 0
  );

// Mirrors the backend's utils/payroll.js DEFAULTS, so the edit form can
// pre-fill a component's *effective* value even before HR has overridden it.
const DEFAULT_COMPONENTS = {
  basicPercentOfWage: 50,
  hraPercentOfBasic: 50,
  standardAllowanceFlat: 4167,
  performanceBonusPercentOfBasic: 8.33,
  ltaPercentOfBasic: 8.333,
  pfEmployeePercentOfBasic: 12,
  pfEmployerPercentOfBasic: 12,
  professionalTaxFlat: 200,
};

const COMPONENT_FIELDS = [
  { key: 'basicPercentOfWage', label: 'Basic', unit: '% of Wage' },
  { key: 'hraPercentOfBasic', label: 'HRA', unit: '% of Basic' },
  { key: 'standardAllowanceFlat', label: 'Standard Allowance', unit: '₹ (flat)' },
  { key: 'performanceBonusPercentOfBasic', label: 'Performance Bonus', unit: '% of Basic' },
  { key: 'ltaPercentOfBasic', label: 'LTA', unit: '% of Basic' },
  { key: 'pfEmployeePercentOfBasic', label: 'PF — Employee', unit: '% of Basic' },
  { key: 'pfEmployerPercentOfBasic', label: 'PF — Employer', unit: '% of Basic' },
  { key: 'professionalTaxFlat', label: 'Professional Tax', unit: '₹ (flat)' },
];

const emptyProfileForm = {
  name: '',
  phone: '',
  department: '',
  jobPosition: '',
  location: '',
  dateOfJoining: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  nationality: '',
  personalEmail: '',
  address: '',
  about: '',
};

export default function EmployeeProfileViewPage() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(emptyProfileForm);
  const [savingProfile, setSavingProfile] = useState(false);

  const [editingSalary, setEditingSalary] = useState(false);
  const [salaryForm, setSalaryForm] = useState({
    wage: 0,
    workingDaysPerWeek: 5,
    breakTimeMinutes: 60,
    ...DEFAULT_COMPONENTS,
  });
  const [savingSalary, setSavingSalary] = useState(false);

  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [savingTags, setSavingTags] = useState(false);

  const [editingBank, setEditingBank] = useState(false);
  const [bankForm, setBankForm] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    uanNumber: '',
    panNumber: '',
  });
  const [savingBank, setSavingBank] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    const [empResponse, salaryResponse] = await Promise.all([getEmployee(id), getSalary(id)]);

    if (!empResponse.success) {
      setError(empResponse.message || 'Could not load this employee.');
      setLoading(false);
      return;
    }

    const emp = empResponse.data.employee;
    setEmployee(emp);
    setProfileForm({
      name: emp.name || '',
      phone: emp.phone || '',
      department: emp.department || '',
      jobPosition: emp.jobPosition || '',
      location: emp.location || '',
      dateOfJoining: toDateInput(emp.dateOfJoining),
      dateOfBirth: toDateInput(emp.dateOfBirth),
      gender: emp.gender || '',
      maritalStatus: emp.maritalStatus || '',
      nationality: emp.nationality || '',
      personalEmail: emp.personalEmail || '',
      address: emp.address || '',
      about: emp.about || '',
    });
    setSkills(emp.skills || []);
    setCertifications(emp.certifications || []);
    setBankForm({
      bankName: emp.bankDetails?.bankName || '',
      accountNumber: emp.bankDetails?.accountNumber || '',
      ifscCode: emp.bankDetails?.ifscCode || '',
      uanNumber: emp.bankDetails?.uanNumber || '',
      panNumber: emp.bankDetails?.panNumber || '',
    });

    if (salaryResponse.success) {
      setSalary(salaryResponse.data);
      setSalaryForm({
        wage: salaryResponse.data.wage || 0,
        workingDaysPerWeek: salaryResponse.data.workingDaysPerWeek || 5,
        breakTimeMinutes: salaryResponse.data.breakTimeMinutes ?? 60,
        // Effective values = spec defaults with this employee's overrides on top.
        ...DEFAULT_COMPONENTS,
        ...(salaryResponse.data.components || {}),
      });
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const saveProfile = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    setNotice('');
    const response = await updateEmployee(id, profileForm);
    setSavingProfile(false);
    if (response.success) {
      setEmployee(response.data.employee);
      setEditingProfile(false);
      setNotice('Profile updated.');
    } else {
      setError(response.message || 'Could not save changes.');
    }
  };

  const saveSalary = async (event) => {
    event.preventDefault();
    setSavingSalary(true);
    setNotice('');

    const components = {};
    COMPONENT_FIELDS.forEach(({ key }) => {
      components[key] = Number(salaryForm[key]) || 0;
    });

    const workingDaysPerWeek = Number(salaryForm.workingDaysPerWeek) || 5;
    const breakTimeMinutes = Number(salaryForm.breakTimeMinutes) || 0;

    const response = await updateSalary(id, {
      wage: Number(salaryForm.wage) || 0,
      workingDaysPerWeek,
      breakTimeMinutes,
      components,
    });
    setSavingSalary(false);
    if (response.success) {
      setSalary((prev) => ({
        ...prev,
        wage: response.data.wage,
        breakdown: response.data.breakdown,
        workingDaysPerWeek,
        breakTimeMinutes,
        components,
      }));
      setEditingSalary(false);
      setNotice('Salary structure updated.');
    } else {
      setError(response.message || 'Could not update salary.');
    }
  };

  const saveTags = async (nextSkills, nextCertifications) => {
    setSavingTags(true);
    setNotice('');
    const response = await updateEmployee(id, { skills: nextSkills, certifications: nextCertifications });
    setSavingTags(false);
    if (response.success) {
      setSkills(response.data.employee.skills || []);
      setCertifications(response.data.employee.certifications || []);
      setNotice('Skills & certifications updated.');
    } else {
      setError(response.message || 'Could not save that.');
    }
  };

  const saveBank = async (event) => {
    event.preventDefault();
    setSavingBank(true);
    setNotice('');
    const response = await updateEmployee(id, { bankDetails: bankForm });
    setSavingBank(false);
    if (response.success) {
      setEditingBank(false);
      setNotice('Bank details updated.');
    } else {
      setError(response.message || 'Could not save bank details.');
    }
  };

  if (loading) {
    return (
      <DashboardShell variant="hr">
        <div className="p-10 text-center text-on-surface-variant font-body-sm text-body-sm">Loading profile...</div>
      </DashboardShell>
    );
  }

  if (error && !employee) {
    return (
      <DashboardShell variant="hr">
        <div className="p-10 text-center">
          <p className="font-body-sm text-body-sm text-error">{error}</p>
        </div>
      </DashboardShell>
    );
  }

  const breakdown = salary?.breakdown;

  return (
    <DashboardShell variant="hr">
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

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-primary-container to-secondary-container opacity-20 absolute w-full top-0"></div>
        <div className="p-gutter relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 mt-8">
          <AvatarUploader
            employeeId={id}
            name={employee?.name}
            canEdit
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-display-lg text-[40px] border-4 border-surface-container-lowest shadow-sm shrink-0"
            textClassName="font-display-lg text-[40px]"
          />
          <div className="flex-1">
            <h2 className="font-headline-lg text-headline-lg text-on-background">{employee?.name}</h2>
            <p className="font-title-md text-title-md text-on-surface-variant mb-1">
              {employee?.jobPosition || (employee?.role === 'hr' ? 'HR' : 'Employee')}
              {employee?.department ? ` · ${employee.department}` : ''}
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Login ID: {employee?.loginId || '—'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mt-gutter">
        <div className="lg:col-span-1 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
            <h3 className="font-title-md text-title-md mb-4">Contact</h3>
            <div className="space-y-3 font-body-sm text-body-sm">
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Email</p>
                <p>{employee?.email}</p>
              </div>
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Phone</p>
                <p>{employee?.phone || '—'}</p>
              </div>
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Personal Email</p>
                <p>{employee?.personalEmail || '—'}</p>
              </div>
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Address</p>
                <p>{employee?.address || '—'}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
            <h3 className="font-title-md text-title-md mb-4">Leave Balance</h3>
            <div className="grid grid-cols-2 gap-3 font-body-sm text-body-sm">
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Paid / year</p>
                <p>{employee?.leaveAllocation?.paid ?? 24} days</p>
              </div>
              <div>
                <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">Sick / year</p>
                <p>{employee?.leaveAllocation?.sick ?? 7} days</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
            <h3 className="font-title-md text-title-md mb-4">Skills &amp; Certifications</h3>
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

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-title-md text-title-md">Bank Details</h3>
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
                <Field label="Bank Name" value={bankForm.bankName} />
                <Field label="Account Number" value={bankForm.accountNumber} />
                <Field label="IFSC Code" value={bankForm.ifscCode} />
                <Field label="PAN No" value={bankForm.panNumber} />
                <Field label="UAN No" value={bankForm.uanNumber} />
              </div>
            ) : (
              <form onSubmit={saveBank} className="flex flex-col gap-3">
                <TextInput label="Bank Name" value={bankForm.bankName} onChange={(v) => setBankForm({ ...bankForm, bankName: v })} />
                <TextInput label="Account Number" value={bankForm.accountNumber} onChange={(v) => setBankForm({ ...bankForm, accountNumber: v })} />
                <TextInput label="IFSC Code" value={bankForm.ifscCode} onChange={(v) => setBankForm({ ...bankForm, ifscCode: v })} />
                <TextInput label="PAN No" value={bankForm.panNumber} onChange={(v) => setBankForm({ ...bankForm, panNumber: v })} />
                <TextInput label="UAN No" value={bankForm.uanNumber} onChange={(v) => setBankForm({ ...bankForm, uanNumber: v })} />
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
        </div>

        <div className="lg:col-span-2 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-title-md text-title-md">Job &amp; Personal Details</h3>
              {!editingProfile && (
                <button
                  type="button"
                  onClick={() => setEditingProfile(true)}
                  className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                </button>
              )}
            </div>

            {!editingProfile ? (
              <div className="grid grid-cols-2 gap-4 font-body-sm text-body-sm">
                <Field label="Department" value={employee?.department} />
                <Field label="Job Position" value={employee?.jobPosition} />
                <Field label="Location" value={employee?.location} />
                <Field label="Date of Joining" value={employee?.dateOfJoining ? new Date(employee.dateOfJoining).toLocaleDateString() : '—'} />
                <Field label="Date of Birth" value={employee?.dateOfBirth ? new Date(employee.dateOfBirth).toLocaleDateString() : '—'} />
                <Field label="Gender" value={employee?.gender} />
                <Field label="Marital Status" value={employee?.maritalStatus} />
                <Field label="Nationality" value={employee?.nationality} />
                <div className="col-span-2">
                  <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">About</p>
                  <p>{employee?.about || '—'}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={saveProfile} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <TextInput label="Name" value={profileForm.name} onChange={(v) => setProfileForm({ ...profileForm, name: v })} />
                  <TextInput label="Phone" value={profileForm.phone} onChange={(v) => setProfileForm({ ...profileForm, phone: v })} />
                  <TextInput label="Department" value={profileForm.department} onChange={(v) => setProfileForm({ ...profileForm, department: v })} />
                  <TextInput label="Job Position" value={profileForm.jobPosition} onChange={(v) => setProfileForm({ ...profileForm, jobPosition: v })} />
                  <TextInput label="Location" value={profileForm.location} onChange={(v) => setProfileForm({ ...profileForm, location: v })} />
                  <TextInput type="date" label="Date of Joining" value={profileForm.dateOfJoining} onChange={(v) => setProfileForm({ ...profileForm, dateOfJoining: v })} />
                  <TextInput type="date" label="Date of Birth" value={profileForm.dateOfBirth} onChange={(v) => setProfileForm({ ...profileForm, dateOfBirth: v })} />
                  <TextInput label="Gender" value={profileForm.gender} onChange={(v) => setProfileForm({ ...profileForm, gender: v })} />
                  <TextInput label="Marital Status" value={profileForm.maritalStatus} onChange={(v) => setProfileForm({ ...profileForm, maritalStatus: v })} />
                  <TextInput label="Nationality" value={profileForm.nationality} onChange={(v) => setProfileForm({ ...profileForm, nationality: v })} />
                  <TextInput label="Personal Email" value={profileForm.personalEmail} onChange={(v) => setProfileForm({ ...profileForm, personalEmail: v })} />
                  <TextInput label="Address" value={profileForm.address} onChange={(v) => setProfileForm({ ...profileForm, address: v })} />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">About</label>
                  <textarea
                    className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none resize-none"
                    rows={3}
                    value={profileForm.about}
                    onChange={(e) => setProfileForm({ ...profileForm, about: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingProfile(false)} className="px-4 py-2 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-highest">
                    Cancel
                  </button>
                  <button type="submit" disabled={savingProfile} className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:opacity-90 disabled:opacity-60">
                    {savingProfile ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-title-md text-title-md">Salary Structure</h3>
              {!editingSalary && (
                <button
                  type="button"
                  onClick={() => setEditingSalary(true)}
                  className="font-label-sm text-label-sm text-primary hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                </button>
              )}
            </div>

            {editingSalary ? (
              <form onSubmit={saveSalary} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <TextInput
                    type="number"
                    label="Monthly Wage (₹)"
                    value={salaryForm.wage}
                    onChange={(v) => setSalaryForm({ ...salaryForm, wage: v })}
                  />
                  <TextInput
                    type="number"
                    label="Working Days / Week"
                    value={salaryForm.workingDaysPerWeek}
                    onChange={(v) => setSalaryForm({ ...salaryForm, workingDaysPerWeek: v })}
                  />
                  <TextInput
                    type="number"
                    label="Break Time (mins)"
                    value={salaryForm.breakTimeMinutes}
                    onChange={(v) => setSalaryForm({ ...salaryForm, breakTimeMinutes: v })}
                  />
                </div>

                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Salary Components</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {COMPONENT_FIELDS.map(({ key, label, unit }) => (
                      <TextInput
                        key={key}
                        type="number"
                        label={`${label} (${unit})`}
                        value={salaryForm[key]}
                        onChange={(v) => setSalaryForm({ ...salaryForm, [key]: v })}
                      />
                    ))}
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">
                    Fixed Allowance is calculated automatically as the balance of the wage after the components above.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingSalary(false)} className="px-4 py-2 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-highest">
                    Cancel
                  </button>
                  <button type="submit" disabled={savingSalary} className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:opacity-90 disabled:opacity-60">
                    {savingSalary ? 'Saving…' : 'Save Salary'}
                  </button>
                </div>
              </form>
            ) : !breakdown || !salary?.wage ? (
              <p className="font-body-sm text-body-sm text-on-surface-variant">No wage set yet — click Edit to configure this employee&apos;s salary.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-body-sm text-body-sm">
                <Field label="Monthly Wage" value={currency(salary.wage)} />
                <Field label="Basic" value={currency(breakdown.earnings.basic)} />
                <Field label="HRA" value={currency(breakdown.earnings.hra)} />
                <Field label="Standard Allowance" value={currency(breakdown.earnings.standardAllowance)} />
                <Field label="Performance Bonus" value={currency(breakdown.earnings.performanceBonus)} />
                <Field label="LTA" value={currency(breakdown.earnings.lta)} />
                <Field label="Fixed Allowance" value={currency(breakdown.earnings.fixedAllowance)} />
                <Field label="PF (Employee)" value={currency(breakdown.deductions.pfEmployee)} />
                <Field label="PF (Employer)" value={currency(breakdown.employerContributions.pfEmployer)} />
                <Field label="Professional Tax" value={currency(breakdown.deductions.professionalTax)} />
                <Field label="Gross Earnings" value={currency(breakdown.grossEarnings)} />
                <Field label="Net Pay" value={currency(breakdown.netPay)} />
              </div>
            )}
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
            <h3 className="font-title-md text-title-md mb-4">Documents</h3>
            <DocumentsPanel employeeId={id} canUpload />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">{label}</p>
      <p>{value || '—'}</p>
    </div>
  );
}

function TextInput({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">{label}</label>
      <input
        type={type}
        className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

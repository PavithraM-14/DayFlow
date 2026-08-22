'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/DashboardShell';
import { listEmployees } from '@/services/employees';
import { payrollSummary } from '@/services/payroll';

const currency = (value) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    value || 0
  );

export default function HRPayrollPage() {
  const [summary, setSummary] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const [summaryResponse, employeesResponse] = await Promise.all([
      payrollSummary(),
      listEmployees(),
    ]);
    if (summaryResponse.success) setSummary(summaryResponse.data);
    if (employeesResponse.success) {
      setEmployees(employeesResponse.data?.employees || []);
      setError('');
    } else {
      setError(employeesResponse.message || 'Could not load employees.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const configured = employees.filter((e) => (e.salary?.wage || 0) > 0).length;

  return (
    <DashboardShell variant="hr">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Payroll Processing</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Review and process employee salaries for the current period.</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col gap-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Total Gross Payroll</span>
          <div className="font-display-lg text-display-lg text-on-surface mt-2">{loading ? '—' : currency(summary?.totalGross)}</div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col gap-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Total Net Payroll</span>
          <div className="font-display-lg text-display-lg text-on-surface mt-2">{loading ? '—' : currency(summary?.totalNet)}</div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col gap-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Salary Structures Configured</span>
          <div className="font-display-lg text-display-lg text-on-surface mt-2">
            {loading ? '—' : configured} <span className="font-title-md text-title-md text-outline">/ {employees.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
          <h3 className="font-title-md text-title-md text-on-surface">Employee Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8FA] border-b border-outline-variant">
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Employee Name</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Department</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Monthly Wage</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-center">Status</th>
                <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr><td colSpan={5} className="py-6 px-4 text-center text-on-surface-variant font-body-sm text-body-sm">Loading…</td></tr>
              ) : employees.length === 0 ? (
                <tr><td colSpan={5} className="py-6 px-4 text-center text-on-surface-variant font-body-sm text-body-sm">No employees yet.</td></tr>
              ) : (
                employees.map((emp) => {
                  const wage = emp.salary?.wage || 0;
                  return (
                    <tr key={emp._id} className="hover:bg-surface/50 transition-colors h-[48px] group">
                      <td className="py-2 px-4 font-body-sm text-body-sm font-medium text-on-surface">{emp.name}</td>
                      <td className="py-2 px-4 font-body-sm text-body-sm text-on-surface">{emp.department || '—'}</td>
                      <td className="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right">{wage ? currency(wage) : '—'}</td>
                      <td className="py-2 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                            wage
                              ? 'bg-secondary/10 text-secondary border-secondary/20'
                              : 'bg-error-container text-on-error-container border-transparent'
                          }`}
                        >
                          {wage ? 'Configured' : 'Not Set'}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-right">
                        <Link href={`/dashboard/profile/${emp._id}`} className="font-label-sm text-label-sm text-primary hover:underline">
                          Manage
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}

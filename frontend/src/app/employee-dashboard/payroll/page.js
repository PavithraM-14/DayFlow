'use client';

import { useCallback, useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/context/AuthContext';
import { getPayslip, mySalary } from '@/services/payroll';

const currency = (value) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    value || 0
  );

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function EmployeePayroll() {
  const { user } = useAuth();
  const now = new Date();

  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [month, setMonth] = useState(now.getUTCMonth() + 1);
  const [year, setYear] = useState(now.getUTCFullYear());
  const [payslip, setPayslip] = useState(null);
  const [payslipLoading, setPayslipLoading] = useState(true);
  const [payslipError, setPayslipError] = useState('');

  const loadSalary = useCallback(async () => {
    setLoading(true);
    const response = await mySalary();
    if (response.success) {
      setSalary(response.data);
      setError('');
    } else {
      setError(response.message || 'Could not load your salary structure.');
    }
    setLoading(false);
  }, []);

  const loadPayslip = useCallback(async () => {
    if (!user?._id) return;
    setPayslipLoading(true);
    const response = await getPayslip(user._id, month, year);
    if (response.success) {
      setPayslip(response.data);
      setPayslipError('');
    } else {
      setPayslipError(response.message || 'Could not load this payslip.');
    }
    setPayslipLoading(false);
  }, [user?._id, month, year]);

  useEffect(() => {
    loadSalary();
  }, [loadSalary]);

  useEffect(() => {
    loadPayslip();
  }, [loadPayslip]);

  const breakdown = salary?.breakdown;
  const years = [now.getUTCFullYear(), now.getUTCFullYear() - 1];

  return (
    <DashboardShell variant="employee">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-gutter">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface">Payroll &amp; Earnings</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Your compensation and payslip history — read-only.</p>
        </div>
      </div>

      {error && (
        <div className="mb-gutter flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="col-span-1 md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
          <h3 className="font-title-md text-title-md text-on-surface-variant mb-4">Salary Structure</h3>
          {loading ? (
            <p className="font-body-sm text-body-sm text-on-surface-variant">Loading…</p>
          ) : !salary?.wage ? (
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Your salary breakdown will appear here once HR sets up your wage and salary components.
            </p>
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
              <Field label="Professional Tax" value={currency(breakdown.deductions.professionalTax)} />
              <Field label="Gross Earnings" value={currency(breakdown.grossEarnings)} />
              <Field label="Net Pay" value={currency(breakdown.netPay)} highlight />
            </div>
          )}
        </div>

        <div className="col-span-1 md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="p-6 border-b border-surface-variant flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-surface-bright">
            <h3 className="font-title-md text-title-md text-on-surface">Payslip</h3>
            <div className="flex gap-2">
              <select
                className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-body-sm text-body-sm focus:ring-2 focus:ring-primary-container outline-none"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {MONTHS.map((label, index) => (
                  <option key={label} value={index + 1}>{label}</option>
                ))}
              </select>
              <select
                className="bg-surface border border-outline-variant rounded-lg px-3 py-1.5 font-body-sm text-body-sm focus:ring-2 focus:ring-primary-container outline-none"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="p-6">
            {payslipLoading ? (
              <p className="text-center text-on-surface-variant font-body-sm text-body-sm">Loading…</p>
            ) : payslipError ? (
              <p className="text-center text-error font-body-sm text-body-sm">{payslipError}</p>
            ) : !payslip ? (
              <p className="text-center text-on-surface-variant font-body-sm text-body-sm">No payslip generated yet.</p>
            ) : (
              <div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  Payable {payslip.payableDays} of {payslip.totalWorkingDays} working days for {MONTHS[month - 1]} {year}.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-body-sm text-body-sm">
                  <Field label="Full-month Gross" value={currency(payslip.payslip.grossEarnings)} />
                  <Field label="Total Deductions" value={currency(payslip.payslip.totalDeductions)} />
                  <Field label="Prorated Net Pay" value={currency(payslip.payslip.proratedNetPay)} highlight />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function Field({ label, value, highlight }) {
  return (
    <div>
      <p className="text-on-surface-variant uppercase font-label-sm text-label-sm mb-0.5">{label}</p>
      <p className={highlight ? 'font-bold text-title-md text-on-surface' : ''}>{value}</p>
    </div>
  );
}

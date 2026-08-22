'use client';

import { useCallback, useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { reportsOverview } from '@/services/reports';

const currency = (value) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR', notation: 'compact', maximumFractionDigits: 1 }).format(
    value || 0
  );

export default function ReportsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const response = await reportsOverview();
    if (response.success) {
      setData(response.data);
      setError('');
    } else {
      setError(response.message || 'Could not load reports.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <DashboardShell variant="hr">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-background">Reports &amp; Analytics</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">High-level insights and organizational metrics for management.</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6 mb-8">
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary mb-4">
            <span className="material-symbols-outlined">group_add</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">Total Headcount</p>
          <div className="font-display-lg text-[32px] font-bold text-on-surface leading-tight">{loading ? '—' : data?.totalHeadcount ?? 0}</div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">how_to_reg</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">Avg. Attendance (30d)</p>
          <div className="font-display-lg text-[32px] font-bold text-on-surface leading-tight">{loading ? '—' : `${data?.avgAttendancePercent ?? 0}%`}</div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-error-container text-error flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">event_busy</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">On Leave Today</p>
          <div className="font-display-lg text-[32px] font-bold text-on-surface leading-tight">{loading ? '—' : data?.onLeaveToday ?? 0}</div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col">
          <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">Monthly Payroll</p>
          <div className="font-display-lg text-[32px] font-bold text-on-surface leading-tight">{loading ? '—' : currency(data?.monthlyPayroll)}</div>
        </div>
      </div>

      {data?.leaveUsageThisYear?.length > 0 && (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 mb-8">
          <h3 className="font-title-md text-title-md text-on-surface mb-4">Leave Usage This Year</h3>
          <div className="flex flex-wrap gap-6">
            {data.leaveUsageThisYear.map((item) => (
              <div key={item.type} className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase capitalize">{item.type}</span>
                <span className="font-headline-lg text-headline-lg text-on-surface">{item.days} days</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Detailed charts (headcount trend, departmental payroll split, exportable reports) are on the
          roadmap — the PDF spec lists analytics dashboards under &quot;Future Enhancements&quot;. The
          summary cards above are wired to live company data.
        </p>
      </div>
    </DashboardShell>
  );
}

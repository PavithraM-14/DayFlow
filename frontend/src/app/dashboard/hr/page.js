'use client';

import Link from 'next/link';

export default function HRDashboardPage() {
 return (
 <>
{/* Main Canvas */}
 <main className="flex-grow p-gutter bg-surface">
 <div className="max-w-[1120px] mx-auto">
 {/* Header */}
 <div className="mb-8 flex justify-between items-end">
 <div>
 <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Overview</h2>
 <p className="font-body-sm text-body-sm text-on-surface-variant">Welcome back. Here&apos;s what&apos;s happening today.</p>
 </div>
 <button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-body-sm text-body-sm hover:opacity-90 transition-opacity flex items-center gap-2">
 <span className="material-symbols-outlined text-[18px]">add</span>
 New Employee
 </button>
 </div>

 {/* Metrics Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-gutter">
 {/* Metric 1 */}
 <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4 card-hover flex flex-col justify-between h-32">
 <div className="flex justify-between items-start">
 <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">Total Employees</span>
 <span className="material-symbols-outlined text-outline">groups</span>
 </div>
 <div className="flex items-baseline gap-2">
 <span className="font-display-lg text-display-lg text-on-surface">142</span>
 <span className="font-body-sm text-body-sm text-secondary flex items-center">
 <span className="material-symbols-outlined text-[16px]">arrow_upward</span> 2.4%
 </span>
 </div>
 </div>
 {/* Metric 2 */}
 <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4 card-hover flex flex-col justify-between h-32">
 <div className="flex justify-between items-start">
 <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">Present Today</span>
 <span className="material-symbols-outlined text-secondary">how_to_reg</span>
 </div>
 <div className="flex items-baseline gap-2">
 <span className="font-display-lg text-display-lg text-on-surface">128</span>
 <span className="font-body-sm text-body-sm text-on-surface-variant">/ 135 expected</span>
 </div>
 </div>
 {/* Metric 3 */}
 <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4 card-hover flex flex-col justify-between h-32 relative overflow-hidden">
 <div className="absolute right-0 top-0 w-16 h-16 bg-primary-fixed-dim rounded-bl-full opacity-20"></div>
 <div className="flex justify-between items-start relative z-10">
 <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">On Leave</span>
 <span className="material-symbols-outlined text-primary">beach_access</span>
 </div>
 <div className="flex items-baseline gap-2 relative z-10">
 <span className="font-display-lg text-display-lg text-on-surface">7</span>
 <span className="font-body-sm text-body-sm text-on-surface-variant">Approved</span>
 </div>
 </div>
 {/* Metric 4 */}
 <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4 card-hover flex flex-col justify-between h-32 border-l-4 border-l-secondary">
 <div className="flex justify-between items-start">
 <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">Pending Actions</span>
 <span className="material-symbols-outlined text-secondary">notification_important</span>
 </div>
 <div className="flex items-baseline gap-2">
 <span className="font-display-lg text-display-lg text-on-surface">12</span>
 <span className="font-body-sm text-body-sm text-error flex items-center">Requires attention</span>
 </div>
 </div>
 </div>

 {/* Main Layout Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
 {/* Pending Requests Table (Spans 2 columns) */}
 <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden">
 <div className="px-4 py-3 border-b border-outline-variant flex justify-between items-center bg-[#FAF8FA]">
 <h3 className="font-title-md text-title-md text-on-surface">Pending Requests</h3>
 <button className="font-label-sm text-label-sm text-primary hover:underline">View All</button>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-[#FAF8FA] border-b border-outline-variant font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
 <th className="px-4 py-3 font-medium">Employee</th>
 <th className="px-4 py-3 font-medium">Request Type</th>
 <th className="px-4 py-3 font-medium">Dates</th>
 <th className="px-4 py-3 font-medium text-right">Action</th>
 </tr>
 </thead>
 <tbody>
 <tr className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors h-12">
 <td className="px-4 py-2">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-sm">AS</div>
 <span className="font-body-sm text-body-sm font-medium">Alice Smith</span>
 </div>
 </td>
 <td className="px-4 py-2">
 <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-primary-fixed text-on-primary-fixed">Annual Leave</span>
 </td>
 <td className="px-4 py-2 font-body-sm text-body-sm text-on-surface-variant">Oct 12 - Oct 15</td>
 <td className="px-4 py-2 text-right">
 <button className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container hover:opacity-80 transition-opacity inline-flex items-center justify-center mr-1">
 <span className="material-symbols-outlined text-[18px]">check</span>
 </button>
 <button className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors inline-flex items-center justify-center">
 <span className="material-symbols-outlined text-[18px]">close</span>
 </button>
 </td>
 </tr>
 <tr className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors h-12">
 <td className="px-4 py-2">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-sm">BJ</div>
 <span className="font-body-sm text-body-sm font-medium">Bob Jones</span>
 </div>
 </td>
 <td className="px-4 py-2">
 <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-secondary-fixed text-on-secondary-fixed">Sick Leave</span>
 </td>
 <td className="px-4 py-2 font-body-sm text-body-sm text-on-surface-variant">Oct 10 (Half day)</td>
 <td className="px-4 py-2 text-right">
 <button className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container hover:opacity-80 transition-opacity inline-flex items-center justify-center mr-1">
 <span className="material-symbols-outlined text-[18px]">check</span>
 </button>
 <button className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors inline-flex items-center justify-center">
 <span className="material-symbols-outlined text-[18px]">close</span>
 </button>
 </td>
 </tr>
 <tr className="hover:bg-surface-container-lowest transition-colors h-12">
 <td className="px-4 py-2">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-sm">CD</div>
 <span className="font-body-sm text-body-sm font-medium">Charlie Davis</span>
 </div>
 </td>
 <td className="px-4 py-2">
 <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-tertiary-fixed text-on-tertiary-fixed">Expense</span>
 </td>
 <td className="px-4 py-2 font-body-sm text-body-sm text-on-surface-variant">$125.00 - Travel</td>
 <td className="px-4 py-2 text-right">
 <button className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container hover:opacity-80 transition-opacity inline-flex items-center justify-center mr-1">
 <span className="material-symbols-outlined text-[18px]">check</span>
 </button>
 <button className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors inline-flex items-center justify-center">
 <span className="material-symbols-outlined text-[18px]">close</span>
 </button>
 </td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 {/* Right Sidebar */}
 <div className="flex flex-col gap-gutter">
 {/* Chart Widget */}
 <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4">
 <h3 className="font-title-md text-title-md text-on-surface mb-4">Attendance Overview</h3>
 <div className="relative w-40 h-40 mx-auto mb-4">
 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
 <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
 <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeWidth="4" />
 <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="10, 100" strokeDashoffset="-85" strokeWidth="4" />
 </svg>
 <div className="absolute inset-0 flex items-center justify-center flex-col">
 <span className="font-title-md text-title-md text-on-surface">85%</span>
 <span className="font-label-sm text-label-sm text-on-surface-variant">Present</span>
 </div>
 </div>
 <div className="flex justify-center gap-4">
 <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
 <span className="w-2 h-2 rounded-full bg-secondary"></span> Present
 </div>
 <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
 <span className="w-2 h-2 rounded-full bg-primary"></span> Absent
 </div>
 <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
 <span className="w-2 h-2 rounded-full bg-surface-container-high"></span> Late
 </div>
 </div>
 </div>

 {/* Activity Feed */}
 <div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-4 flex-grow">
 <h3 className="font-title-md text-title-md text-on-surface mb-4">Recent Activity</h3>
 <div className="relative pl-4 border-l-2 border-surface-container-highest space-y-6">
 <div className="relative">
 <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
 <p className="font-body-sm text-body-sm text-on-surface"><span className="font-medium">Payroll Run</span> completed successfully.</p>
 <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">10 mins ago</p>
 </div>
 <div className="relative">
 <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-container-lowest"></div>
 <p className="font-body-sm text-body-sm text-on-surface"><span className="font-accent-marker text-accent-marker marker-highlight">Work Anniversary</span> for Sarah Jenkins (5 years).</p>
 <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">2 hours ago</p>
 </div>
 <div className="relative">
 <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-outline-variant ring-4 ring-surface-container-lowest"></div>
 <p className="font-body-sm text-body-sm text-on-surface">New document uploaded: Q3 Guidelines.</p>
 <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Yesterday</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </main>
 </>
 );
}

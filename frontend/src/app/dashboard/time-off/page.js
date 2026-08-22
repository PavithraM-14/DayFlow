'use client';

import Link from 'next/link';

export default function Page() {
  const active = 'time-off';
  return (
    <>
{/* Canvas */}
<main className="flex-1 overflow-y-auto p-4 md:p-gutter lg:p-container-padding">
<div className="max-w-[1120px] mx-auto w-full">
{/* Page Header */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
<div>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">Time Off Management</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Review and manage employee leave requests.</p>
</div>
<button className="bg-primary text-on-primary px-4 py-2.5 rounded-lg font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary">
<span className="material-symbols-outlined text-xl">add</span>
                        New Request
                    </button>
</div>
{/* Summary Cards Bento */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
{/* Pending Approvals */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 relative overflow-hidden group hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div className="absolute top-0 left-0 w-1 h-full bg-[#f59e0b]"></div>
<div className="flex justify-between items-start mb-4">
<h3 className="font-title-md text-title-md text-on-surface">Pending Approvals</h3>
<div className="w-10 h-10 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center">
<span className="material-symbols-outlined">hourglass_empty</span>
</div>
</div>
<div className="flex items-end gap-3">
<span className="font-display-lg text-display-lg text-on-background">12</span>
<span className="font-body-sm text-body-sm text-error bg-error/10 px-2 py-0.5 rounded flex items-center gap-1 mb-2">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span> 3 new
                            </span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 tracking-wider">Requires attention</p>
</div>
{/* Upcoming Leaves */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<h3 className="font-title-md text-title-md text-on-surface">Upcoming Leaves</h3>
<div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined">event_upcoming</span>
</div>
</div>
<div className="flex items-end gap-3">
<span className="font-display-lg text-display-lg text-on-background">24</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mb-2">this week</span>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 tracking-wider">Scheduled absences</p>
</div>
{/* Team Availability */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow relative">
{/* Marker Highlight Accent */}
<div className="absolute -top-3 -right-2 transform rotate-12 bg-tertiary-fixed-dim/50 px-2 py-0.5 rounded-sm pointer-events-none">
<span className="font-accent-marker text-accent-marker text-primary">All hands!</span>
</div>
<div className="flex justify-between items-start mb-4">
<h3 className="font-title-md text-title-md text-on-surface">Team Availability Today</h3>
<div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
<span className="material-symbols-outlined">group</span>
</div>
</div>
<div className="flex items-center gap-4">
<div className="relative w-16 h-16">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path className="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
<path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeWidth="4"></path>
</svg>
<div className="absolute inset-0 flex items-center justify-center font-title-md text-title-md">
                                    85%
                                </div>
</div>
<div>
<p className="font-body-sm text-body-sm text-on-surface-variant">142/165 Present</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">23 On Leave</p>
</div>
</div>
</div>
</div>
{/* Requests Table Section */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden">
<div className="p-4 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FAF8FA]">
<h3 className="font-title-md text-title-md text-on-surface">Recent Requests</h3>
<div className="flex gap-2 w-full sm:w-auto">
<select className="bg-surface border border-outline-variant text-body-sm font-body-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-container outline-none text-on-surface flex-1 sm:flex-none">
<option>All Statuses</option>
<option>Pending</option>
<option>Approved</option>
<option>Rejected</option>
</select>
<button className="p-1.5 border border-outline-variant rounded-lg bg-surface text-on-surface-variant hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-xl">filter_list</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-[#FAF8FA] border-b border-outline-variant">
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Employee</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Type</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Dates</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider hidden md:table-cell">Duration</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider hidden lg:table-cell">Reason</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
{/* Row 1: Pending */}
<tr className="hover:bg-surface-container-lowest transition-colors group h-12">
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-title-md text-sm">
                                                JD
                                            </div>
<div>
<p className="font-body-sm text-body-sm font-medium text-on-surface">Jane Doe</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">Engineering</p>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-container text-on-surface">Annual</span>
</td>
<td className="py-3 px-4">
<p className="font-body-sm text-body-sm text-on-surface">Oct 24 - Oct 28</p>
</td>
<td className="py-3 px-4 hidden md:table-cell">
<p className="font-body-sm text-body-sm text-on-surface">5 days</p>
</td>
<td className="py-3 px-4 hidden lg:table-cell max-w-[200px] truncate text-on-surface-variant font-body-sm text-body-sm">
                                        Family vacation to the mountains...
                                    </td>
<td className="py-3 px-4 text-right">
<div className="flex justify-end gap-2">
<button className="w-8 h-8 rounded border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors" title="Approve">
<span className="material-symbols-outlined text-[18px]">check</span>
</button>
<button className="w-8 h-8 rounded border border-outline-variant text-on-surface-variant hover:bg-error hover:border-error hover:text-on-error flex items-center justify-center transition-colors" title="Reject">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</td>
</tr>
{/* Row 2: Pending Sick */}
<tr className="hover:bg-surface-container-lowest transition-colors group h-12">
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-title-md text-sm">
                                                MS
                                            </div>
<div>
<p className="font-body-sm text-body-sm font-medium text-on-surface">Michael Smith</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">Marketing</p>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-error/10 text-error">Sick</span>
</td>
<td className="py-3 px-4">
<p className="font-body-sm text-body-sm text-on-surface">Oct 18</p>
</td>
<td className="py-3 px-4 hidden md:table-cell">
<p className="font-body-sm text-body-sm text-on-surface">1 day</p>
</td>
<td className="py-3 px-4 hidden lg:table-cell max-w-[200px] truncate text-on-surface-variant font-body-sm text-body-sm">
                                        Not feeling well, fever.
                                    </td>
<td className="py-3 px-4 text-right">
<div className="flex justify-end gap-2">
<button className="w-8 h-8 rounded border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors" title="Approve">
<span className="material-symbols-outlined text-[18px]">check</span>
</button>
<button className="w-8 h-8 rounded border border-outline-variant text-on-surface-variant hover:bg-error hover:border-error hover:text-on-error flex items-center justify-center transition-colors" title="Reject">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</td>
</tr>
{/* Row 3: Approved */}
<tr className="hover:bg-surface-container-lowest transition-colors group h-12 bg-surface-bright/50">
<td className="py-3 px-4">
<div className="flex items-center gap-3">
<img className="w-8 h-8 rounded-full object-cover border border-outline-variant" data-alt="A small circular avatar of a female professional employee, subtle corporate background, bright and clear." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCcro5iaMFnHr1xOT4fpEceJ-LwfBKVaLTm-jkguNuVvo78MwPdbXqFQmfrCluLBTWpIi8EU8W_jk0-162_xU0c5KSDiqBrOaqYOIxjYVlD0jUwYbs4UaG0bjZRHUMCRuvwEsTpyZR3JmUletnBpTQa4GWUb2BGhyLYyE3clwKGVtH43l3lJLETE0Kc7JmVzHkx0tBcaHTEhw5ggenflO8Ba_OjlgnsII6ZtnhO06GohyHr2H18Px8Qg" />
<div>
<p className="font-body-sm text-body-sm font-medium text-on-surface">Sarah Connor</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">Sales</p>
</div>
</div>
</td>
<td className="py-3 px-4">
<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-container text-on-surface">Casual</span>
</td>
<td className="py-3 px-4">
<p className="font-body-sm text-body-sm text-on-surface">Oct 20</p>
</td>
<td className="py-3 px-4 hidden md:table-cell">
<p className="font-body-sm text-body-sm text-on-surface">0.5 days</p>
</td>
<td className="py-3 px-4 hidden lg:table-cell max-w-[200px] truncate text-on-surface-variant font-body-sm text-body-sm">
                                        Personal errands in the afternoon.
                                    </td>
<td className="py-3 px-4 text-right">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
<span className="material-symbols-outlined text-[14px]">done_all</span> Approved
                                        </span>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 border-t border-outline-variant flex justify-between items-center bg-[#FAF8FA]">
<p className="font-label-sm text-label-sm text-on-surface-variant">Showing 1 to 3 of 12 requests</p>
<div className="flex gap-1">
<button className="p-1 rounded text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50" disabled>
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="p-1 rounded text-on-surface-variant hover:bg-surface-container-high">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</main>
    </>
  );
}

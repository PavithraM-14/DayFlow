'use client';

import Link from 'next/link';

export default function EmployeeTimeOff() {
 return (
 <>
<main className="flex-1 md: flex flex-col min-h-screen max-w-[1120px] mx-auto w-full">
{/* Top App Bar (Mobile & Desktop overrides) */}
{/* TopNavBar (Mobile) */}
<header className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-outline-variant sticky top-0 z-50">
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">menu</span>
 <h1 className="font-title-md text-primary">Dayflow</h1>
 </div>
 <img alt="Profile photo" className="w-8 h-8 rounded-full border border-outline-variant bg-surface-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrJ1l9JGS0deg42HpVQSStp3WuLg6cFZW2FeG26-gaOuYdb6ndlwrx2AuaA27pg_mwg-16BH0vLFVhbSYT_mV6myPlpU4qy2NJ_opECPnYffJnHomg15Xs2ms4GmmLi3nl8qphGPoWWcyhhYNSJTjr42ac6VRMY6AFBrSr5ALG3Pt2PH4hMFAMsCFMQTOCwpWDb_wcsXAldmDawt7V86kvLeq6kxCD7Yttk5p3P4saztOMOfhirc7mSQ" />
</header>
{/* TopNavBar (Desktop) */}
<header className="bg-surface flex justify-between items-center h-16 px-gutter border-b border-outline-variant sticky top-0 z-40 hidden md:flex">
 <div className="flex items-center gap-4 flex-grow max-w-md">
 <div className="relative w-full">
 <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
 <input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-[10px] focus:ring-2 focus:ring-primary-container focus:border-primary focus:outline-none transition-colors text-body-sm font-body-sm" placeholder="Search employees, documents..." type="text" />
 </div>
 </div>
 <div className="flex items-center gap-4 ml-auto">
 <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant relative">
 <span className="material-symbols-outlined">notifications</span>
 <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
 </button>
 <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant">
 <span className="material-symbols-outlined">apps</span>
 </button>
 <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
 <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrJ1l9JGS0deg42HpVQSStp3WuLg6cFZW2FeG26-gaOuYdb6ndlwrx2AuaA27pg_mwg-16BH0vLFVhbSYT_mV6myPlpU4qy2NJ_opECPnYffJnHomg15Xs2ms4GmmLi3nl8qphGPoWWcyhhYNSJTjr42ac6VRMY6AFBrSr5ALG3Pt2PH4hMFAMsCFMQTOCwpWDb_wcsXAldmDawt7V86kvLeq6kxCD7Yttk5p3P4saztOMOfhirc7mSQ" />
 </div>
 </div>
</header>
{/* Page Content */}
<div className="p-margin-mobile md:p-gutter flex-1 space-y-gutter">
<div className="mb-8">
<h2 className="font-display-lg text-display-lg text-on-surface mb-2">Time Off</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Manage your leave requests and view balances.</p>
</div>
{/* Bento Grid Layout */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
{/* Balances Section (Spans 8 columns on desktop) */}
<div className="md:col-span-8 flex flex-col gap-gutter">
<div className="glass-card rounded-xl p-6 relative overflow-hidden group hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed opacity-20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-40 transition-opacity duration-500"></div>
<h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">account_balance_wallet</span>
 Current Balances
 </h3>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
{/* PTO Balance */}
<div className="p-4 rounded-lg bg-surface-container border border-surface-variant">
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Paid Time Off</p>
<div className="flex items-end gap-2">
<span className="font-headline-lg text-headline-lg text-primary marker-highlight">14.5</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mb-1">days available</span>
</div>
<div className="w-full bg-surface-dim rounded-full h-1.5 mt-4">
<div className="bg-primary h-1.5 rounded-full" style={{width: '65%'}}></div>
</div>
</div>
{/* Sick Leave Balance */}
<div className="p-4 rounded-lg bg-surface-container border border-surface-variant">
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Sick Leave</p>
<div className="flex items-end gap-2">
<span className="font-headline-lg text-headline-lg text-secondary">6.0</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mb-1">days available</span>
</div>
<div className="w-full bg-surface-dim rounded-full h-1.5 mt-4">
<div className="bg-secondary h-1.5 rounded-full" style={{width: '40%'}}></div>
</div>
</div>
</div>
</div>
{/* Recent Requests Table */}
<div className="glass-card rounded-xl border border-outline-variant overflow-hidden">
<div className="p-6 border-b border-surface-variant flex justify-between items-center bg-[#FAF8FA]">
<h3 className="font-title-md text-title-md text-on-surface">Recent Requests</h3>
<button className="text-primary font-label-sm text-label-sm uppercase hover:underline">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-[#FAF8FA] border-b border-outline-variant">
<th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Type</th>
<th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Dates</th>
<th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Duration</th>
<th className="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Status</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm">
<tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors h-[48px]">
<td className="py-2 px-6 text-on-surface font-medium">PTO</td>
<td className="py-2 px-6 text-on-surface-variant">Oct 12 - Oct 14</td>
<td className="py-2 px-6 text-on-surface-variant">3 Days</td>
<td className="py-2 px-6">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-fixed/20 text-on-secondary-container font-label-sm text-label-sm">
 Approved
 </span>
</td>
</tr>
<tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors h-[48px]">
<td className="py-2 px-6 text-on-surface font-medium">Sick Leave</td>
<td className="py-2 px-6 text-on-surface-variant">Sep 05</td>
<td className="py-2 px-6 text-on-surface-variant">1 Day</td>
<td className="py-2 px-6">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-fixed/20 text-on-secondary-container font-label-sm text-label-sm">
 Approved
 </span>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors h-[48px]">
<td className="py-2 px-6 text-on-surface font-medium">PTO</td>
<td className="py-2 px-6 text-on-surface-variant">Nov 20 - Nov 24</td>
<td className="py-2 px-6 text-on-surface-variant">5 Days</td>
<td className="py-2 px-6">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-primary-fixed-dim/20 text-on-primary-fixed-variant font-label-sm text-label-sm">
 Pending
 </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/* Request Form Section (Spans 4 columns on desktop) */}
<div className="md:col-span-4">
<div className="glass-card rounded-xl p-6 h-full flex flex-col">
<h3 className="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">edit_calendar</span>
 Request Time Off
 </h3>
<form className="flex-1 flex flex-col gap-4">
{/* Leave Type */}
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="leave_type">Leave Type</label>
<select className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all" id="leave_type" name="leave_type">
<option>Paid Time Off (PTO)</option>
<option>Sick Leave</option>
<option>Unpaid Leave</option>
</select>
</div>
{/* Date Range */}
<div className="grid grid-cols-2 gap-4">
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="start_date">Start Date</label>
<input className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all" id="start_date" name="start_date" type="date"/>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="end_date">End Date</label>
<input className="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all" id="end_date" name="end_date" type="date"/>
</div>
</div>
{/* Reason */}
<div className="flex-1">
<label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" htmlFor="reason">Reason (Optional)</label>
<textarea className="w-full h-full min-h-[100px] bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all resize-none" id="reason" name="reason" placeholder="Briefly describe your request..." rows="3"></textarea>
</div>
{/* Submit Button */}
<div className="mt-4 pt-4 border-t border-outline-variant">
<button className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary font-title-md text-title-md py-3 rounded-lg transition-colors flex items-center justify-center gap-2" type="button">
<span className="material-symbols-outlined font-light text-[20px]">send</span>
 Submit Request
 </button>
<p className="text-center font-accent-marker text-accent-marker text-on-surface-variant mt-3 opacity-70">
 Needs manager approval
 </p>
</div>
</form>
</div>
</div>
</div>
</div>
</main>
 </>
 );
}

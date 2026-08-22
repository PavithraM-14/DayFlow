'use client';

import Link from 'next/link';

export default function EmployeeTimeOff() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      {/* Side Navigation (Desktop) */}
<nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 py-unit-base px-4 border-r border-outline-variant bg-surface-container-low z-40">
<div className="mb-8 px-4 py-4">
<h1 className="font-headline-lg text-headline-lg text-primary">Dayflow</h1>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">HR Portal</p>
</div>
<div className="flex-1 space-y-2">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span className="material-symbols-outlined" data-icon="event_available">event_available</span>
<span>Attendance</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg transition-all font-title-md text-title-md scale-100 shadow-sm border border-secondary-fixed" href="#">
<span className="material-symbols-outlined" data-icon="calendar_today" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>calendar_today</span>
<span>Time Off</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span>My Profile</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
<span>Payroll</span>
</a>
</div>
<div className="mt-auto pt-4 border-t border-outline-variant space-y-2">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
<span>Help</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
<span>Logout</span>
</a>
</div>
</nav>
{/* Main Content Area */}
<main className="flex-1 md:ml-64 flex flex-col min-h-screen max-w-[1120px] mx-auto w-full">
{/* Top App Bar (Mobile & Desktop overrides) */}
<header className="flex justify-between items-center px-container-padding w-full sticky top-0 z-50 bg-surface h-16 md:border-none border-b border-outline-variant backdrop-blur-md bg-opacity-90">
<div className="md:hidden">
<h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">Dayflow</h1>
</div>
<div className="hidden md:block">
{/* Empty spacer for desktop flex */}
</div>
<div className="flex items-center gap-4">
<button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:opacity-80">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:opacity-80">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
</button>
<img alt="Employee Profile Avatar" className="w-8 h-8 rounded-full border border-outline-variant object-cover" data-alt="A small, professional circular avatar showing a smiling person in a modern office environment. Soft, diffused lighting. Modern corporate aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIohrOB8NUKrTYdwR0HgauUreON0i0nQTa1nj8DKLrDu9nTzFP7LB731r7tR9KpYjVepu8bjqsePW-uotEYvieGTcAxGvPdqdn0nuuCJIF7LsOL0EJe0yIoASSn-CBcG9eiTGMJdBAq2-rn8n7Pof-7MCWfAn6j5-qpoV2BMJUmyd_volQou3G2RTj39eDEsNpVjs6OhB1TmcbVHR_Z7VOgyxSxQfDDQRxwN5-CR8puro0YeGNmYAnSQ"/>
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
{/* Bottom Navigation (Mobile Only) */}
<nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant z-50 flex justify-around items-center h-16 pb-safe">
<a className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-label-sm text-label-sm mt-1">Dashboard</span>
</a>
<a className="flex flex-col items-center justify-center w-full h-full text-primary border-t-2 border-primary bg-primary-container/10" href="#">
<span className="material-symbols-outlined" data-icon="calendar_today" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>calendar_today</span>
<span className="font-label-sm text-label-sm mt-1 font-bold">Time Off</span>
</a>
<a className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label-sm text-label-sm mt-1">Profile</span>
</a>
</nav>
    </div>
  );
}

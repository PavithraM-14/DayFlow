'use client';

import Link from 'next/link';

export default function EmployeePayroll() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      {/* SideNavBar */}
<nav className="hidden md:flex flex-col h-full py-unit-base px-4 h-screen w-64 fixed left-0 top-0 border-r border-outline-variant dark:border-outline bg-surface-container-low dark:bg-surface-container-lowest z-40">
<div className="flex items-center gap-3 px-4 py-6">
<div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-xl">D</div>
<div>
<h1 className="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed leading-none">Dayflow</h1>
<p className="text-on-surface-variant text-label-sm font-label-sm mt-1">HR Portal</p>
</div>
</div>
<div className="flex-1 overflow-y-auto mt-4">
<ul className="space-y-1">
<li>
<Link href="/employee-dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" >
<span className="material-symbols-outlined">dashboard</span>
                        Dashboard
                    </Link>
</li>
<li>
<Link href="/employee-dashboard/attendance" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" >
<span className="material-symbols-outlined">event_available</span>
                        Attendance
                    </Link>
</li>
<li>
<Link href="/employee-dashboard/time-off" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" >
<span className="material-symbols-outlined">calendar_today</span>
                        Time Off
                    </Link>
</li>
<li>
<Link href="/employee-dashboard/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" >
<span className="material-symbols-outlined">person</span>
                        My Profile
                    </Link>
</li>
<li>
<Link href="/employee-dashboard/payroll" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary transition-all scale-95 active:scale-90 font-title-md text-title-md" >
<span className="material-symbols-outlined">payments</span>
                        Payroll
                    </Link>
</li>
</ul>
</div>
<div className="mt-auto border-t border-outline-variant pt-4">
<ul className="space-y-1">
<li>
<Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" >
<span className="material-symbols-outlined">help</span>
                        Help
                    </Link>
</li>
<li>
<Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" >
<span className="material-symbols-outlined">logout</span>
                        Logout
                    </Link>
</li>
</ul>
</div>
</nav>
{/* Main Content Area */}
<div className="flex-1 flex flex-col md:ml-64 w-full h-full bg-background overflow-hidden">
{/* TopNavBar (Mobile) */}
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
{/* TopNavBar (Desktop) */}

{/* Scrollable Canvas */}
<main className="flex-1 overflow-y-auto p-margin-mobile md:p-gutter lg:p-container-padding">
<div className="max-w-[1120px] mx-auto space-y-gutter">
{/* Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="font-display-lg text-display-lg text-on-surface">Payroll &amp; Earnings</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">Manage your compensation, payslips, and direct deposit details.</p>
</div>
</div>
{/* Bento Grid Layout */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
{/* YTD Earnings Card (Spans 8 cols on desktop) */}
<div className="col-span-1 md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
{/* Decorative background element */}
<div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
<div>
<h3 className="font-title-md text-title-md text-on-surface-variant">2024 YTD Earnings</h3>
<div className="mt-4 flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-primary">$84,250.00</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Gross</span>
</div>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-surface-variant">
<div>
<p className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Net Pay</p>
<p className="font-title-md text-title-md text-on-surface">$61,420.50</p>
</div>
<div>
<p className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Taxes</p>
<p className="font-title-md text-title-md text-on-surface">$18,500.25</p>
</div>
<div>
<p className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Deductions</p>
<p className="font-title-md text-title-md text-on-surface">$4,329.25</p>
</div>
<div>
<p className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Last Pay Date</p>
<p className="font-title-md text-title-md text-on-surface">Oct 15, 2024</p>
</div>
</div>
</div>
{/* Direct Deposit Card (Spans 4 cols on desktop) */}
<div className="col-span-1 md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col justify-between">
<div className="flex justify-between items-start">
<h3 className="font-title-md text-title-md text-on-surface-variant">Direct Deposit</h3>
<button className="text-primary hover:bg-primary-fixed rounded-full p-1 transition-colors">
<span className="material-symbols-outlined">edit</span>
</button>
</div>
<div className="mt-6 space-y-4">
<div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-lg border border-surface-variant">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined">account_balance</span>
</div>
<div>
<p className="font-body-sm text-body-sm font-medium text-on-surface">Chase Bank</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">**** **** 4092</p>
</div>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
<span className="font-label-sm text-label-sm text-secondary">Active &amp; Verified</span>
</div>
</div>
</div>
{/* Payslip History (Spans full width) */}
<div className="col-span-1 md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
<div className="p-6 border-b border-surface-variant flex justify-between items-center bg-surface-bright">
<h3 className="font-title-md text-title-md text-on-surface">Recent Payslips</h3>
<button className="flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface-variant font-body-sm text-body-sm rounded-lg hover:bg-surface-variant transition-colors">
<span className="material-symbols-outlined text-sm">filter_list</span>
                                Filter
                            </button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low font-label-sm text-label-sm uppercase text-on-surface-variant h-12">
<th className="px-6 font-medium">Pay Period</th>
<th className="px-6 font-medium">Pay Date</th>
<th className="px-6 font-medium">Gross</th>
<th className="px-6 font-medium">Net Pay</th>
<th className="px-6 font-medium">Status</th>
<th className="px-6 font-medium text-right">Action</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-surface-variant">
<tr className="h-12 hover:bg-surface-container-lowest group transition-colors">
<td className="px-6">Oct 01 - Oct 15, 2024</td>
<td className="px-6">Oct 15, 2024</td>
<td className="px-6">$3,850.00</td>
<td className="px-6 font-medium">$2,810.25</td>
<td className="px-6">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm">
                                                Paid
                                            </span>
</td>
<td className="px-6 text-right">
<button className="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-variant transition-colors" title="Download PDF">
<span className="material-symbols-outlined">download</span>
</button>
</td>
</tr>
<tr className="h-12 hover:bg-surface-container-lowest group transition-colors">
<td className="px-6">Sep 16 - Sep 30, 2024</td>
<td className="px-6">Sep 30, 2024</td>
<td className="px-6">$3,850.00</td>
<td className="px-6 font-medium">$2,810.25</td>
<td className="px-6">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm">
                                                Paid
                                            </span>
</td>
<td className="px-6 text-right">
<button className="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-variant transition-colors" title="Download PDF">
<span className="material-symbols-outlined">download</span>
</button>
</td>
</tr>
<tr className="h-12 hover:bg-surface-container-lowest group transition-colors">
<td className="px-6">Sep 01 - Sep 15, 2024</td>
<td className="px-6">Sep 15, 2024</td>
<td className="px-6">$3,850.00</td>
<td className="px-6 font-medium">$2,810.25</td>
<td className="px-6">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm">
                                                Paid
                                            </span>
</td>
<td className="px-6 text-right">
<button className="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-variant transition-colors" title="Download PDF">
<span className="material-symbols-outlined">download</span>
</button>
</td>
</tr>
<tr className="h-12 hover:bg-surface-container-lowest group transition-colors">
<td className="px-6 relative">
                                            Aug 16 - Aug 31, 2024
                                            {/* Marker Highlight Example */}
<span className="absolute top-1/2 -translate-y-1/2 left-48 font-accent-marker text-accent-marker text-primary z-10 whitespace-nowrap">Bonus included!</span>
<div className="absolute top-1/2 -translate-y-1/2 left-48 w-32 h-3 bg-primary-fixed opacity-50 -z-10 mt-1 skew-x-12"></div>
</td>
<td className="px-6">Aug 31, 2024</td>
<td className="px-6">$4,500.00</td>
<td className="px-6 font-medium">$3,300.50</td>
<td className="px-6">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm">
                                                Paid
                                            </span>
</td>
<td className="px-6 text-right">
<button className="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-variant transition-colors" title="Download PDF">
<span className="material-symbols-outlined">download</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 border-t border-surface-variant flex justify-center bg-surface-bright">
<button className="font-body-sm text-body-sm font-medium text-primary hover:text-primary-container transition-colors">View All Payslips</button>
</div>
</div>
</div>
</div>
</main>
</div>
    </div>
  );
}

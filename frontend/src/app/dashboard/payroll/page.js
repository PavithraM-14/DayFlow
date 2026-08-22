'use client';

import Link from 'next/link';

export default function Page() {
  const active = 'payroll';
  return (
    <div className="bg-surface text-on-surface font-body-md h-screen flex overflow-hidden">
      
      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col bg-surface-container-lowest border-r border-outline-variant h-screen w-64 fixed left-0 py-6 px-4 z-50">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined">water_drop</span>
          </div>
          <div>
            <h1 className="text-title-md font-title-md font-black text-primary">Dayflow</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">HR Management</p>
          </div>
        </div>

        <ul className="flex flex-col gap-1 flex-grow">
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'payroll' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/hr">
              <span className="material-symbols-outlined" style={active === 'payroll' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'payroll' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/employee">
              <span className="material-symbols-outlined" style={active === 'payroll' ? { fontVariationSettings: "'FILL' 1" } : {}}>groups</span>
              <span>Employees</span>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="/dashboard/verification">
              <span className="material-symbols-outlined">how_to_reg</span>
              <span>New Employee Verification</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'payroll' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/attendance">
              <span className="material-symbols-outlined" style={active === 'payroll' ? { fontVariationSettings: "'FILL' 1" } : {}}>pending_actions</span>
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'payroll' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/time-off">
              <span className="material-symbols-outlined" style={active === 'payroll' ? { fontVariationSettings: "'FILL' 1" } : {}}>calendar_today</span>
              <span>Time Off</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'payroll' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/payroll">
              <span className="material-symbols-outlined" style={active === 'payroll' ? { fontVariationSettings: "'FILL' 1" } : {}}>payments</span>
              <span>Payroll</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'payroll' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/reports">
              <span className="material-symbols-outlined" style={active === 'payroll' ? { fontVariationSettings: "'FILL' 1" } : {}}>assessment</span>
              <span>Reports</span>
            </Link>
          </li>
        </ul>

        <div className="mt-auto border-t border-outline-variant pt-4">
          <ul className="flex flex-col gap-1">
            <li>
              <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="#">
                <span className="material-symbols-outlined">settings</span>
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="#">
                <span className="material-symbols-outlined">help_outline</span>
                <span>Help</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Payroll - Dayflow */}
<div className="flex-1 md:ml-64 flex flex-col min-h-screen">
{/* Top App Bar */}
<header className="bg-surface dark:bg-surface-dim text-primary dark:text-primary-fixed-dim docked top-0 w-full sticky z-40 border-b border-outline-variant dark:border-outline flat no shadows flex justify-between items-center h-16 px-gutter">
{/* Mobile Menu & Title */}
<div className="flex items-center gap-4">
<button className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors focus:ring-2 ring-primary-container outline-none">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="hidden md:flex items-center gap-4 text-on-surface-variant dark:text-surface-variant">
<span className="material-symbols-outlined text-[20px]">search</span>
<input className="bg-transparent border-none focus:ring-0 text-body-sm font-body-sm placeholder:text-outline w-64 p-0" placeholder="Search..." type="text" />
</div>
</div>
<div className="md:hidden font-accent-marker text-accent-marker text-secondary">
                Dayflow
            </div>
{/* Actions & Profile */}
<div className="flex items-center gap-2">
<button className="p-2 text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors rounded-full focus:ring-2 ring-primary-container outline-none relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="p-2 text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors rounded-full focus:ring-2 ring-primary-container outline-none hidden md:block">
<span className="material-symbols-outlined">apps</span>
</button>
<div className="ml-4 h-8 w-8 rounded-full bg-surface-variant border border-outline-variant overflow-hidden flex items-center justify-center">
<img alt="Administrator Profile" className="w-full h-full object-cover" data-alt="A professional headshot of a corporate HR administrator, looking friendly and competent. High-key lighting, bright modern office setting, plum and teal subtle accents in the background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqr55u7AYzX7oTsI4D5xhmMIMo769r1i-Yoth1Ii_3mPD_uCGitkRKh8nVTZh2yatdvBpWzfCD1gJCRWh_igwHPgBnMeFxrnP4o2BLLXqUePLwOqovletoLHrXuEYFyIjUq6lOsZI1q1yESiMiCo_9lMmLtosCEeab_J0vYQOrercQfvSdEdcD_mVsRjoh7lne0PTT4dcd8kaPS-XjWEjVb-1kfKe9E22CluaKG-zbDKGEA9wn5ZDSOg" />
</div>
</div>
</header>
{/* Page Content */}
<main className="flex-1 p-margin-mobile md:p-gutter max-w-max-width mx-auto w-full flex flex-col gap-6">
{/* Page Header */}
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-background">Payroll Processing</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Review and process employee salaries for the current period.</p>
</div>
<div className="flex items-center gap-3">
{/* Month Selector */}
<div className="relative flex items-center border border-outline-variant rounded-lg bg-surface-container-lowest px-3 py-2">
<span className="material-symbols-outlined text-on-surface-variant mr-2 text-[20px]">calendar_month</span>
<select className="appearance-none bg-transparent border-none p-0 pr-6 focus:ring-0 font-body-sm text-body-sm text-on-surface font-medium cursor-pointer">
<option>October 2023</option>
<option>September 2023</option>
<option>August 2023</option>
</select>
<span className="material-symbols-outlined text-on-surface-variant absolute right-2 pointer-events-none text-[20px]">arrow_drop_down</span>
</div>
{/* Export Button */}
<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors border border-outline-variant font-label-sm text-label-sm font-medium shadow-sm">
<span className="material-symbols-outlined text-[18px]">download</span>
                        Export
                    </button>
{/* Process Button */}
<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors shadow-sm font-label-sm text-label-sm font-medium">
<span className="material-symbols-outlined text-[18px]">play_arrow</span>
                        Process Payroll
                    </button>
</div>
</div>
{/* Summary Metric Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{/* Metric 1 */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col gap-2 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Total Payroll Cost</span>
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">account_balance</span>
</div>
</div>
<div className="font-display-lg text-display-lg text-on-surface mt-2 relative">
                        $245,890
                        <span className="absolute -right-2 top-0 font-accent-marker text-accent-marker text-secondary-fixed-dim bg-secondary/10 px-2 rounded -rotate-6 hidden md:inline-block">Approved</span>
</div>
<div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+2.4% from last month</span>
</div>
</div>
{/* Metric 2 */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col gap-2 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Employees Processed</span>
<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]">groups</span>
</div>
</div>
<div className="font-display-lg text-display-lg text-on-surface mt-2">
                        142 <span className="font-title-md text-title-md text-outline">/ 150</span>
</div>
<div className="w-full bg-surface-variant rounded-full h-1.5 mt-2">
<div className="bg-secondary h-1.5 rounded-full" style={{width: '94%'}}></div>
</div>
</div>
{/* Metric 3 */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col gap-2 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Pending Approvals</span>
<div className="w-8 h-8 rounded-full bg-error-container flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[18px]">error</span>
</div>
</div>
<div className="font-display-lg text-display-lg text-on-surface mt-2">
                        8
                    </div>
<div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
<span>Requires manager sign-off</span>
</div>
</div>
</div>
{/* Data Table Section */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden flex flex-col flex-1">
<div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
<h3 className="font-title-md text-title-md text-on-surface">Employee Details</h3>
<div className="flex items-center gap-2">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
<input className="pl-9 pr-4 py-1.5 border border-outline-variant rounded-lg font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container outline-none bg-surface-bright w-64 transition-all" placeholder="Search employee..." type="text" />
</div>
<button className="p-1.5 text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px]">filter_list</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-[#FAF8FA] border-b border-outline-variant">
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Employee Name</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Role / Dept</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Base Pay</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Allowances</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Deductions</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Net Pay</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-center">Status</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
{/* Row 1 */}
<tr className="hover:bg-surface/50 transition-colors h-[48px] group">
<td className="py-2 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-label-sm font-bold text-xs">JD</div>
<div className="font-body-sm text-body-sm font-medium text-on-surface">Jane Doe</div>
</div>
</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant">Senior Engineer<br /><span className="text-xs text-outline">Engineering</span></td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right">$8,500.00</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-secondary">+$450.00</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-error">-$1,250.00</td>
<td className="py-2 px-4 font-body-sm text-body-sm font-bold text-on-surface text-right">$7,700.00</td>
<td className="py-2 px-4 text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">Ready</span>
</td>
<td className="py-2 px-4 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-surface/50 transition-colors h-[48px] group">
<td className="py-2 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-sm font-bold text-xs">JS</div>
<div className="font-body-sm text-body-sm font-medium text-on-surface">John Smith</div>
</div>
</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant">Marketing Mgr<br /><span className="text-xs text-outline">Marketing</span></td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right">$6,200.00</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-secondary">+$200.00</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-error">-$850.00</td>
<td className="py-2 px-4 font-body-sm text-body-sm font-bold text-on-surface text-right">$5,550.00</td>
<td className="py-2 px-4 text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-error/10 text-error border border-error/20">Pending</span>
</td>
<td className="py-2 px-4 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-surface/50 transition-colors h-[48px] group bg-surface-container/30">
<td className="py-2 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-label-sm font-bold text-xs">AW</div>
<div className="font-body-sm text-body-sm font-medium text-on-surface">Alice Wong</div>
</div>
</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant">Designer<br /><span className="text-xs text-outline">Product</span></td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right">$5,800.00</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-secondary">+$150.00</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-error">-$700.00</td>
<td className="py-2 px-4 font-body-sm text-body-sm font-bold text-on-surface text-right">$5,250.00</td>
<td className="py-2 px-4 text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">Ready</span>
</td>
<td className="py-2 px-4 text-right">
<button className="text-on-surface-variant hover:text-primary transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
{/* Pagination */}
<div className="p-4 border-t border-outline-variant flex items-center justify-between bg-[#FAF8FA] mt-auto">
<span className="font-body-sm text-body-sm text-on-surface-variant">Showing 1 to 3 of 150 entries</span>
<div className="flex items-center gap-1">
<button className="p-1 rounded text-outline hover:bg-surface-container transition-colors disabled:opacity-50" disabled>
<span className="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button className="w-8 h-8 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-medium flex items-center justify-center">1</button>
<button className="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium flex items-center justify-center transition-colors">2</button>
<button className="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium flex items-center justify-center transition-colors">3</button>
<span className="text-outline">...</span>
<button className="p-1 rounded text-on-surface-variant hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
</div>
</main>
</div>

    </div>
  );
}

'use client';

import Link from 'next/link';

export default function Page() {
  const active = 'attendance';
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
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'attendance' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/hr">
              <span className="material-symbols-outlined" style={active === 'attendance' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'attendance' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/employee">
              <span className="material-symbols-outlined" style={active === 'attendance' ? { fontVariationSettings: "'FILL' 1" } : {}}>groups</span>
              <span>Employees</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'attendance' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/attendance">
              <span className="material-symbols-outlined" style={active === 'attendance' ? { fontVariationSettings: "'FILL' 1" } : {}}>pending_actions</span>
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'attendance' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/time-off">
              <span className="material-symbols-outlined" style={active === 'attendance' ? { fontVariationSettings: "'FILL' 1" } : {}}>calendar_today</span>
              <span>Time Off</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'attendance' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/payroll">
              <span className="material-symbols-outlined" style={active === 'attendance' ? { fontVariationSettings: "'FILL' 1" } : {}}>payments</span>
              <span>Payroll</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'attendance' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/reports">
              <span className="material-symbols-outlined" style={active === 'attendance' ? { fontVariationSettings: "'FILL' 1" } : {}}>assessment</span>
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

      {/* Attendance - Dayflow */}
<div className="flex-1 md:ml-64 flex flex-col min-h-screen">
{/* Shared Component: TopAppBar */}
<header className="flex justify-between items-center h-16 px-gutter bg-surface sticky top-0 z-40 border-b border-outline-variant">
{/* Left Side: Mobile Menu & Breadcrumb */}
<div className="flex items-center gap-4">
<button className="md:hidden text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors focus:ring-2 ring-primary-container outline-none">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="hidden sm:flex items-center gap-2 text-sm text-on-surface-variant">
<span>Dayflow</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
<span className="font-medium text-on-surface">Attendance Log</span>
</div>
</div>
{/* Right Side: Search & Actions */}
<div className="flex items-center gap-3">
<button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors focus:ring-2 ring-primary-container outline-none">
<span className="material-symbols-outlined">search</span>
</button>
<button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors focus:ring-2 ring-primary-container outline-none relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors focus:ring-2 ring-primary-container outline-none">
<span className="material-symbols-outlined">apps</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2 shrink-0">
<img alt="Administrator Profile" className="w-full h-full object-cover" data-alt="Professional corporate headshot of a diverse female executive with warm, bright lighting and an approachable smile. Modern office background out of focus. High-key light-mode aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjxbXNV55YTHkNXvTnuimjX8WD8nqqbABQr7jb72MtodLMW7jnQQiBNLsb7WY8_yfpBJAKRwu2nRlg8foKbHC6f7ZRv62_CuyVLEC_I2FrdQObDdd2t-VgKDlU2E2JWnJ0ZGR9NfCjzO6s1XloBUqbQ5IL4gcH7QtEO3Su2ddUjx7TTCm6fFE7AU44j-nR5i5mVtXAUEc440E69hCJa4JlQx3sO5GuJTOfemKTM6ZLnCKv229xVtqZHg" />
</div>
</div>
</header>
{/* Page Content Canvas */}
<main className="flex-1 p-gutter max-w-[1120px] w-full mx-auto">
{/* Page Header */}
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
<div>
<h2 className="font-headline-lg text-headline-lg md:text-[32px] md:leading-[40px] text-on-surface mb-1">
                        Attendance Log <span className="font-accent-marker text-accent-marker text-secondary ml-2 marker-highlight">Today</span>
</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Track and monitor daily employee attendance and punctuality.</p>
</div>
<div className="flex items-center gap-3">
<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface transition-colors font-body-sm text-body-sm font-medium border border-outline-variant">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Filter
                    </button>
<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-on-primary transition-colors font-body-sm text-body-sm font-medium shadow-sm">
<span className="material-symbols-outlined text-[18px]">download</span>
                        Export Log
                    </button>
</div>
</div>
{/* Summary Bento Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
{/* Bento Card 1: Avg Working Hours */}
<div className="card-base card-hover p-5 flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-surface-container rounded-lg text-primary">
<span className="material-symbols-outlined">schedule</span>
</div>
<span className="status-chip on-time">+15m vs avg</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Avg Working Hours</p>
<p className="font-display-lg text-display-lg text-on-surface">8h 45m</p>
</div>
</div>
{/* Bento Card 2: Punctuality Rate */}
<div className="card-base card-hover p-5 flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-secondary-container rounded-lg text-on-secondary-container">
<span className="material-symbols-outlined">fact_check</span>
</div>
<span className="status-chip late">-2.5% vs last week</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Punctuality Rate</p>
<p className="font-display-lg text-display-lg text-on-surface">94.2%</p>
</div>
</div>
{/* Bento Card 3: Total Absences */}
<div className="card-base card-hover p-5 flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-error-container rounded-lg text-on-error-container">
<span className="material-symbols-outlined">person_off</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant font-medium">Out of 142 Staff</span>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Total Absences Today</p>
<p className="font-display-lg text-display-lg text-on-surface">3</p>
</div>
</div>
</div>
{/* Detailed Data Table */}
<div className="card-base overflow-hidden">
<div className="p-4 border-b border-outline-variant bg-surface flex justify-between items-center">
<h3 className="font-title-md text-title-md text-on-surface">Detailed Log</h3>
{/* Search Input */}
<div className="relative w-full max-w-xs hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
<input className="w-full pl-9 pr-3 py-1.5 bg-surface border border-outline-variant rounded-lg text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-on-surface-variant" placeholder="Search employees..." type="text" />
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-[#FAF8FA] border-b border-outline-variant">
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Employee</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Date</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Check In</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Check Out</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Total Hours</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Status</th>
<th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap text-right">Actions</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant">
{/* Row 1 */}
<tr className="hover:bg-surface-container-lowest hover:shadow-[inset_4px_0_0_0_#57344f] transition-all duration-150 h-12 bg-surface">
<td className="py-2 px-4">
<div className="flex items-center gap-3">
<img alt="Alex Chen" className="w-8 h-8 rounded-full object-cover border border-outline-variant" data-alt="Professional corporate headshot of a young male software engineer with warm, bright lighting. Modern office background out of focus. High-key light-mode aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAauWQLwzmPvTM9ap5tJkcLTE4sSSPNJ-K4L0iP8LyQDd4jsZOZWdnYN3uoO-3a5f4a5ZR_0MjqrGxdraoErifdUTcWqXSVnwG_MuzDpW3UqJRTOxaxzgnVY0_-UnNV-AF5F8WgNIpQgvHrns1-PwkltChAeI7bWBNffZAYqEZykFcZzhPO5iIVWcKrDZ5yEnRJ9mPGTB1tdY_2GSwhWP0BNApKFvHbi0yxqXRgwFBPgGj_xrutrbOsbA" />
<div>
<p className="font-medium">Alex Chen</p>
<p className="text-xs text-on-surface-variant">Engineering</p>
</div>
</div>
</td>
<td className="py-2 px-4 text-on-surface-variant">Oct 24, 2023</td>
<td className="py-2 px-4 font-medium">08:45 AM</td>
<td className="py-2 px-4 text-on-surface-variant">--:--</td>
<td className="py-2 px-4 text-on-surface-variant">--</td>
<td className="py-2 px-4"><span className="status-chip on-time">On Time</span></td>
<td className="py-2 px-4 text-right">
<button className="text-on-surface-variant hover:text-primary p-1 rounded transition-colors"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-surface-container-lowest hover:shadow-[inset_4px_0_0_0_#57344f] transition-all duration-150 h-12 bg-surface">
<td className="py-2 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-tint text-on-primary flex items-center justify-center font-bold text-xs border border-outline-variant">SJ</div>
<div>
<p className="font-medium">Sarah Jenkins</p>
<p className="text-xs text-on-surface-variant">Marketing</p>
</div>
</div>
</td>
<td className="py-2 px-4 text-on-surface-variant">Oct 24, 2023</td>
<td className="py-2 px-4 font-medium text-error">09:15 AM</td>
<td className="py-2 px-4 text-on-surface-variant">--:--</td>
<td className="py-2 px-4 text-on-surface-variant">--</td>
<td className="py-2 px-4"><span className="status-chip late">Late</span></td>
<td className="py-2 px-4 text-right">
<button className="text-on-surface-variant hover:text-primary p-1 rounded transition-colors"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
</td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-surface-container-lowest hover:shadow-[inset_4px_0_0_0_#57344f] transition-all duration-150 h-12 bg-surface">
<td className="py-2 px-4">
<div className="flex items-center gap-3">
<img alt="Maria Garcia" className="w-8 h-8 rounded-full object-cover border border-outline-variant" data-alt="Professional corporate headshot of a mature female HR manager with warm, bright lighting. Modern office background out of focus. High-key light-mode aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjiVlRC6bhAPoyaoaD3fO1LrsbDVH7qaBHKNVsDHvy_hGturcRt3V5NRVYQ-NKkQn-Lzo6oLfCiThj1f_ZckQkp_57VxPk0JrNjufvhxRMCcwwub_mpWEdYZetRxAzpZ00DVKG1ADI75eLJIzYwQweplTQoATFnXaPrCCR0paGkdWT94Rbwd2RK-O8ngtGqNsVws-So2Xmm5OihfIxvja6Ff-1mK9M6tm5JeMMY7iSSG3HIvhPatMDgA" />
<div>
<p className="font-medium">Maria Garcia</p>
<p className="text-xs text-on-surface-variant">HR</p>
</div>
</div>
</td>
<td className="py-2 px-4 text-on-surface-variant">Oct 23, 2023</td>
<td className="py-2 px-4 font-medium">08:55 AM</td>
<td className="py-2 px-4 text-on-surface-variant">05:10 PM</td>
<td className="py-2 px-4 font-medium">8h 15m</td>
<td className="py-2 px-4"><span className="status-chip on-time">On Time</span></td>
<td className="py-2 px-4 text-right">
<button className="text-on-surface-variant hover:text-primary p-1 rounded transition-colors"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
</td>
</tr>
{/* Row 4 */}
<tr className="hover:bg-surface-container-lowest hover:shadow-[inset_4px_0_0_0_#57344f] transition-all duration-150 h-12 bg-[#FAF8FA]/50">
<td className="py-2 px-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-outline text-on-primary flex items-center justify-center font-bold text-xs border border-outline-variant">DT</div>
<div>
<p className="font-medium text-on-surface-variant">David Thompson</p>
<p className="text-xs text-on-surface-variant">Sales</p>
</div>
</div>
</td>
<td className="py-2 px-4 text-on-surface-variant">Oct 24, 2023</td>
<td className="py-2 px-4 text-on-surface-variant">--:--</td>
<td className="py-2 px-4 text-on-surface-variant">--:--</td>
<td className="py-2 px-4 text-on-surface-variant">0h</td>
<td className="py-2 px-4"><span className="status-chip absent">Absent</span></td>
<td className="py-2 px-4 text-right">
<button className="text-on-surface-variant hover:text-primary p-1 rounded transition-colors"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
</div>
{/* Pagination Footer */}
<div className="p-4 border-t border-outline-variant bg-surface flex items-center justify-between">
<p className="font-body-sm text-body-sm text-on-surface-variant">Showing 1 to 4 of 142 entries</p>
<div className="flex gap-1">
<button className="p-1 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50" disabled>
<span className="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button className="w-8 h-8 rounded bg-primary text-on-primary font-medium text-sm flex items-center justify-center">1</button>
<button className="w-8 h-8 rounded hover:bg-surface-container-high text-on-surface font-medium text-sm flex items-center justify-center transition-colors">2</button>
<button className="w-8 h-8 rounded hover:bg-surface-container-high text-on-surface font-medium text-sm flex items-center justify-center transition-colors">3</button>
<span className="w-8 h-8 flex items-center justify-center text-on-surface-variant">...</span>
<button className="p-1 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors">
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

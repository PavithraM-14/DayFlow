export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      <style dangerouslySetInnerHTML={{ __html: `.glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(123, 116, 134, 0.2);
        }` }} />
      
{/*  SideNavBar (Desktop)  */}
<nav className="hidden md:flex flex-col h-full p-md fixed left-0 top-0 w-[240px] border-r border-outline-variant bg-surface-container z-50">
<div className="mb-xl flex items-center gap-sm">
<div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-primary-container" data-icon="corporate_fare" data-weight="fill" style={{ fontVariationSettings: '\'FILL\' 1' }}>corporate_fare</span>
</div>
<div>
<h1 className="font-headline-md text-headline-md text-primary">Dayflow</h1>
<p className="font-label-sm text-label-sm text-on-surface-variant">Enterprise HRMS</p>
</div>
</div>
<ul className="flex flex-col gap-base flex-1">
<li>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="group">group</span>
<span>Employees</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-sm bg-secondary-container text-on-secondary-container font-bold rounded-lg transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="event_available">event_available</span>
<span>Attendance</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="event_busy">event_busy</span>
<span>Time Off</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
<span>Payroll</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span>Reports</span>
</a>
</li>
</ul>
<div className="mt-auto flex flex-col gap-base">
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span>My Profile</span>
</a>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span>Settings</span>
</a>
</div>
</nav>
{/*  Main Content Area  */}
<main className="flex-1 flex flex-col min-h-screen md:ml-[240px] w-full">
{/*  TopAppBar  */}
<header className="flex justify-between items-center h-16 px-margin-desktop bg-surface border-b border-outline-variant docked full-width top-0 sticky z-40">
<div className="flex-1 max-w-md hidden md:flex items-center relative">
<span className="material-symbols-outlined absolute left-sm text-on-surface-variant" data-icon="search">search</span>
<input className="w-full bg-surface-container border-outline-variant rounded-lg pl-xl pr-sm py-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface transition-all" placeholder="Search employees, reports..." type="text"/>
</div>
<div className="md:hidden flex items-center">
<h2 className="font-headline-md text-headline-md font-bold text-primary">Dayflow</h2>
</div>
<div className="flex items-center gap-md">
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors duration-200">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors duration-200">
<span className="material-symbols-outlined" data-icon="light_mode">light_mode</span>
</button>
<div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant shrink-0 cursor-pointer">
<img alt="User Avatar" className="w-full h-full object-cover" data-alt="Professional headshot of a corporate employee on a dark, moody background, modern corporate style, highly detailed portrait, soft dramatic lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcVtiHFghyWzET730Sv-k11WV0EyUabSMU60LJAO37iz2EmEnqielE3KMVVqju27bMJjvoz2p-zKY3pGbyvQwLVcvdYyEE47uO3KCebwWxQ7fh0gr1bNhEZIjqmpLLuF_yZl8QKvJqZgUqA5oYJWnCrqObPOG4RMR9PMKOAcKw9Cp0KK35aI6DoGSA0adrCw-Ny1Sa2BsxvQpyHheOgrnanRX62TiQ8UDHcy1WwyiBjqqedV0MfamYDQ"/>
</div>
</div>
</header>
{/*  Canvas  */}
<div className="flex-1 p-margin-mobile md:p-margin-desktop overflow-y-auto">
{/*  Header & Filters  */}
<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-md mb-xl">
<div>
<h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-on-surface">Attendance Log</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-xs">Track and manage employee attendance records.</p>
</div>
<div className="flex flex-wrap items-center gap-sm w-full lg:w-auto">
<div className="relative w-full sm:w-auto">
<select className="w-full sm:w-auto appearance-none bg-surface-container border border-outline-variant rounded-lg px-sm pr-xl py-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface transition-all outline-none">
<option>All Departments</option>
<option>Engineering</option>
<option>Design</option>
<option>Marketing</option>
<option>Sales</option>
</select>
<span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" data-icon="arrow_drop_down">arrow_drop_down</span>
</div>
<div className="relative w-full sm:w-auto">
<select className="w-full sm:w-auto appearance-none bg-surface-container border border-outline-variant rounded-lg px-sm pr-xl py-sm focus:ring-2 focus:ring-primary focus:border-primary text-on-surface transition-all outline-none">
<option>October 2023</option>
<option>September 2023</option>
<option>August 2023</option>
</select>
<span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" data-icon="arrow_drop_down">arrow_drop_down</span>
</div>
<button className="bg-primary text-on-primary font-label-sm px-md py-sm rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center gap-xs w-full sm:w-auto justify-center">
<span className="material-symbols-outlined text-sm" data-icon="download">download</span>
                        Export
                    </button>
</div>
</div>
{/*  Summary Bento Grid  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
<div className="glass-card rounded-xl p-lg flex flex-col gap-sm hover:border-primary/30 transition-colors">
<div className="flex justify-between items-center text-on-surface-variant">
<span className="font-label-sm text-label-sm uppercase tracking-wider">Avg Working Hours</span>
<span className="material-symbols-outlined text-tertiary" data-icon="schedule">schedule</span>
</div>
<div className="font-display-lg text-display-lg font-bold text-on-surface">8h 15m</div>
<div className="font-label-sm text-label-sm text-status-green flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px]" data-icon="trending_up">trending_up</span>
                        +2% vs last month
                    </div>
</div>
<div className="glass-card rounded-xl p-lg flex flex-col gap-sm hover:border-primary/30 transition-colors">
<div className="flex justify-between items-center text-on-surface-variant">
<span className="font-label-sm text-label-sm uppercase tracking-wider">Punctuality Rate</span>
<span className="material-symbols-outlined text-tertiary" data-icon="task_alt">task_alt</span>
</div>
<div className="font-display-lg text-display-lg font-bold text-on-surface">94%</div>
<div className="font-label-sm text-label-sm text-status-green flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px]" data-icon="trending_up">trending_up</span>
                        +1.5% vs last month
                    </div>
</div>
<div className="glass-card rounded-xl p-lg flex flex-col gap-sm hover:border-primary/30 transition-colors">
<div className="flex justify-between items-center text-on-surface-variant">
<span className="font-label-sm text-label-sm uppercase tracking-wider">Total Absences</span>
<span className="material-symbols-outlined text-status-red" data-icon="event_busy">event_busy</span>
</div>
<div className="font-display-lg text-display-lg font-bold text-on-surface">12</div>
<div className="font-label-sm text-label-sm text-status-red flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px]" data-icon="trending_down">trending_down</span>
                        -3 vs last month
                    </div>
</div>
</div>
{/*  Attendance Data Table  */}
<div className="bg-surface-container border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-outline-variant bg-surface-container-high">
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium">Employee</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium">Date</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium">Check In</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium">Check Out</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium">Total Hours</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium">Status</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
{/*  Row 1  */}
<tr className="hover:bg-surface-container-high transition-colors group">
<td className="p-sm flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden shrink-0">
<img className="w-full h-full object-cover" data-alt="Portrait of an Asian female software engineer, professional lighting, dark corporate background, modern tech aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOsp2tCqlgckuzYm-Vm0p-Q4F54yLEWEOJRNTJYiwmgliCNB5BNGFLSWsuVhNwV9neGXuGr6HtVVENJE_jHQqsy2CdSR_iJeEyBHDzZELRxxHgnaEtgZHnBOFTyILK83IH4-eWstAqU1BPe3VNuwJYo1S0yTEFT5nmAwu0s8_G_VqsZ_1nduZz3MedLa3a9XTf2enVkXhMoXafJUuN4v6ZbzUwPsh_i3Xpu8DFR_oZZL1wM2lvfHPEtw"/>
</div>
<div>
<div className="font-body-md text-body-md text-on-surface font-medium">Elena Rostova</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Engineering</div>
</div>
</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface">Oct 24, 2023</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface">08:45 AM</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface">05:15 PM</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface">8h 30m</td>
<td className="p-sm">
<span className="inline-flex items-center px-2 py-1 rounded-full text-label-sm font-label-sm bg-status-green/10 text-status-green border border-status-green/20">On Time</span>
</td>
<td className="p-sm">
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-surface-container-high transition-colors group">
<td className="p-sm flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden shrink-0">
<img className="w-full h-full object-cover" data-alt="Portrait of a Black male marketing manager, professional lighting, dark corporate background, modern tech aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf_j-lLhebG2PY-pfsW6mwjFlpu5cxT8qfosSsu-Ehs7k1-dZ3K4dySNXY7_euD8SH5sePfCxYBfONczrSIWKA1fVune6vj3Wsz7ZBNhrt63mfb7DX_fjg9Ol8cqFcSYDSOT8q2i80QeolJWqrWEtiifJgnsa3FJLtgUcoOAQLmDurghjfj2zWnOdm-E8L89Yy2cuKB4cj5Py-ub_3SEZh3Q0BnMEo0V19UzJagdBz8W_2Ze2Dwa4HRQ"/>
</div>
<div>
<div className="font-body-md text-body-md text-on-surface font-medium">Marcus Johnson</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Marketing</div>
</div>
</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface">Oct 24, 2023</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface">09:15 AM</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface">06:00 PM</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface">8h 45m</td>
<td className="p-sm">
<span className="inline-flex items-center px-2 py-1 rounded-full text-label-sm font-label-sm bg-status-amber/10 text-status-amber border border-status-amber/20">Late</span>
</td>
<td className="p-sm">
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-surface-container-high transition-colors group">
<td className="p-sm flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden shrink-0">
<img className="w-full h-full object-cover" data-alt="Portrait of a Caucasian female designer, professional lighting, dark corporate background, modern tech aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUm0oifQiPATNOKLgMVEjLfvr3GLNlIbIU_yrTIjQzP0T7L1NXipcye2RSkkCddARfK_RYikctBKIpRCW6Qw2AHrw7qN08Qe-SFUclFk70gHyZBY3r7lTu8LrjJZgaArzbJk3tfmYqy1RFBwFYU01z2EQPkHHGaQ2zA809QMUCzMVsB9P1BmekPAZsaoxT-W7tbxpGWM8pQT2SddFCgeLGtDpvmBuWOr5zlRqWttXhRj0TuQs-N8Ytiw"/>
</div>
<div>
<div className="font-body-md text-body-md text-on-surface font-medium">Sarah Jenkins</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Design</div>
</div>
</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface">Oct 24, 2023</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface-variant">--:-- --</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface-variant">--:-- --</td>
<td className="p-sm font-data-mono text-data-mono text-on-surface-variant">0h 0m</td>
<td className="p-sm">
<span className="inline-flex items-center px-2 py-1 rounded-full text-label-sm font-label-sm bg-status-red/10 text-status-red border border-status-red/20">Absent</span>
</td>
<td className="p-sm">
<button className="text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Pagination  */}
<div className="p-sm border-t border-outline-variant flex items-center justify-between bg-surface-container">
<span className="font-label-sm text-label-sm text-on-surface-variant">Showing 1 to 10 of 45 entries</span>
<div className="flex gap-xs">
<button className="p-1 rounded hover:bg-surface-variant text-on-surface-variant transition-colors disabled:opacity-50">
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<button className="p-1 rounded hover:bg-surface-variant text-on-surface-variant transition-colors">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</main>
{/*  BottomNavBar (Mobile)  */}
<nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant flex justify-around items-center h-16 pb-safe z-50">
<a className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-label-sm text-[10px] mt-1">Dashboard</span>
</a>
<a className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="group">group</span>
<span className="font-label-sm text-[10px] mt-1">Employees</span>
</a>
<a className="flex flex-col items-center justify-center w-full h-full text-primary" href="#">
<span className="material-symbols-outlined" data-icon="event_available">event_available</span>
<span className="font-label-sm text-[10px] mt-1 font-bold">Attendance</span>
</a>
<a className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="font-label-sm text-[10px] mt-1">Profile</span>
</a>
</nav>

    </div>
  );
}
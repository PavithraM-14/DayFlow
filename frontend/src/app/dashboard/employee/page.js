export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden bg-light-bg dark:bg-background transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: `body { background-color: theme('colors.background'); color: theme('colors.on-background'); font-family: 'Inter', sans-serif; }
        .glass-card { background-color: theme('colors.surface'); border: 1px solid theme('colors.outline-variant'); border-radius: theme('borderRadius.xl'); padding: theme('spacing.lg'); }` }} />
      
{/*  SideNavBar (Shared Component)  */}
<nav className="bg-light-surface dark:bg-surface-container w-60 h-screen fixed left-0 top-0 border-r border-outline-variant/30 dark:border-outline-variant flex flex-col h-full py-lg px-sm z-50 transition-colors duration-300">
<div className="mb-xl px-md">
<h1 className="font-display-lg text-display-lg font-bold text-primary dark:text-primary">DAYFLOW</h1>
<p className="font-label-sm text-label-sm text-on-surface-variant">HRMS Portal</p>
</div>
<ul className="flex flex-col gap-xs flex-1">
{/*  Active Tab: Dashboard  */}
<li>
<a className="flex items-center gap-md px-md py-sm rounded-lg text-primary dark:text-primary font-bold border-r-4 border-primary transition-colors duration-200 ease-in-out bg-primary/10 dark:bg-transparent" href="#">
<span className="material-symbols-outlined" data-weight="fill" style={{ fontVariationSettings: '\'FILL\' 1' }}>dashboard</span>
<span className="font-body-md text-body-md">Dashboard</span>
</a>
</li>
<li>
<a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-body-md text-body-md">Employees</span>
</a>
</li>
<li>
<a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">calendar_today</span>
<span className="font-body-md text-body-md">Attendance</span>
</a>
</li>
<li>
<a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">event_busy</span>
<span className="font-body-md text-body-md">Time Off</span>
</a>
</li>
<li>
<a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">payments</span>
<span className="font-body-md text-body-md">Payroll</span>
</a>
</li>
<li>
<a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">assessment</span>
<span className="font-body-md text-body-md">Reports</span>
</a>
</li>
<li>
<a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-body-md text-body-md">My Profile</span>
</a>
</li>
<li>
<a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body-md text-body-md">Settings</span>
</a>
</li>
</ul>
<div className="mt-auto">
<a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-body-md text-body-md">Logout</span>
</a>
</div>
</nav>
{/*  Main Content Area  */}
<main className="flex-1 ml-60 flex flex-col h-screen overflow-y-auto">
{/*  TopAppBar (Shared Component)  */}
<header className="bg-light-surface/80 dark:bg-surface/80 backdrop-blur-md flex justify-between items-center h-16 px-lg sticky top-0 z-40 border-b border-outline-variant/30 dark:border-outline-variant transition-colors duration-300">
<div className="flex items-center flex-1">
{/*  Search bar on left (as per JSON, implied by "on_left")  */}
<div className="relative w-64 max-w-md hidden md:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input className="w-full bg-light-bg dark:bg-surface-container-low border border-outline-variant/50 dark:border-outline-variant rounded-full py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface dark:text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-colors duration-300" placeholder="Search..." type="text"/>
</div>
</div>
<div className="flex items-center gap-md">
{/*  Theme Toggle  */}
<button className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-200 p-2 rounded-full hover:bg-surface-container-highest dark:hover:bg-surface-container-high flex items-center justify-center"  title="Toggle Theme">
<span className="material-symbols-outlined dark:hidden">light_mode</span>
<span className="material-symbols-outlined hidden dark:block">dark_mode</span>
</button>
<button className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-200 p-2 rounded-full hover:bg-surface-container-highest dark:hover:bg-surface-container-high">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/50 dark:border-outline-variant bg-surface-container-high cursor-pointer ml-sm">
<img alt="User Avatar" className="w-full h-full object-cover" data-alt="A small, professional portrait photo of a corporate employee in their 30s. Soft studio lighting on a dark neutral gray background. The subject is slightly smiling, dressed in modern business casual attire. High resolution, clear facial features, corporate headshot style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBURwSwB6iZLAb79ePdvhaCDUFyiNFxjWMFCwuaA9Ri9zpOJT1Tjt3AAbVGNgdUShlbpmXW8mGRO6ilsu0KwIWDmKW4jrT-D5Qd305V9S5ZsWLXa0i71Uy2P2M98y5qFPwUfspcuhVGNRwozHAVxE0GYcL0x-O1mp_xqy8Pjd7buJKa3659SbcaUez8TaI9p2v0yJe6UIfrEMtirw5S_MQCPmIM32jXrROKaEiO0ffIDKFMhMfQP1RBiA"/>
</div>
</div>
</header>
{/*  Dashboard Canvas  */}
<div className="p-lg max-w-7xl mx-auto w-full">
{/*  Greeting Section  */}
<div className="mb-xl mt-md">
<h2 className="font-display-lg text-display-lg text-on-surface mb-2">Good morning, Karthik.</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">Here is your overview for today.</p>
</div>
{/*  Dashboard Grid  */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-lg">
{/*  Left Column (Main Focus)  */}
<div className="xl:col-span-8 flex flex-col gap-lg">
{/*  Today's Attendance (Large Card)  */}
<div className="glass-card bg-light-surface dark:bg-surface border-outline-variant/30 dark:border-outline-variant transition-colors duration-300">
<div className="flex justify-between items-start mb-lg">
<div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Today's Attendance</h3>
<div className="flex items-center gap-xs">
<span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span> {/*  Amber dot indicating Not Checked In  */}
<span className="font-label-sm text-label-sm text-[#f59e0b]">Not Checked In</span>
</div>
</div>
<button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-body-md text-body-md font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                                Check In
                            </button>
</div>
<div className="grid grid-cols-3 gap-md pt-md border-t border-outline-variant/30">
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Check-in Time</p>
<p className="font-data-mono text-data-mono text-on-surface opacity-50 dark:opacity-50 opacity-100">--:-- AM</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Check-out Time</p>
<p className="font-data-mono text-data-mono text-on-surface opacity-50 dark:opacity-50 opacity-100">--:-- PM</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Working Hours</p>
<p className="font-data-mono text-data-mono text-on-surface opacity-50 dark:opacity-50 opacity-100">00h 00m</p>
</div>
</div>
</div>
{/*  Leave Summary Cards  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-md">
<div className="glass-card bg-light-surface dark:bg-surface border-outline-variant/30 dark:border-outline-variant transition-colors duration-300 flex flex-col items-center justify-center text-center py-xl">
<div className="w-12 h-12 rounded-full bg-light-bg dark:bg-surface-container-high flex items-center justify-center mb-md border border-outline-variant/30 dark:border-outline-variant">
<span className="material-symbols-outlined text-[#8b5cf6] dark:text-primary">beach_access</span>
</div>
<h4 className="font-label-sm text-label-sm text-on-surface-variant mb-2">Paid Time Off</h4>
<p className="font-display-lg-mobile text-display-lg-mobile text-on-surface">18 <span className="font-body-md text-body-md text-on-surface-variant font-normal">days left</span></p>
</div>
<div className="glass-card bg-light-surface dark:bg-surface border-outline-variant/30 dark:border-outline-variant transition-colors duration-300 flex flex-col items-center justify-center text-center py-xl">
<div className="w-12 h-12 rounded-full bg-light-bg dark:bg-surface-container-high flex items-center justify-center mb-md border border-outline-variant/30 dark:border-outline-variant">
<span className="material-symbols-outlined text-status-red dark:text-error">medical_services</span>
</div>
<h4 className="font-label-sm text-label-sm text-on-surface-variant mb-2">Sick Leave</h4>
<p className="font-display-lg-mobile text-display-lg-mobile text-on-surface">12 <span className="font-body-md text-body-md text-on-surface-variant font-normal">days left</span></p>
</div>
<div className="glass-card bg-light-surface dark:bg-surface border-outline-variant/30 dark:border-outline-variant transition-colors duration-300 flex flex-col items-center justify-center text-center py-xl opacity-75">
<div className="w-12 h-12 rounded-full bg-light-bg dark:bg-surface-container-high flex items-center justify-center mb-md border border-outline-variant/30 dark:border-outline-variant">
<span className="material-symbols-outlined text-on-surface-variant">money_off</span>
</div>
<h4 className="font-label-sm text-label-sm text-on-surface-variant mb-2">Unpaid Leave</h4>
<p className="font-body-md text-body-md text-on-surface mt-2">Available</p>
</div>
</div>
</div>
{/*  Right Column (Sidebar/Secondary Info)  */}
<div className="xl:col-span-4 flex flex-col gap-lg">
{/*  Quick Access Grid (Bento Style)  */}
<div className="glass-card bg-light-surface dark:bg-surface border-outline-variant/30 dark:border-outline-variant transition-colors duration-300 p-md">
<h3 className="font-headline-md text-headline-md text-on-surface mb-md px-sm">Quick Access</h3>
<div className="grid grid-cols-2 gap-sm">
<a className="flex flex-col items-center justify-center p-md rounded-lg bg-light-bg dark:bg-surface-container-lowest hover:bg-surface-container-highest dark:hover:bg-surface-container-high border border-transparent hover:border-outline-variant/50 dark:hover:border-outline-variant transition-colors group" href="#">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-[#8b5cf6] dark:group-hover:text-primary mb-2 transition-colors">person</span>
<span className="font-label-sm text-label-sm text-on-surface">My Profile</span>
</a>
<a className="flex flex-col items-center justify-center p-md rounded-lg bg-light-bg dark:bg-surface-container-lowest hover:bg-surface-container-highest dark:hover:bg-surface-container-high border border-transparent hover:border-outline-variant/50 dark:hover:border-outline-variant transition-colors group" href="#">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-[#8b5cf6] dark:group-hover:text-primary mb-2 transition-colors">calendar_today</span>
<span className="font-label-sm text-label-sm text-on-surface">Attendance</span>
</a>
<a className="flex flex-col items-center justify-center p-md rounded-lg bg-light-bg dark:bg-surface-container-lowest hover:bg-surface-container-highest dark:hover:bg-surface-container-high border border-transparent hover:border-outline-variant/50 dark:hover:border-outline-variant transition-colors group" href="#">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-[#8b5cf6] dark:group-hover:text-primary mb-2 transition-colors">event_busy</span>
<span className="font-label-sm text-label-sm text-on-surface">Time Off</span>
</a>
<a className="flex flex-col items-center justify-center p-md rounded-lg bg-light-bg dark:bg-surface-container-lowest hover:bg-surface-container-highest dark:hover:bg-surface-container-high border border-transparent hover:border-outline-variant/50 dark:hover:border-outline-variant transition-colors group" href="#">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-[#8b5cf6] dark:group-hover:text-primary mb-2 transition-colors">request_quote</span>
<span className="font-label-sm text-label-sm text-on-surface">Salary</span>
</a>
<a className="col-span-2 flex items-center justify-center gap-sm p-md rounded-lg bg-light-bg dark:bg-surface-container-lowest hover:bg-surface-container-highest dark:hover:bg-surface-container-high border border-transparent hover:border-outline-variant/50 dark:hover:border-outline-variant transition-colors group" href="#">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-[#8b5cf6] dark:group-hover:text-primary transition-colors">folder</span>
<span className="font-label-sm text-label-sm text-on-surface">Documents</span>
</a>
</div>
</div>
{/*  Recent Activity Timeline  */}
<div className="glass-card bg-light-surface dark:bg-surface border-outline-variant/30 dark:border-outline-variant transition-colors duration-300 flex-1">
<h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Recent Activity</h3>
<div className="relative pl-6 border-l border-outline-variant/30 dark:border-outline-variant/50 flex flex-col gap-lg ml-3">
{/*  Activity Item 1  */}
<div className="relative">
<div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#8b5cf6] dark:bg-primary ring-4 ring-light-surface dark:ring-surface"></div>
<p className="font-body-md text-body-md text-on-surface">Payslip for October generated</p>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Today, 09:00 AM</p>
</div>
{/*  Activity Item 2  */}
<div className="relative">
<div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-light-bg dark:bg-surface-container-high border border-outline-variant/50 dark:border-outline-variant ring-4 ring-light-surface dark:ring-surface"></div>
<p className="font-body-md text-body-md text-on-surface">Leave request (Sick) approved</p>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Yesterday, 14:30 PM</p>
</div>
{/*  Activity Item 3  */}
<div className="relative">
<div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-light-bg dark:bg-surface-container-high border border-outline-variant/50 dark:border-outline-variant ring-4 ring-light-surface dark:ring-surface"></div>
<p className="font-body-md text-body-md text-on-surface">Checked out</p>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Oct 24, 18:15 PM</p>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

    </div>
  );
}
'use client';

import Link from 'next/link';

export default function EmployeeDashboard() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      <aside className="bg-surface-container border-r border-outline-variant h-screen w-64 fixed left-0 top-0 flex flex-col gap-4 py-6 px-4 z-40 hidden md:flex">
{/* Header */}
<div className="flex items-center gap-3 px-2 mb-4">
<div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg flex-shrink-0">
<span className="material-symbols-outlined" data-icon="corporate_fare">corporate_fare</span>
</div>
<div>
<h1 className="font-headline-lg text-primary text-xl">Dayflow</h1>
<p className="font-label-sm text-label-sm text-on-surface-variant">HR Management</p>
</div>
</div>
{/* Main Nav */}
<nav className="flex-1 flex flex-col gap-1">
{/* Active Tab: Dashboard */}
<Link className="text-primary font-bold bg-primary-container/10 rounded-lg flex items-center gap-3 px-3 py-2.5 active:scale-95 duration-200 group relative" href="/employee-dashboard">
<span className="material-symbols-outlined" data-icon="dashboard" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
<span className="font-label-sm text-label-sm">Dashboard</span>
{/* Active Indicator Line */}
<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full"></div>
</Link>
<Link className="text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center gap-3 px-3 py-2.5 rounded-lg active:scale-95 duration-200" href="/employee-dashboard/attendance">
<span className="material-symbols-outlined" data-icon="timer">timer</span>
<span className="font-label-sm text-label-sm">Attendance</span>
</Link>
<Link className="text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center gap-3 px-3 py-2.5 rounded-lg active:scale-95 duration-200" href="/employee-dashboard/time-off">
<span className="material-symbols-outlined" data-icon="event_busy">event_busy</span>
<span className="font-label-sm text-label-sm">Time Off</span>
</Link>
<Link className="text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center gap-3 px-3 py-2.5 rounded-lg active:scale-95 duration-200" href="/employee-dashboard/profile">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label-sm text-label-sm">My Profile</span>
</Link>
<Link className="text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center gap-3 px-3 py-2.5 rounded-lg active:scale-95 duration-200" href="/employee-dashboard/payroll">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
<span className="font-label-sm text-label-sm">Payroll</span>
</Link>
</nav>
{/* CTA */}
<button className="mt-auto bg-primary text-on-primary rounded-lg py-2.5 px-4 font-label-sm text-label-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-4 w-full active:scale-95 duration-200">
<span className="material-symbols-outlined text-sm" data-icon="login">login</span>
            Check In
        </button>
{/* Footer Nav */}
<div className="flex flex-col gap-1 border-t border-outline-variant pt-4">
<a className="text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center gap-3 px-3 py-2 rounded-lg active:scale-95 duration-200" href="#">
<span className="material-symbols-outlined text-sm" data-icon="settings">settings</span>
<span className="font-label-sm text-label-sm">Settings</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center gap-3 px-3 py-2 rounded-lg active:scale-95 duration-200 text-error" href="#">
<span className="material-symbols-outlined text-sm" data-icon="logout">logout</span>
<span className="font-label-sm text-label-sm">Logout</span>
</a>
</div>
</aside>
{/* Main Content Wrapper */}
<div className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
{/* Mobile Top Nav (Hidden on Desktop) */}
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
{/* Content Area */}
<main className="flex-1 max-w-max-width w-full mx-auto px-margin-mobile md:px-gutter py-gutter flex flex-col gap-6">
{/* Welcome Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
<div>
<h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">Good morning, Karthik.</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">Here's an overview of your workday and pending items.</p>
</div>
<div className="text-right hidden md:block">
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Tuesday, Oct 24</p>
<p className="font-title-md text-title-md text-primary">9:41 AM</p>
</div>
</div>
{/* Bento Grid Layout */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
{/* Left Column (Main Widgets) */}
<div className="md:col-span-8 flex flex-col gap-6">
{/* Attendance Widget */}
<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 relative overflow-hidden group hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow duration-300">
{/* Decorative background element */}
<div className="absolute -right-16 -top-16 w-48 h-48 bg-surface-container-highest rounded-full opacity-50 pointer-events-none"></div>
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
<div>
<h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-outline" data-icon="schedule">schedule</span>
                                    Today's Attendance
                                </h3>
<div className="mt-4 flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-error animate-pulse"></div>
<span className="font-body-md text-body-md text-on-surface-variant">Status: <strong className="text-error font-medium">Not Checked In</strong></span>
</div>
</div>
<button className="bg-primary text-on-primary font-label-sm text-label-sm px-8 py-3 rounded-lg shadow-sm hover:bg-opacity-90 transition-all active:scale-95 flex items-center gap-2 self-stretch md:self-auto justify-center">
<span className="material-symbols-outlined text-sm" data-icon="fingerprint">fingerprint</span>
                                Check In Now
                            </button>
</div>
<div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-outline-variant/50">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Check-in</span>
<span className="font-title-md text-title-md text-on-surface">--:--</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Check-out</span>
<span className="font-title-md text-title-md text-on-surface">--:--</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Total Hours</span>
<span className="font-title-md text-title-md text-on-surface">0h 0m</span>
</div>
</div>
</section>
{/* Leave Balances */}
<section>
<h3 className="font-title-md text-title-md text-on-surface mb-4">Leave Balances</h3>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
{/* Card 1 */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-primary/30 transition-colors flex flex-col justify-between h-32 relative group">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-secondary" data-icon="flight_takeoff">flight_takeoff</span>
<span className="bg-secondary/10 text-secondary font-label-sm text-label-sm px-2 py-0.5 rounded-full">Available</span>
</div>
<div>
<h4 className="font-body-sm text-body-sm text-on-surface-variant">Paid Time Off</h4>
<div className="font-headline-lg text-headline-lg text-on-surface mt-1">18 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">days</span></div>
</div>
{/* Marker Highlight Accent */}
<div className="absolute bottom-0 right-4 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
<span className="font-accent-marker text-accent-marker text-primary-container relative z-10">Plan a trip!</span>
<div className="absolute bottom-1 left-0 w-full h-3 bg-tertiary-fixed opacity-60 -z-10 rounded-sm transform -skew-x-12"></div>
</div>
</div>
{/* Card 2 */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-primary/30 transition-colors flex flex-col justify-between h-32">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-primary" data-icon="local_hospital">local_hospital</span>
</div>
<div>
<h4 className="font-body-sm text-body-sm text-on-surface-variant">Sick Leave</h4>
<div className="font-headline-lg text-headline-lg text-on-surface mt-1">12 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">days</span></div>
</div>
</div>
{/* Card 3 */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:border-primary/30 transition-colors flex flex-col justify-between h-32">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-outline" data-icon="event_busy">event_busy</span>
</div>
<div>
<h4 className="font-body-sm text-body-sm text-on-surface-variant">Unpaid Leave</h4>
<div className="font-title-md text-title-md text-on-surface mt-1">Available on request</div>
</div>
</div>
</div>
</section>
{/* Quick Access */}
<section>
<h3 className="font-title-md text-title-md text-on-surface mb-4">Quick Access</h3>
<div className="flex flex-wrap gap-3">
<button className="bg-surface-container border border-outline-variant/50 hover:bg-surface-container-high hover:border-outline-variant rounded-lg px-4 py-3 flex items-center gap-2 transition-all">
<span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="person">person</span>
<span className="font-label-sm text-label-sm text-on-surface">My Profile</span>
</button>
<button className="bg-surface-container border border-outline-variant/50 hover:bg-surface-container-high hover:border-outline-variant rounded-lg px-4 py-3 flex items-center gap-2 transition-all">
<span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="date_range">date_range</span>
<span className="font-label-sm text-label-sm text-on-surface">Timesheets</span>
</button>
<button className="bg-surface-container border border-outline-variant/50 hover:bg-surface-container-high hover:border-outline-variant rounded-lg px-4 py-3 flex items-center gap-2 transition-all">
<span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="receipt_long">receipt_long</span>
<span className="font-label-sm text-label-sm text-on-surface">Salary</span>
</button>
<button className="bg-surface-container border border-outline-variant/50 hover:bg-surface-container-high hover:border-outline-variant rounded-lg px-4 py-3 flex items-center gap-2 transition-all">
<span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="folder">folder</span>
<span className="font-label-sm text-label-sm text-on-surface">Documents</span>
</button>
</div>
</section>
</div>
{/* Right Column (Sidebar timeline) */}
<div className="md:col-span-4">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 h-full min-h-[400px]">
<div className="flex justify-between items-center mb-6">
<h3 className="font-title-md text-title-md text-on-surface">Recent Activity</h3>
<button className="text-primary hover:text-primary-container font-label-sm text-label-sm">View All</button>
</div>
{/* Timeline */}
<div className="relative pl-4 border-l-2 border-surface-container-highest flex flex-col gap-6">
{/* Event 1 */}
<div className="relative">
<div className="absolute -left-[21px] top-1 w-3 h-3 bg-surface-container-lowest border-2 border-primary rounded-full"></div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-0.5">Today, 9:00 AM</p>
<p className="font-body-sm text-body-sm text-on-surface">Payslip generated for September</p>
</div>
{/* Event 2 */}
<div className="relative">
<div className="absolute -left-[21px] top-1 w-3 h-3 bg-surface-container-lowest border-2 border-secondary rounded-full"></div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-0.5">Yesterday, 4:30 PM</p>
<p className="font-body-sm text-body-sm text-on-surface">Leave request <span className="bg-secondary/10 text-secondary px-1 rounded">approved</span></p>
</div>
{/* Event 3 */}
<div className="relative">
<div className="absolute -left-[21px] top-1 w-3 h-3 bg-surface-container-highest border-2 border-outline-variant rounded-full"></div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-0.5">Yesterday, 6:15 PM</p>
<p className="font-body-sm text-body-sm text-on-surface">Checked out</p>
</div>
{/* Event 4 */}
<div className="relative opacity-70">
<div className="absolute -left-[21px] top-1 w-3 h-3 bg-surface-container-highest border-2 border-outline-variant rounded-full"></div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-0.5">Oct 20, 9:02 AM</p>
<p className="font-body-sm text-body-sm text-on-surface">Checked in</p>
</div>
</div>
{/* Empty State Illustration (Decorative) */}
<div className="mt-8 flex justify-center opacity-30">
<span className="material-symbols-outlined text-display-lg" data-icon="local_cafe" style={{fontSize: '64px'}}>local_cafe</span>
</div>
</div>
</div>
</div>
</main>
</div>
    </div>
  );
}

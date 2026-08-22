'use client';

import Link from 'next/link';

export default function EmployeeDashboard() {
  return (
    <>
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
    </>
  );
}

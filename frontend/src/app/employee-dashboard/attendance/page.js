'use client';

import Link from 'next/link';

export default function EmployeeAttendance() {
  return (
    <>
<main className="flex-1 p-margin-mobile md:p-container-padding max-w-max-width mx-auto w-full">
<div className="mb-gutter md:hidden">
<h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold">Attendance Overview</h1>
</div>
{/* Dashboard Summary Bento Grid */}
<section className="grid grid-cols-1 md:grid-cols-12 gap-unit-base md:gap-gutter mb-gutter">
{/* Main Status Card */}
<div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 relative overflow-hidden group hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<div>
<h2 className="font-title-md text-title-md text-on-surface">October 2023 Summary</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">You are currently <span className="marker-highlight font-accent-marker text-accent-marker text-primary ml-1">on track</span> for this month.</p>
</div>
<span className="material-symbols-outlined text-secondary text-3xl opacity-20 group-hover:opacity-100 transition-opacity" data-icon="insert_chart">insert_chart</span>
</div>
<div className="grid grid-cols-3 gap-4 mt-8">
<div>
<div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Hours Logged</div>
<div className="flex items-baseline gap-1 font-display-lg text-display-lg text-primary font-bold">142<span className="text-title-md font-medium">h</span><span className="ml-2 text-secondary">30<span className="text-body-sm font-medium">m</span></span></div>
</div>
<div>
<div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Target Hours</div>
<div className="flex items-baseline gap-1 font-display-lg text-display-lg text-on-surface-variant font-bold">160<span className="text-title-md font-medium">h</span></div>
</div>
<div className="flex flex-col justify-end pb-2">
<div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{width: '89%'}}></div>
</div>
<div className="text-right font-label-sm text-label-sm text-secondary mt-2 font-bold">89% Complete</div>
</div>
</div>
</div>
{/* Punctuality Stats */}
<div className="md:col-span-4 grid grid-cols-1 gap-unit-base md:gap-gutter">
{/* On Time */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl flex items-center justify-between hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow p-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined" data-icon="schedule">schedule</span>
</div>
<div>
<div className="font-label-sm text-label-sm text-on-surface-variant uppercase">Punctuality</div>
<div className="flex items-baseline gap-1 font-display-lg text-display-lg text-on-surface font-bold">95<span className="text-title-md font-medium">%</span><span className="ml-1 text-body-sm text-on-surface-variant font-normal">On Time</span></div>
</div>
</div>
</div>
{/* Absences */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl flex items-center justify-between hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow p-6">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-on-error-container">
<span className="material-symbols-outlined" data-icon="event_busy">event_busy</span>
</div>
<div>
<div className="font-label-sm text-label-sm text-on-surface-variant uppercase">Absences</div>
<div className="flex items-baseline gap-1 font-display-lg text-display-lg text-on-surface font-bold">1<span className="text-title-md font-medium">Day</span><span className="ml-1 text-body-sm text-on-surface-variant font-normal">(Sick Leave)</span></div>
</div>
</div>
</div>
</div>
</section>
{/* Detailed Log Table */}
<section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
<div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
<h3 className="font-title-md text-title-md text-on-surface">Detailed Attendance Log</h3>
<div className="flex gap-2">
<button className="px-4 py-2 bg-primary-fixed-dim text-primary rounded-lg font-label-sm text-label-sm flex items-center gap-2 hover:bg-primary-fixed transition-colors">
<span className="material-symbols-outlined text-sm" data-icon="filter_list">filter_list</span>
                            Filter
                        </button>
<button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-sm" data-icon="download">download</span>
                            Export
                        </button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-[#FAF8FA] border-b border-outline-variant">
<th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Date</th>
<th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Status</th>
<th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Check In</th>
<th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Check Out</th>
<th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Total Hours</th>
<th className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Notes</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md text-on-surface">
<tr className="border-b border-outline-variant hover:bg-surface-variant transition-colors h-12">
<td className="p-4">Oct 24, Tue</td>
<td className="p-4"><span className="inline-block px-2 py-1 rounded bg-secondary-fixed-dim bg-opacity-20 text-secondary text-xs font-semibold">Present</span></td>
<td className="p-4">08:55 AM</td>
<td className="p-4">05:10 PM</td>
<td className="p-4">8h 15m</td>
<td className="p-4 text-on-surface-variant">--</td>
</tr>
<tr className="border-b border-outline-variant hover:bg-surface-variant transition-colors h-12">
<td className="p-4">Oct 23, Mon</td>
<td className="p-4"><span className="inline-block px-2 py-1 rounded bg-secondary-fixed-dim bg-opacity-20 text-secondary text-xs font-semibold">Present</span></td>
<td className="p-4">09:05 AM <span className="text-error font-bold">*</span></td>
<td className="p-4">05:30 PM</td>
<td className="p-4">8h 25m</td>
<td className="p-4 text-on-surface-variant text-sm">Traffic delay</td>
</tr>
<tr className="border-b border-outline-variant hover:bg-surface-variant transition-colors h-12">
<td className="p-4 text-on-surface-variant">Oct 20, Fri</td>
<td className="p-4"><span className="inline-block px-2 py-1 rounded bg-error-container bg-opacity-50 text-error text-xs font-semibold">Absent</span></td>
<td className="p-4 text-on-surface-variant">--</td>
<td className="p-4 text-on-surface-variant">--</td>
<td className="p-4 text-on-surface-variant">0h</td>
<td className="p-4 text-on-surface-variant text-sm">Sick Leave Approved</td>
</tr>
<tr className="border-b border-outline-variant hover:bg-surface-variant transition-colors h-12">
<td className="p-4">Oct 19, Thu</td>
<td className="p-4"><span className="inline-block px-2 py-1 rounded bg-secondary-fixed-dim bg-opacity-20 text-secondary text-xs font-semibold">Present</span></td>
<td className="p-4">08:50 AM</td>
<td className="p-4">05:00 PM</td>
<td className="p-4">8h 10m</td>
<td className="p-4 text-on-surface-variant">--</td>
</tr>
</tbody>
</table>
</div>
</section>
</main>
    </>
  );
}

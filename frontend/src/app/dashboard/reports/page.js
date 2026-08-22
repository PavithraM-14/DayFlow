'use client';

import Link from 'next/link';

export default function Page() {
  const active = 'reports';
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
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'reports' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/hr">
              <span className="material-symbols-outlined" style={active === 'reports' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'reports' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/employee">
              <span className="material-symbols-outlined" style={active === 'reports' ? { fontVariationSettings: "'FILL' 1" } : {}}>groups</span>
              <span>Employees</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'reports' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/attendance">
              <span className="material-symbols-outlined" style={active === 'reports' ? { fontVariationSettings: "'FILL' 1" } : {}}>pending_actions</span>
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'reports' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/time-off">
              <span className="material-symbols-outlined" style={active === 'reports' ? { fontVariationSettings: "'FILL' 1" } : {}}>calendar_today</span>
              <span>Time Off</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'reports' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/payroll">
              <span className="material-symbols-outlined" style={active === 'reports' ? { fontVariationSettings: "'FILL' 1" } : {}}>payments</span>
              <span>Payroll</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'reports' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/reports">
              <span className="material-symbols-outlined" style={active === 'reports' ? { fontVariationSettings: "'FILL' 1" } : {}}>assessment</span>
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

      {/* Reports Overview - Dayflow */}
{/* Main Content */}
<main className="ml-64 p-gutter max-w-max-width mx-auto pb-24 w-full">
{/* Header */}
<div className="flex justify-between items-end mb-8">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-background">Reports &amp; Analytics</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">High-level insights and organizational metrics for management.</p>
</div>
<div className="flex gap-3">
<button className="px-4 py-2 bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm rounded-lg hover:bg-surface-container-highest transition-colors border border-outline-variant flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">calendar_month</span> Last 30 Days
                </button>
<button className="px-4 py-2 bg-primary text-on-primary font-label-sm text-label-sm rounded-lg hover:bg-primary-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">download</span> Export
                </button>
</div>
</div>
{/* Summary Card Row */}
<div className="grid grid-cols-12 gap-6 mb-8">
{/* Total Headcount */}
<div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined">group_add</span>
</div>
<div className="bg-green-100 text-green-700 px-2 py-1 rounded-[4px] flex items-center gap-1 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">trending_up</span>
                        +5.2%
                    </div>
</div>
<div className="mt-2">
<p className="font-body-sm text-body-sm text-on-surface-variant mb-1">Total Headcount</p>
<div className="font-display-lg text-[32px] font-bold text-on-surface leading-tight">1,248</div>
</div>
</div>
{/* Turnover Rate */}
<div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-error-container text-error flex items-center justify-center">
<span className="material-symbols-outlined">person_remove</span>
</div>
<div className="bg-green-100 text-green-700 px-2 py-1 rounded-[4px] flex items-center gap-1 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">trending_down</span>
                        -1.1%
                    </div>
</div>
<div className="mt-2">
<p className="font-body-sm text-body-sm text-on-surface-variant mb-1">Turnover Rate</p>
<div className="font-display-lg text-[32px] font-bold text-on-surface leading-tight">4.2%</div>
</div>
</div>
{/* Avg. Attendance */}
<div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center">
<span className="material-symbols-outlined">how_to_reg</span>
</div>
<div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-[4px] flex items-center gap-1 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                        0.0%
                    </div>
</div>
<div className="mt-2">
<p className="font-body-sm text-body-sm text-on-surface-variant mb-1">Avg. Attendance</p>
<div className="font-display-lg text-[32px] font-bold text-on-surface leading-tight">94.5%</div>
</div>
</div>
{/* Monthly Payroll */}
<div className="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
<span className="material-symbols-outlined">payments</span>
</div>
<div className="bg-red-100 text-red-700 px-2 py-1 rounded-[4px] flex items-center gap-1 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">trending_up</span>
                        +8.4%
                    </div>
</div>
<div className="mt-2">
<p className="font-body-sm text-body-sm text-on-surface-variant mb-1">Monthly Payroll</p>
<div className="font-display-lg text-[32px] font-bold text-on-surface leading-tight">$1.4M</div>
</div>
</div>
</div>
{/* Main Analytics Grid */}
<div className="grid grid-cols-12 gap-6 mb-8">
{/* Headcount vs Turnover (Span 8) */}
<div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow min-h-[360px] flex flex-col">
<div className="flex justify-between items-start mb-6">
<div>
<h3 className="font-title-md text-title-md text-on-surface">Headcount Growth vs Turnover</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Year over year comparison</p>
</div>
<button className="text-on-surface-variant hover:bg-surface-container rounded-full p-1 transition-colors">
<span className="material-symbols-outlined">more_horiz</span>
</button>
</div>
{/* Faux Bar Chart Area */}
<div className="flex-1 relative flex items-end pt-8 pb-8">
{/* Y Axis Labels */}
<div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-[10px] text-on-surface-variant font-label-sm h-full pb-4">
<span>1500</span>
<span>1000</span>
<span>500</span>
<span>0</span>
</div>
{/* Grid Lines */}
<div className="absolute left-10 right-0 top-0 bottom-12 flex flex-col justify-between h-full pb-4 pointer-events-none">
<div className="border-b border-outline-variant opacity-20 w-full"></div>
<div className="border-b border-outline-variant opacity-20 w-full"></div>
<div className="border-b border-outline-variant opacity-20 w-full"></div>
<div className="border-b border-outline-variant opacity-20 w-full"></div>
</div>
{/* Bar Chart Content */}
<div className="ml-10 w-full h-full relative flex justify-between items-end px-4 z-10 pb-4">
{/* Jan */}
<div className="w-12 h-[60%] flex flex-col justify-end group">
<div className="w-full bg-[#E6D4F0] h-[75%] rounded-t-sm"></div>
<div className="w-full bg-[#6C34CF] h-[25%] rounded-b-sm"></div>
</div>
{/* Feb */}
<div className="w-12 h-[65%] flex flex-col justify-end group">
<div className="w-full bg-[#E6D4F0] h-[75%] rounded-t-sm"></div>
<div className="w-full bg-[#6C34CF] h-[25%] rounded-b-sm"></div>
</div>
{/* Mar */}
<div className="w-12 h-[63%] flex flex-col justify-end group">
<div className="w-full bg-[#E6D4F0] h-[80%] rounded-t-sm"></div>
<div className="w-full bg-[#6C34CF] h-[20%] rounded-b-sm"></div>
</div>
{/* Apr */}
<div className="w-12 h-[70%] flex flex-col justify-end group">
<div className="w-full bg-[#E6D4F0] h-[70%] rounded-t-sm"></div>
<div className="w-full bg-[#6C34CF] h-[30%] rounded-b-sm"></div>
</div>
{/* May */}
<div className="w-12 h-[75%] flex flex-col justify-end group">
<div className="w-full bg-[#E6D4F0] h-[80%] rounded-t-sm"></div>
<div className="w-full bg-[#6C34CF] h-[20%] rounded-b-sm"></div>
</div>
{/* Jun */}
<div className="w-12 h-[80%] flex flex-col justify-end group">
<div className="w-full bg-[#E6D4F0] h-[75%] rounded-t-sm"></div>
<div className="w-full bg-[#6C34CF] h-[25%] rounded-b-sm"></div>
</div>
</div>
{/* X Axis Labels */}
<div className="absolute left-10 right-0 bottom-8 flex justify-between px-4 text-[12px] text-on-surface-variant font-label-sm">
<span className="w-12 text-center">Jan</span>
<span className="w-12 text-center">Feb</span>
<span className="w-12 text-center">Mar</span>
<span className="w-12 text-center">Apr</span>
<span className="w-12 text-center">May</span>
<span className="w-12 text-center">Jun</span>
</div>
{/* Legend */}
<div className="absolute left-10 right-0 bottom-0 flex justify-center gap-6 text-[12px] text-on-surface-variant font-label-sm">
<div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#E6D4F0]"></div><span>Total Headcount</span></div>
<div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#6C34CF]"></div><span>Turnover</span></div>
</div>
</div>
</div>
{/* Departmental Payroll (Span 4) */}
<div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow flex flex-col">
<div className="mb-6">
<h3 className="font-title-md text-title-md text-on-surface">Departmental Payroll</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Distribution by division</p>
</div>
<div className="flex-1 flex flex-col justify-center items-center gap-8">
{/* Faux Pie Chart */}
<div className="w-48 h-48 rounded-full relative flex items-center justify-center" style={{background: 'conic-gradient(#6C34CF 0% 45%, #1D70F5 45% 75%, #F09A0A 75% 90%, #E2E8F0 90% 100%)'}}>
<div className="absolute inset-5 bg-surface-container-lowest rounded-full flex flex-col items-center justify-center">
<span className="text-body-sm text-on-surface-variant">Total</span>
<span className="font-title-md text-title-md font-bold text-on-surface">$1.4M</span>
</div>
</div>
{/* Legend */}
<div className="w-full space-y-3">
<div className="flex justify-between items-center text-body-sm">
<div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#6C34CF]"></div><span>Engineering</span></div>
<span className="font-semibold text-on-surface-variant">45%</span>
</div>
<div className="flex justify-between items-center text-body-sm">
<div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#1D70F5]"></div><span>Sales &amp; Marketing</span></div>
<span className="font-semibold text-on-surface-variant">30%</span>
</div>
<div className="flex justify-between items-center text-body-sm">
<div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F09A0A]"></div><span>Operations</span></div>
<span className="font-semibold text-on-surface-variant">15%</span>
</div>
<div className="flex justify-between items-center text-body-sm">
<div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div><span>Other</span></div>
<span className="font-semibold text-on-surface-variant">10%</span>
</div>
</div>
</div>
</div>
</div>
{/* Secondary Analytics Section */}
<div className="grid grid-cols-12 gap-6">
{/* Headcount Growth Trend (Span 8) */}
<div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow min-h-[300px] flex flex-col">
<div className="flex justify-between items-center mb-6">
<h3 className="font-title-md text-title-md text-on-surface">Headcount Growth</h3>
<select className="bg-surface border-none text-body-sm text-on-surface-variant focus:ring-0 cursor-pointer rounded-lg px-3 py-1">
<option>2023 YTD</option>
<option>2022</option>
</select>
</div>
{/* Faux Line Chart Area */}
<div className="flex-1 relative flex items-end pt-8">
{/* Y Axis Labels */}
<div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-on-surface-variant font-label-sm h-full pb-4">
<span>300</span>
<span>200</span>
<span>100</span>
<span>0</span>
</div>
{/* Grid Lines */}
<div className="absolute left-8 right-0 top-0 bottom-6 flex flex-col justify-between h-full pb-4 pointer-events-none">
<div className="border-b border-outline-variant opacity-20 w-full"></div>
<div className="border-b border-outline-variant opacity-20 w-full"></div>
<div className="border-b border-outline-variant opacity-20 w-full"></div>
<div className="border-b border-outline-variant opacity-20 w-full"></div>
</div>
{/* Chart Content (SVG) */}
<div className="ml-8 w-full h-full relative">
<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
{/* Area fill */}
<defs>
<linearGradient id="primaryGrad2" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#714b67" stopOpacity="0.15"></stop>
<stop offset="100%" stopColor="#714b67" stopOpacity="0.02"></stop>
</linearGradient>
</defs>
<path d="M0 85 Q 30 75, 40 60 T 75 40 T 100 20 L 100 100 L 0 100 Z" fill="url(#primaryGrad2)"></path>
{/* Line */}
<path d="M0 85 Q 30 75, 40 60 T 75 40 T 100 20" fill="none" stroke="#714b67" strokeLinecap="round" strokeWidth="4"></path>
{/* Data Points */}
<circle cx="40" cy="60" fill="#ffffff" r="5" stroke="#714b67" strokeWidth="3"></circle>
<circle cx="75" cy="40" fill="#ffffff" r="5" stroke="#714b67" strokeWidth="3"></circle>
</svg>
</div>
{/* X Axis Labels */}
<div className="absolute left-8 right-0 bottom-0 flex justify-between text-[10px] text-on-surface-variant font-label-sm px-2">
<span>Q1</span>
<span>Q2</span>
<span>Q3</span>
<span>Q4</span>
</div>
</div>
</div>
{/* Exportable Reports Section (Span 4) */}
<div className="col-span-12 lg:col-span-4 flex flex-col">
<h2 className="font-title-md text-title-md text-on-surface mb-4">Exportable Reports</h2>
<div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex-1">
{/* Table Header */}
<div className="bg-[#FAF8FA] grid grid-cols-12 gap-2 px-4 py-3 border-b border-outline-variant font-label-sm text-[10px] uppercase text-on-surface-variant">
<div className="col-span-6">Report Name</div>
<div className="col-span-3">Frequency</div>
<div className="col-span-3 text-right">Action</div>
</div>
{/* Table Rows */}
<div className="divide-y divide-outline-variant">
<div className="grid grid-cols-12 gap-2 px-4 py-4 items-center hover:bg-surface-bright transition-colors">
<div className="col-span-6 flex items-center gap-2 text-body-sm text-on-surface">
<span className="material-symbols-outlined text-secondary text-[18px]">description</span>
                            Monthly Payroll
                        </div>
<div className="col-span-3 text-[12px] text-on-surface-variant">Monthly</div>
<div className="col-span-3 flex justify-end">
<button className="px-2 py-1 border border-outline-variant rounded-md text-on-surface-variant text-[11px] hover:bg-surface-container transition-colors flex items-center gap-1">
                                Download <span className="material-symbols-outlined text-[14px]">file_download</span>
</button>
</div>
</div>
<div className="grid grid-cols-12 gap-2 px-4 py-4 items-center hover:bg-surface-bright transition-colors">
<div className="col-span-6 flex items-center gap-2 text-body-sm text-on-surface">
<span className="material-symbols-outlined text-secondary text-[18px]">groups</span>
                            Attendance
                        </div>
<div className="col-span-3 text-[12px] text-on-surface-variant">Weekly</div>
<div className="col-span-3 flex justify-end">
<button className="px-2 py-1 border border-outline-variant rounded-md text-on-surface-variant text-[11px] hover:bg-surface-container transition-colors flex items-center gap-1">
                                Download <span className="material-symbols-outlined text-[14px]">file_download</span>
</button>
</div>
</div>
<div className="grid grid-cols-12 gap-2 px-4 py-4 items-center hover:bg-surface-bright transition-colors">
<div className="col-span-6 flex items-center gap-2 text-body-sm text-on-surface">
<span className="material-symbols-outlined text-secondary text-[18px]">event_available</span>
                            Leave Utilization
                        </div>
<div className="col-span-3 text-[12px] text-on-surface-variant">Quarterly</div>
<div className="col-span-3 flex justify-end">
<button className="px-2 py-1 border border-outline-variant rounded-md text-on-surface-variant text-[11px] hover:bg-surface-container transition-colors flex items-center gap-1">
                                Download <span className="material-symbols-outlined text-[14px]">file_download</span>
</button>
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

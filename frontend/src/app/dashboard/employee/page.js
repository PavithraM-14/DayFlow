'use client';

import Link from 'next/link';

export default function Page() {
  const active = 'employee';
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
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'employee' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/hr">
              <span className="material-symbols-outlined" style={active === 'employee' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'employee' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/employee">
              <span className="material-symbols-outlined" style={active === 'employee' ? { fontVariationSettings: "'FILL' 1" } : {}}>groups</span>
              <span>Employees</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'employee' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/attendance">
              <span className="material-symbols-outlined" style={active === 'employee' ? { fontVariationSettings: "'FILL' 1" } : {}}>pending_actions</span>
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'employee' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/time-off">
              <span className="material-symbols-outlined" style={active === 'employee' ? { fontVariationSettings: "'FILL' 1" } : {}}>calendar_today</span>
              <span>Time Off</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'employee' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/payroll">
              <span className="material-symbols-outlined" style={active === 'employee' ? { fontVariationSettings: "'FILL' 1" } : {}}>payments</span>
              <span>Payroll</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'employee' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/reports">
              <span className="material-symbols-outlined" style={active === 'employee' ? { fontVariationSettings: "'FILL' 1" } : {}}>assessment</span>
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

      {/* Employees - Dayflow */}
<div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
{/* TopAppBar */}
<header className="bg-surface docked top-0 w-full sticky z-40 border-b border-outline-variant flex justify-between items-center h-16 px-gutter shrink-0">
<div className="flex-1 max-w-md">
<div className="relative group">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-[10px] text-body-sm font-body-sm focus:ring-2 focus:ring-primary-container focus:border-primary focus:outline-none transition-all placeholder:text-outline shadow-sm" placeholder="Search employees..." type="text" />
</div>
</div>
<div className="flex items-center gap-4 ml-auto">
<button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
</button>
<button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">apps</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2">
<img alt="Administrator Profile" className="w-full h-full object-cover" data-alt="Professional corporate headshot of an administrator in a modern office, soft high-key lighting, professional humanist style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEDeLXmBoP7CweMLnRfstMJNSe_9SZ9MLN9_vl1BKotGoxVB-o9PAUryzcR2Vtfrs7aA6JoffkaAt-KspRgQ-JzsjSeJMya2qrFDXRpgpJLVsxMXfKAy3XlOodAxHIFm9IUZiSw15STw1BRg0no68Ovdo81Opo4DQDyHHir2oJlpVJXtD56_PhNlbe6-iHreT4o4C9UvX0YFdHgviqk47L1aRFqZVdGDbS2DXepjhB8VOFFuqTcIHYTw" />
</div>
</div>
</header>
{/* Page Content */}
<main className="flex-1 overflow-y-auto bg-surface-container-low px-gutter py-8">
<div className="max-w-[1120px] mx-auto">
{/* Page Header & Actions */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface">Employee Directory</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage and view all team members across the organization.</p>
</div>
<div className="flex items-center gap-3">
<div className="flex bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden shadow-sm">
<select className="border-none bg-transparent py-2 pl-4 pr-8 font-label-sm text-label-sm text-on-surface focus:ring-0 cursor-pointer">
<option>All Departments</option>
<option>Engineering</option>
<option>Design</option>
<option>Marketing</option>
</select>
<div className="w-px bg-outline-variant"></div>
<select className="border-none bg-transparent py-2 pl-4 pr-8 font-label-sm text-label-sm text-on-surface focus:ring-0 cursor-pointer">
<option>All Statuses</option>
<option>Present</option>
<option>On Leave</option>
</select>
</div>
<button className="bg-primary text-on-primary px-4 py-2 rounded-[10px] font-label-sm text-label-sm flex items-center gap-2 hover:bg-tertiary-container transition-colors shadow-sm">
<span className="material-symbols-outlined text-[18px]">add</span>
                            Add Employee
                        </button>
</div>
</div>
{/* Bento Grid Layout for Employees */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
{/* Employee Card 1 */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col items-center text-center card-hover transition-shadow group relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="relative mb-4">
<img className="w-20 h-20 rounded-full object-cover border border-outline-variant shadow-sm" data-alt="Portrait of a female software engineer smiling, natural bright office lighting, modern corporate aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBi4RDG8eaFspPTxtHlywmsQnIPrjMRO73dsN5beb27aet6MIsrS7CXTidrPYrWnkVcbP8pFqD6aA0LQXrzekVNXiIkIz2zG3xcAzCEwXkxTme1yukEUOwjAsJsvEIrZ2x6zuH-AzEa04vQdeYdYhlrVJ7ZP6GbSpiClDaiWAS4mrmHtzz88vMLOQ34-Qm7YoDkjRhBWRjAmtb0Hi-F8WOzq4X-JALJo-9KsQYM-TX7E7ojOkrZbgcfA" />
<span className="absolute bottom-0 right-0 w-4 h-4 bg-[#2e7d32] border-2 border-surface-container-lowest rounded-full" title="Present"></span>
</div>
<h3 className="font-title-md text-title-md text-on-surface mb-1">Sarah Jenkins</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-3">Senior Backend Engineer</p>
<span className="px-3 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/50">Engineering</span>
<div className="flex gap-2 mt-5 w-full pt-4 border-t border-surface-container-highest">
<button className="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface">View</button>
<button className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">mail</span>
</button>
</div>
</div>
{/* Employee Card 2 */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col items-center text-center card-hover transition-shadow group relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="relative mb-4">
<img className="w-20 h-20 rounded-full object-cover border border-outline-variant shadow-sm" data-alt="Portrait of a male product designer with glasses, thoughtful expression, clean minimalist background, modern corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfSTp0su1GSF621scjIC0SE9gvxqyvjE2EGirMAPvRXhPuYm8dkOhutj4EgCRt9L8Y7Vs3Ii5p0B4qOZFIxAMTzciODEfMXdoiXYaBUGuyo51TFZb-SOk1TDkY8OTlp17546HLRzMlSdRKvyAPumpUlQcmIjSHSn_auykWG43wP7JffmJRqymtDW3OtKxnMQXnNZwAfTQiyvumnisZSMKE1f5hLs7fWtlO-y2cbyhzTDR7oZpz3jgRdw" />
<span className="absolute bottom-0 right-0 w-4 h-4 bg-[#ed6c02] border-2 border-surface-container-lowest rounded-full" title="On Leave"></span>
</div>
<h3 className="font-title-md text-title-md text-on-surface mb-1">Marcus Chen</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-3">Lead Product Designer</p>
<span className="px-3 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/50">Design</span>
<div className="flex gap-2 mt-5 w-full pt-4 border-t border-surface-container-highest">
<button className="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface">View</button>
<button className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">mail</span>
</button>
</div>
</div>
{/* Employee Card 3 (New Hire Highlight) */}
<div className="bg-surface-container-lowest border border-primary-fixed-dim rounded-[10px] p-5 flex flex-col items-center text-center card-hover transition-shadow group relative overflow-hidden shadow-sm">
<div className="absolute top-0 right-0 px-3 py-1 bg-primary text-on-primary font-accent-marker text-accent-marker rounded-bl-[10px] transform rotate-3 translate-x-1 -translate-y-1 z-10 shadow-sm">New Hire!</div>
<div className="absolute top-0 left-0 w-full h-1 bg-primary opacity-100"></div>
<div className="relative mb-4 mt-2">
<div className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-display-lg text-[32px] border-2 border-primary-fixed">ER</div>
<span className="absolute bottom-0 right-0 w-4 h-4 bg-[#2e7d32] border-2 border-surface-container-lowest rounded-full" title="Present"></span>
</div>
<h3 className="font-title-md text-title-md text-on-surface mb-1">Elena Rodriguez</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-3">Marketing Manager</p>
<span className="px-3 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/50">Marketing</span>
<div className="flex gap-2 mt-5 w-full pt-4 border-t border-surface-container-highest">
<button className="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface">View</button>
<button className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">mail</span>
</button>
</div>
</div>
{/* Employee Card 4 */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col items-center text-center card-hover transition-shadow group relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="relative mb-4">
<img className="w-20 h-20 rounded-full object-cover border border-outline-variant shadow-sm" data-alt="Portrait of a male HR professional in a casual suit, warm inviting office lighting, professional humanist corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuACYVRVWLlMiyWCzd61pX5rLJrXOEI99kT6Fzu00Bsoq4P5vEUi5k0DByxibbayg65EZc71Xb5pZ0nm4y-Q8nAnvJTF8lS894cr4Xm-p1_JJMo6wiq8BVvmC3bq2lEBvBEPg-tWkGA-wtz3WCr7fNzSHKvAZj1Ytinwz4sOh-yvzqR06xiseOuywDSHtjWQqITWcmzmXThFie3xVRyPTwj3PYoe2mBCJ2OC1fljiTMlSDDK147V72vLHA" />
<span className="absolute bottom-0 right-0 w-4 h-4 bg-[#2e7d32] border-2 border-surface-container-lowest rounded-full" title="Present"></span>
</div>
<h3 className="font-title-md text-title-md text-on-surface mb-1">David Kim</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-3">HR Business Partner</p>
<span className="px-3 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/50">Human Resources</span>
<div className="flex gap-2 mt-5 w-full pt-4 border-t border-surface-container-highest">
<button className="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface">View</button>
<button className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">mail</span>
</button>
</div>
</div>
</div>
</div>
</main>
</div>

    </div>
  );
}

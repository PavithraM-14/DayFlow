'use client';

import Link from 'next/link';

export default function Page() {
  const active = 'profile';
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
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'profile' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/hr">
              <span className="material-symbols-outlined" style={active === 'profile' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'profile' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/employee">
              <span className="material-symbols-outlined" style={active === 'profile' ? { fontVariationSettings: "'FILL' 1" } : {}}>groups</span>
              <span>Employees</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'profile' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/attendance">
              <span className="material-symbols-outlined" style={active === 'profile' ? { fontVariationSettings: "'FILL' 1" } : {}}>pending_actions</span>
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'profile' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/time-off">
              <span className="material-symbols-outlined" style={active === 'profile' ? { fontVariationSettings: "'FILL' 1" } : {}}>calendar_today</span>
              <span>Time Off</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'profile' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/payroll">
              <span className="material-symbols-outlined" style={active === 'profile' ? { fontVariationSettings: "'FILL' 1" } : {}}>payments</span>
              <span>Payroll</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'profile' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/reports">
              <span className="material-symbols-outlined" style={active === 'profile' ? { fontVariationSettings: "'FILL' 1" } : {}}>assessment</span>
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

      {/* Employee Profile - Dayflow */}
{/* Main Content Area */}
<main className="flex-1 flex flex-col min-w-0 bg-[#FAF8FA] md:ml-64">
{/* TopAppBar (Shared Component) */}
<header className="docked top-0 w-full sticky z-40 border-b border-outline-variant dark:border-outline bg-surface dark:bg-surface-dim flex justify-between items-center h-16 px-gutter ml-0 md:ml-0">
<div className="flex items-center gap-4">
<button className="md:hidden text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full">
<span className="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<div className="relative hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="pl-10 pr-4 py-2 w-64 bg-surface-container-lowest border border-outline-variant rounded-[10px] text-body-sm focus:ring-2 focus:ring-primary-container outline-none transition-all focus:border-primary" placeholder="Search employees..." type="text" />
</div>
</div>
<div className="flex items-center gap-4">
<span className="font-accent-marker text-accent-marker text-secondary hidden lg:block">Welcome back, Admin!</span>
<button className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full relative">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<button className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full hidden sm:block">
<span className="material-symbols-outlined" data-icon="apps">apps</span>
</button>
<img className="w-8 h-8 rounded-full object-cover ml-2 border border-outline-variant cursor-pointer" data-alt="A professional headshot of a corporate administrator, female, mid-30s, wearing glasses and a dark blazer, soft natural lighting, light-mode background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs1aEsH8beTkKabnaz-uxzDgQ15QknxXbG1iM3IaUawoo7caMMRWM7mGf2fgHcDO-ZNNRqL_SM6x8qiFP0QInS6NfBBuFe5-baGY4MLv72XfNBfs_UfsrDeSkchj-i2vdm3jPzyOuzykitTyl2zhCSTvMnoh-qnJ4Ty-hDBphOrtslvVmPwIPJo36RXvQ8kC1rcVzOhBClddhgs07MD5sVEWEOItcogyMwaJCF2aRBX3YC7pp68GmquA" />
</div>
</header>
{/* Profile Content Canvas */}
<div className="flex-1 overflow-y-auto p-4 md:p-gutter">
<div className="max-w-[1120px] mx-auto w-full flex flex-col gap-gutter">
{/* Profile Header Card (Glassmorphism inspired) */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden relative group">
<div className="h-32 bg-gradient-to-r from-primary-container to-secondary-container opacity-20 absolute w-full top-0"></div>
<div className="p-gutter relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 mt-8">
<div className="relative">
<img className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-surface-container-lowest shadow-sm" data-alt="A professional portrait of a senior backend engineer, male, late 20s, casual tech attire, smiling slightly, bright well-lit modern office background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsr-mV1mbNoSqDy29UHbfhGYYFuBiRBmofeJOPUHcq93Jjs2GPsd8LxXlGI3ZT6TR2r-mIhEfb8b0sD7VlfwtYE1omxl-jAj9HHX7JfRCuAhLCT1tvsNDAaOQMHH7SDwpbSp6MIiXk5RnEQFWHHcu8KNnMoG4M5x73XxJ1FdDroLCK3LhCnYXdgA4tECJ2wF6DMbJ9OoHFfRenuGAmjFXApqqG025j52J9jilMQ3TCP_A69EVfZIoxBg" />
<div className="absolute bottom-1 right-1 w-5 h-5 bg-secondary rounded-full border-2 border-surface-container-lowest" title="Active"></div>
</div>
<div className="flex-1">
<div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
<h2 className="font-headline-lg text-headline-lg text-on-background">Alex Mercer</h2>
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container">
                                    Active
                                </span>
</div>
<p className="font-title-md text-title-md text-on-surface-variant mb-1">Senior Backend Engineer</p>
<div className="flex flex-wrap items-center gap-4 text-body-sm text-on-surface-variant">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">domain</span> Engineering Dept</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">location_on</span> New York Office</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">mail</span> alex.m@dayflow.com</span>
</div>
</div>
<div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
<button className="flex-1 md:flex-none px-4 py-2 bg-primary text-on-primary rounded-[10px] font-label-sm hover:bg-surface-tint transition-colors flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">edit</span> Edit Profile
                            </button>
<button className="px-4 py-2 bg-surface-container border border-outline-variant text-on-surface rounded-[10px] hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[18px]">more_horiz</span>
</button>
</div>
</div>
{/* Navigation Tabs within Card */}
<div className="px-gutter border-t border-outline-variant bg-surface-container-lowest">
<nav className="flex gap-6 overflow-x-auto">
<a className="py-4 text-primary border-b-2 border-primary font-label-sm font-bold whitespace-nowrap" href="#">Personal Details</a>
<a className="py-4 text-on-surface-variant hover:text-primary transition-colors font-label-sm whitespace-nowrap" href="#">Job Info</a>
<a className="py-4 text-on-surface-variant hover:text-primary transition-colors font-label-sm whitespace-nowrap flex items-center gap-1" href="#">Salary Info <span className="material-symbols-outlined text-[14px]">lock</span></a>
<a className="py-4 text-on-surface-variant hover:text-primary transition-colors font-label-sm whitespace-nowrap" href="#">Documents</a>
</nav>
</div>
</div>
{/* Bento Grid Layout for Details */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
{/* Main Detail Column */}
<div className="lg:col-span-2 flex flex-col gap-gutter">
{/* Basic Info Card */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<h3 className="font-title-md text-title-md text-on-background mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">person</span> Basic Information
                            </h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
<div>
<p className="text-label-sm font-label-sm text-outline mb-1 uppercase">Full Name</p>
<p className="text-body-md text-on-background">Alexander James Mercer</p>
</div>
<div>
<p className="text-label-sm font-label-sm text-outline mb-1 uppercase">Date of Birth</p>
<p className="text-body-md text-on-background">Oct 14, 1992</p>
</div>
<div>
<p className="text-label-sm font-label-sm text-outline mb-1 uppercase">Nationality</p>
<p className="text-body-md text-on-background">American</p>
</div>
<div>
<p className="text-label-sm font-label-sm text-outline mb-1 uppercase">Gender</p>
<p className="text-body-md text-on-background">Male</p>
</div>
<div>
<p className="text-label-sm font-label-sm text-outline mb-1 uppercase">Marital Status</p>
<p className="text-body-md text-on-background">Single</p>
</div>
</div>
</div>
{/* Contact & Address Card */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow relative">
<h3 className="font-title-md text-title-md text-on-background mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">contact_mail</span> Contact Details
                            </h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-8">
<div>
<p className="text-label-sm font-label-sm text-outline mb-1 uppercase">Work Email</p>
<p className="text-body-md text-on-background">alex.m@dayflow.com</p>
</div>
<div>
<p className="text-label-sm font-label-sm text-outline mb-1 uppercase">Personal Email</p>
<p className="text-body-md text-on-background">alex.mercer.dev@gmail.com</p>
</div>
<div>
<p className="text-label-sm font-label-sm text-outline mb-1 uppercase">Phone Number</p>
<p className="text-body-md text-on-background">+1 (555) 019-2834</p>
</div>
</div>
<div className="border-t border-outline-variant pt-6">
<p className="text-label-sm font-label-sm text-outline mb-2 uppercase">Current Address</p>
<p className="text-body-md text-on-background">
                                    1245 Innovation Drive, Apt 4B<br />
                                    Tech District, NY 10001<br />
                                    United States
                                </p>
</div>
</div>
</div>
{/* Sidebar Column */}
<div className="flex flex-col gap-gutter">
{/* Reporting To Card */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-16 h-16 bg-tertiary-fixed rounded-full opacity-50 blur-xl"></div>
<h3 className="font-title-md text-title-md text-on-background mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">account_tree</span> Reporting To
                            </h3>
<div className="flex items-center gap-4 p-3 rounded-lg border border-outline-variant bg-[#FAF8FA] hover:border-primary-container transition-colors cursor-pointer">
<img className="w-12 h-12 rounded-full object-cover" data-alt="Professional portrait of a female engineering director in her 40s, wearing business casual attire, confident expression, soft modern office lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7Z4o6WkzZfnlDbrA5aiL9jouF0_0DzRiQ8w0qI1oyZDEgZ4gWK-CUDdgje0qmCTU5cetAJBFwuVPT9TkH3qJjGglkWuJLWqIeeVVnMqhL5MnhagRL7d-4sfJ_duBigc-MDnmEk-0cdV3OdkFvj8DyXgq-3AC6iGKFnrBD7OZFhNvP-kRrMbhhav9HgXpJ-u2arnlYitPZ6UJjSzEsCxrbprxAxf6CDsCaES13-aoEnfcWq5b7A9hmBg" />
<div>
<p className="font-title-md text-title-md text-on-background text-sm">Sarah Jenkins</p>
<p className="text-label-sm font-label-sm text-on-surface-variant">VP of Engineering</p>
</div>
<span className="material-symbols-outlined ml-auto text-outline">chevron_right</span>
</div>
</div>
{/* Quick Stats / Onboarding Note */}
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 relative">
<div className="absolute left-0 top-0 w-1 h-full bg-secondary rounded-l-xl"></div>
<h3 className="font-title-md text-title-md text-on-background mb-4">Milestone Highlight</h3>
<div className="p-4 bg-surface-container-low rounded-lg relative">
<p className="font-accent-marker text-accent-marker text-primary text-xl relative z-10 leading-snug">
                                    3 Year Work Anniversary coming up in October! 🎉
                                </p>
<div className="absolute left-2 bottom-2 w-3/4 h-3 bg-secondary-fixed opacity-40 -rotate-2"></div>
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

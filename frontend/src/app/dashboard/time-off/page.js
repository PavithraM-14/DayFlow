export default function Page() {
  return (
    <div className="bg-background text-on-surface flex min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `body { font-family: 'Inter', sans-serif; }` }} />
      
{/*  SideNavBar  */}
<nav className="fixed left-0 top-0 h-full w-[240px] bg-surface-container dark:bg-surface-container border-r border-outline-variant dark:border-outline-variant flex flex-col p-md z-50">
<div className="mb-xl flex items-center gap-sm px-xs">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-headline-md">
                D
            </div>
<div>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary">Dayflow</h1>
<p className="font-label-sm text-label-sm text-on-surface-variant">Enterprise HRMS</p>
</div>
</div>
<ul className="flex flex-col gap-base mt-md">
<li>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 font-body-md text-body-md" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                    Dashboard
                </a>
</li>
<li>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 font-body-md text-body-md" href="#">
<span className="material-symbols-outlined" data-icon="group">group</span>
                    Employees
                </a>
</li>
<li>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 font-body-md text-body-md" href="#">
<span className="material-symbols-outlined" data-icon="event_available">event_available</span>
                    Attendance
                </a>
</li>
<li>
<a className="flex items-center gap-sm px-md py-sm rounded-lg bg-secondary-container dark:bg-secondary-container text-on-secondary-container font-bold font-body-md text-body-md" href="#">
<span className="material-symbols-outlined" data-icon="event_busy">event_busy</span>
                    Time Off
                </a>
</li>
<li>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 font-body-md text-body-md" href="#">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
                    Payroll
                </a>
</li>
<li>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 font-body-md text-body-md" href="#">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
                    Reports
                </a>
</li>
<li className="mt-auto">
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 font-body-md text-body-md" href="#">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
                    My Profile
                </a>
</li>
<li>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 font-body-md text-body-md" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
                    Settings
                </a>
</li>
</ul>
</nav>
{/*  Main Content Area  */}
<div className="flex-1 ml-[240px] flex flex-col min-h-screen overflow-hidden">
{/*  TopAppBar  */}
<header className="docked full-width top-0 sticky z-40 bg-surface dark:bg-surface border-b border-outline-variant dark:border-outline-variant flex justify-between items-center h-16 px-margin-desktop">
<div className="flex items-center gap-md">
<div className="relative focus-within:ring-2 focus-within:ring-primary rounded-full bg-surface-container-high px-sm py-xs flex items-center">
<span className="material-symbols-outlined text-on-surface-variant mr-xs">search</span>
<input className="bg-transparent border-none outline-none text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant w-64" placeholder="Search employees..." type="text"/>
</div>
</div>
<div className="flex items-center gap-md">
<button className="p-xs text-on-surface-variant hover:text-primary transition-colors duration-200 rounded-full hover:bg-surface-container-high">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="p-xs text-on-surface-variant hover:text-primary transition-colors duration-200 rounded-full hover:bg-surface-container-high">
<span className="material-symbols-outlined" data-icon="light_mode">light_mode</span>
</button>
<img alt="User Avatar" className="w-8 h-8 rounded-full object-cover border border-outline-variant" data-alt="A professional headshot of an HR administrator, modern corporate setting, soft lighting, professional attire, engaging smile, dark mode UI compatible portrait." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCfxCaKkfns0CvIoqT0Bi3BbUze62TeeaIibZ9Pg1FSnL1N7zOd7JueazEYt4wP1jTD4giIoOJ0d2IdmZn-Zuw5YllhEBzbGflwK9dW7WR0bktUuWHLjIavMFayTfirzVmJ-K9vUbo1o3esIDreAvfr_1R4QQB83rDnjieEq55IgqVw77aMu4oR206a_UfB6XcvevmeO9t8bE7zQuCjCdDE-B9fzDiuypI3BZGT6YXy3c_57W_xuvVAg"/>
</div>
</header>
{/*  Canvas  */}
<main className="flex-1 p-margin-desktop overflow-y-auto">
<div className="mb-xl flex justify-between items-end">
<div>
<h2 className="font-display-lg text-display-lg text-on-surface mb-xs">Leave Management</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Review and manage employee time-off requests.</p>
</div>
<button className="bg-primary text-on-primary font-body-md text-body-md px-md py-sm rounded-lg hover:bg-primary-fixed transition-colors flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">add</span>
                    New Request
                </button>
</div>
{/*  Bento Grid Layout  */}
<div className="grid grid-cols-12 gap-lg">
{/*  Balance Overview (Left Column)  */}
<div className="col-span-12 xl:col-span-4 flex flex-col gap-lg">
<div className="bg-surface-container rounded-xl p-lg border border-outline-variant">
<h3 className="font-headline-md text-headline-md text-on-surface mb-md">Company Leave Overview</h3>
<div className="space-y-md">
{/*  Metric 1  */}
<div className="p-md bg-surface-container-high rounded-lg border border-outline-variant hover:border-primary/30 transition-colors">
<div className="flex justify-between items-center mb-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Annual Leave Pool</span>
<span className="material-symbols-outlined text-primary">flight_takeoff</span>
</div>
<div className="flex items-end gap-sm">
<span className="font-display-lg-mobile text-display-lg-mobile text-on-surface">1,240</span>
<span className="font-body-md text-body-md text-on-surface-variant pb-1">days remaining</span>
</div>
<div className="w-full bg-surface mt-sm rounded-full h-1.5">
<div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
</div>
</div>
{/*  Metric 2  */}
<div className="p-md bg-surface-container-high rounded-lg border border-outline-variant hover:border-primary/30 transition-colors">
<div className="flex justify-between items-center mb-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Sick Leave Usage</span>
<span className="material-symbols-outlined text-status-amber">medical_services</span>
</div>
<div className="flex items-end gap-sm">
<span className="font-display-lg-mobile text-display-lg-mobile text-on-surface">342</span>
<span className="font-body-md text-body-md text-on-surface-variant pb-1">days used</span>
</div>
<div className="w-full bg-surface mt-sm rounded-full h-1.5">
<div className="bg-status-amber h-1.5 rounded-full" style={{ width: '25%' }}></div>
</div>
</div>
{/*  Metric 3  */}
<div className="p-md bg-surface-container-high rounded-lg border border-outline-variant hover:border-primary/30 transition-colors">
<div className="flex justify-between items-center mb-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Pending Approvals</span>
<span className="material-symbols-outlined text-status-blue">pending_actions</span>
</div>
<div className="flex items-end gap-sm">
<span className="font-display-lg-mobile text-display-lg-mobile text-on-surface">12</span>
<span className="font-body-md text-body-md text-on-surface-variant pb-1">requests</span>
</div>
</div>
</div>
</div>
</div>
{/*  Pending Requests List (Right Column)  */}
<div className="col-span-12 xl:col-span-8">
<div className="bg-surface-container rounded-xl p-lg border border-outline-variant h-full flex flex-col">
<div className="flex justify-between items-center mb-lg">
<h3 className="font-headline-md text-headline-md text-on-surface">Pending Requests</h3>
<button className="text-primary hover:text-primary-fixed-dim font-label-sm text-label-sm transition-colors">View All</button>
</div>
<div className="flex-1 overflow-auto pr-sm -mr-sm space-y-sm">
{/*  Request Card 1  */}
<div className="bg-surface-container-high rounded-lg p-md border border-outline-variant hover:border-primary/20 transition-all group">
<div className="flex justify-between items-start gap-md">
<div className="flex items-center gap-md">
<img className="w-12 h-12 rounded-full object-cover border border-outline-variant" data-alt="A corporate portrait of a female software engineer, professional lighting, modern office background, dark mode UI compatible portrait avatar." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0OMqCj5MUuZOettjQkOxysDiX06TIXqnoN3FASOLFhzd54JdC0t7GcVGKIhtmn-NiZ4yw81rSEPjavRQgZcY1VfmUpz6IV35U361d7d329l0yi_0VEgaSrcDaBIyHDQNIqN2UDJnk01P1ehy2k-LnKfzHW8XC3xmCEbHwT6lsKklAeL3jJ25EHUMmLVsAQu6KGHRXavtLCVVK3eHz9ogmd4M_z7KF10aEyKu88pXBY7xNSvsDLnzZPQ"/>
<div>
<h4 className="font-body-lg text-body-lg text-on-surface font-semibold">Sarah Jenkins</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Senior Developer • Engineering</p>
</div>
</div>
<div className="px-sm py-1 bg-status-blue/10 text-status-blue rounded font-label-sm text-label-sm border border-status-blue/20">
                                        Annual Leave
                                    </div>
</div>
<div className="mt-md grid grid-cols-2 gap-md">
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Duration</p>
<p className="font-body-md text-body-md text-on-surface flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">calendar_today</span>
                                            Oct 12 - Oct 15 (4 days)
                                        </p>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Reason</p>
<p className="font-body-md text-body-md text-on-surface truncate">Family vacation to the mountains.</p>
</div>
</div>
<div className="mt-md flex justify-end gap-sm border-t border-outline-variant pt-md">
<button className="px-md py-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-bright font-label-sm text-label-sm transition-colors">Reject</button>
<button className="px-md py-sm rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-dim font-label-sm text-label-sm transition-colors">Approve</button>
</div>
</div>
{/*  Request Card 2  */}
<div className="bg-surface-container-high rounded-lg p-md border border-outline-variant hover:border-primary/20 transition-all group">
<div className="flex justify-between items-start gap-md">
<div className="flex items-center gap-md">
<img className="w-12 h-12 rounded-full object-cover border border-outline-variant" data-alt="A corporate portrait of a male marketing manager, professional lighting, warm ambient background, dark mode UI compatible portrait avatar." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5fIL2kbGrPnq65cyqZBEEHRXEeBx6ZB8YhEcXvTTKmXKDaMmdUfgknpbkJ7QdjgOtQ2Y3Iq3P56degu9IErfnaemAOhy1zTM2FhgKbGGbAZJDcFARkcQ6L-ahKBChZtn01ROnbHfI2uekQIx75KeeXTUJeD2YX9hOH__OnIViX_yTfqdEWbQwkj5imMg-aT78g75dTx1y1A8eKKjsQ37Xd-3nLJ3pGtzt82ezEM7NgeE-tmyHQ0PzDA"/>
<div>
<h4 className="font-body-lg text-body-lg text-on-surface font-semibold">David Chen</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Marketing Lead • Marketing</p>
</div>
</div>
<div className="px-sm py-1 bg-status-amber/10 text-status-amber rounded font-label-sm text-label-sm border border-status-amber/20">
                                        Sick Leave
                                    </div>
</div>
<div className="mt-md grid grid-cols-2 gap-md">
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Duration</p>
<p className="font-body-md text-body-md text-on-surface flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">calendar_today</span>
                                            Oct 05 (1 day)
                                        </p>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Reason</p>
<p className="font-body-md text-body-md text-on-surface truncate">Doctor's appointment and recovery.</p>
</div>
</div>
<div className="mt-md flex justify-end gap-sm border-t border-outline-variant pt-md">
<button className="px-md py-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-bright font-label-sm text-label-sm transition-colors">Reject</button>
<button className="px-md py-sm rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-dim font-label-sm text-label-sm transition-colors">Approve</button>
</div>
</div>
{/*  Request Card 3  */}
<div className="bg-surface-container-high rounded-lg p-md border border-outline-variant hover:border-primary/20 transition-all group">
<div className="flex justify-between items-start gap-md">
<div className="flex items-center gap-md">
<img className="w-12 h-12 rounded-full object-cover border border-outline-variant" data-alt="A corporate portrait of a female financial analyst, professional lighting, abstract subtle background, dark mode UI compatible portrait avatar." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfBJL-fbp0J56qGmopo_qhsaZrTBZqLSlsQbnUC5mfxwO_WI3drm7gvcQo_yIb5da64A6p3m2gFB6Nn2J6Z7g2BNp_i17SLAZOZf6SCp8wK96R41HY0S6__-F8PriXwS63g0DHJy3Gp-_Uj5XCA6R4S_9-v-p_W9tVABBE47geZ82X_0y4GGw69LWtGSXOGqVmFmR3Z8Izd2GP3l0F8FigOCq0E9Ngff1H5bRqgn7ij1cO0MEkR_Q5Iw"/>
<div>
<h4 className="font-body-lg text-body-lg text-on-surface font-semibold">Emily Davis</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Financial Analyst • Finance</p>
</div>
</div>
<div className="px-sm py-1 bg-tertiary/10 text-tertiary rounded font-label-sm text-label-sm border border-tertiary/20">
                                        Casual Leave
                                    </div>
</div>
<div className="mt-md grid grid-cols-2 gap-md">
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Duration</p>
<p className="font-body-md text-body-md text-on-surface flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">calendar_today</span>
                                            Oct 20 - Oct 21 (2 days)
                                        </p>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Reason</p>
<p className="font-body-md text-body-md text-on-surface truncate">Personal errands and house moving.</p>
</div>
</div>
<div className="mt-md flex justify-end gap-sm border-t border-outline-variant pt-md">
<button className="px-md py-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-bright font-label-sm text-label-sm transition-colors">Reject</button>
<button className="px-md py-sm rounded-lg bg-primary text-on-primary hover:bg-primary-fixed-dim font-label-sm text-label-sm transition-colors">Approve</button>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
</div>

    </div>
  );
}
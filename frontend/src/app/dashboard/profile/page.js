export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md h-screen flex overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `` }} />
      
{/*  SideNavBar  */}
<nav className="bg-surface-container dark:bg-surface-container font-body-md text-body-md fixed left-0 top-0 h-full w-[240px] border-r border-outline-variant dark:border-outline-variant transition-all duration-200 ease-in-out flex flex-col h-full p-md hidden md:flex z-50">
<div className="flex items-center gap-xs mb-xl">
<span className="material-symbols-outlined text-primary text-3xl">corporate_fare</span>
<span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary">Dayflow</span>
</div>
<ul className="flex flex-col gap-xs flex-1">
<li>
<a className="flex items-center gap-sm px-sm py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-xs bg-secondary-container dark:bg-secondary-container text-on-secondary-container font-bold rounded-lg transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="group" data-weight="fill">group</span>
<span>Employees</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="event_available">event_available</span>
<span>Attendance</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="event_busy">event_busy</span>
<span>Time Off</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
<span>Payroll</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span>Reports</span>
</a>
</li>
</ul>
<div className="mt-auto flex flex-col gap-xs">
<a className="flex items-center gap-sm px-sm py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span>My Profile</span>
</a>
<a className="flex items-center gap-sm px-sm py-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span>Settings</span>
</a>
</div>
</nav>
{/*  Main Content Wrapper  */}
<div className="flex-1 flex flex-col md:ml-[240px] w-full min-h-screen relative overflow-y-auto overflow-x-hidden">
{/*  TopAppBar  */}
<header className="bg-surface dark:bg-surface font-body-md text-body-md docked full-width top-0 sticky z-40 border-b border-outline-variant dark:border-outline-variant flex justify-between items-center h-16 px-margin-desktop focus-within:ring-2 focus-within:ring-primary">
{/*  Mobile Menu Toggle (Visible only on small screens)  */}
<button className="md:hidden text-on-surface-variant hover:text-primary p-2">
<span className="material-symbols-outlined">menu</span>
</button>
{/*  Search Bar  */}
<div className="flex-1 max-w-md hidden md:flex items-center">
<div className="relative w-full">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 pl-10 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" placeholder="Search employees, documents..." type="text"/>
</div>
</div>
<div className="md:hidden font-headline-md text-headline-md font-bold text-primary dark:text-primary">
                Dayflow
            </div>
{/*  Actions  */}
<div className="flex items-center gap-lg">
<button className="text-on-surface-variant hover:text-primary transition-colors duration-200">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="text-on-surface-variant hover:text-primary transition-colors duration-200">
<span className="material-symbols-outlined" data-icon="light_mode">light_mode</span>
</button>
<div className="h-8 w-8 rounded-full bg-secondary-container overflow-hidden border border-outline-variant flex items-center justify-center cursor-pointer">
<span className="font-label-sm text-label-sm font-bold text-on-secondary-container">AD</span>
</div>
</div>
</header>
{/*  Page Content  */}
<main className="flex-1 p-margin-mobile md:p-margin-desktop w-full max-w-[1440px] mx-auto">
{/*  Breadcrumbs & Actions  */}
<div className="flex justify-between items-center mb-lg">
<div className="flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm">
<a className="hover:text-primary" href="#">Employees</a>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
<span className="text-on-surface">Alex Mercer</span>
</div>
<div className="flex gap-sm">
<button className="px-md py-2 border border-outline-variant rounded-lg text-primary font-label-sm text-label-sm hover:bg-surface-container-high transition-colors flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">edit</span>
                        Edit Profile
                    </button>
<button className="px-md py-2 bg-primary rounded-lg text-on-primary font-label-sm text-label-sm hover:opacity-90 transition-opacity flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">more_horiz</span>
                        Actions
                    </button>
</div>
</div>
{/*  Profile Header Card (Bento Style)  */}
<div className="bg-surface-container rounded-xl border border-outline-variant p-lg mb-lg flex flex-col md:flex-row gap-lg items-start md:items-center relative overflow-hidden">
{/*  Abstract Background Decoration  */}
<div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
<div className="relative">
<img className="w-32 h-32 rounded-full object-cover border-2 border-primary" data-alt="Professional headshot of a young male software engineer in his late 20s, short dark hair, wearing a casual dark grey button-down shirt. The lighting is studio quality, soft and flattering, with a dark slate background that fits a corporate dark mode aesthetic. He is smiling slightly, looking approachable but professional." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6MrBYQX6LNqia3_BEJOdsLpuu4ONvEGjk3HgrmWbS80_HDJZrY8H-_R3v7sx90r8Mvt-C74AjnxMuSIXEghi5GgK9xihUAznTEQgOGOC0yeeHe1DwmLKOm7KhYZWIVw6qXiICyneDtit0zrwftZHWg1tNIHgcTuWXao0bsxrGwQVxBrI8zYVHRFfiTvejc5EekyGYiiFoUHWlcoFh7oSzsyOz6E5oQh0F4bUoTR_f_rhWZDB0Cn6_OQ"/>
<div className="absolute bottom-0 right-0 w-6 h-6 bg-status-green rounded-full border-2 border-surface-container flex items-center justify-center" title="Active"></div>
</div>
<div className="flex-1">
<div className="flex items-center gap-sm mb-xs">
<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface m-0">Alex Mercer</h1>
<span className="px-2 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">Full-Time</span>
</div>
<p className="font-headline-md text-headline-md text-on-surface-variant mb-md">Senior Frontend Developer • Engineering Dept.</p>
<div className="flex flex-wrap gap-md md:gap-xl">
<div className="flex items-center gap-xs text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]">location_on</span>
<span className="font-body-md text-body-md">San Francisco, CA</span>
</div>
<div className="flex items-center gap-xs text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]">mail</span>
<span className="font-body-md text-body-md">a.mercer@dayflow.io</span>
</div>
<div className="flex items-center gap-xs text-on-surface-variant">
<span className="material-symbols-outlined text-[18px]">schedule</span>
<span className="font-body-md text-body-md">Local Time: 10:42 AM (PST)</span>
</div>
</div>
</div>
</div>
{/*  Custom Tabs Navigation  */}
<div className="flex border-b border-outline-variant mb-lg overflow-x-auto no-scrollbar">
<button className="px-md py-sm text-primary border-b-2 border-primary font-label-sm text-label-sm whitespace-nowrap">Personal Info</button>
<button className="px-md py-sm text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm whitespace-nowrap transition-colors">Job Details</button>
<button className="px-md py-sm text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm whitespace-nowrap transition-colors">Salary &amp; Benefits</button>
<button className="px-md py-sm text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm whitespace-nowrap transition-colors">Performance</button>
<button className="px-md py-sm text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm whitespace-nowrap transition-colors">Assets</button>
</div>
{/*  Bento Grid Content Area  */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
{/*  Left Column (Wider)  */}
<div className="md:col-span-8 flex flex-col gap-lg">
{/*  Basic Information Card  */}
<div className="bg-surface-container rounded-xl border border-outline-variant p-lg">
<h2 className="font-headline-md text-headline-md text-on-surface mb-lg flex items-center gap-xs">
<span className="material-symbols-outlined text-primary">person</span>
                            Basic Information
                        </h2>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-md gap-x-lg">
<div>
<label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Employee ID</label>
<div className="font-data-mono text-data-mono text-on-surface">EMP-2023-084</div>
</div>
<div>
<label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Date of Hire</label>
<div className="font-body-md text-body-md text-on-surface">Oct 15, 2021 (2y 4m)</div>
</div>
<div>
<label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Phone Number</label>
<div className="font-body-md text-body-md text-on-surface">+1 (555) 019-2834</div>
</div>
<div>
<label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Date of Birth</label>
<div className="font-body-md text-body-md text-on-surface">Mar 12, 1994</div>
</div>
<div className="sm:col-span-2 mt-sm pt-sm border-t border-outline-variant">
<label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Home Address</label>
<div className="font-body-md text-body-md text-on-surface">1248 Tech Boulevard, Apt 4B<br/>San Francisco, CA 94107</div>
</div>
</div>
</div>
{/*  Skills & Tags (Glassmorphism inspired dark card)  */}
<div className="bg-surface-container-high rounded-xl border border-outline-variant p-lg">
<h2 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-xs">
<span className="material-symbols-outlined text-tertiary">code</span>
                            Skills &amp; Expertise
                        </h2>
<div className="flex flex-wrap gap-sm">
<span className="px-3 py-1 bg-surface-variant border border-outline-variant rounded-full text-on-surface font-label-sm text-label-sm">React.js</span>
<span className="px-3 py-1 bg-surface-variant border border-outline-variant rounded-full text-on-surface font-label-sm text-label-sm">TypeScript</span>
<span className="px-3 py-1 bg-surface-variant border border-outline-variant rounded-full text-on-surface font-label-sm text-label-sm">Tailwind CSS</span>
<span className="px-3 py-1 bg-surface-variant border border-outline-variant rounded-full text-on-surface font-label-sm text-label-sm">UI/UX Design</span>
<span className="px-3 py-1 bg-surface-variant border border-outline-variant rounded-full text-on-surface font-label-sm text-label-sm">Node.js</span>
</div>
</div>
</div>
{/*  Right Column (Narrower)  */}
<div className="md:col-span-4 flex flex-col gap-lg">
{/*  Reporting Structure  */}
<div className="bg-surface-container rounded-xl border border-outline-variant p-lg">
<h2 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-xs">
<span className="material-symbols-outlined text-secondary">account_tree</span>
                            Reporting To
                        </h2>
<div className="flex items-center gap-md p-sm rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent hover:border-outline-variant">
<img className="w-12 h-12 rounded-full object-cover" data-alt="Headshot of a middle-aged woman with glasses and shoulder-length brown hair, wearing a navy blue blazer. She looks authoritative yet friendly. The background is a blurred office setting with cool, dark tones suitable for a professional HR interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB52rsK4ejSZuRGVREpF2lNchYmo8a-WKK4oSK8KnXYOwTdanrsxg6e795auTdP7zBs2Ub0a094C_0OCmkpJAo7VwfBEvsUbeWTNEX57dAfYcreDld-gV2xmS3bK8U4y4ImfKirBGIOJdaEpyU5NMvlTicdb7_sEwyogLr0IHBXpMWdZjnDeWSdMayeuZBDD6XNXPXI6aPbM4AREYdzn-lsRsrJeRr0bm2Srxn80K6Yj4S6zxoa0PS_Ag"/>
<div>
<div className="font-body-md text-body-md font-semibold text-on-surface">Sarah Jenkins</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">VP of Engineering</div>
</div>
<span className="material-symbols-outlined text-on-surface-variant ml-auto">open_in_new</span>
</div>
</div>
{/*  Key Documents (List)  */}
<div className="bg-surface-container rounded-xl border border-outline-variant p-lg">
<div className="flex justify-between items-center mb-md">
<h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-xs">
<span className="material-symbols-outlined text-on-surface-variant">folder</span>
                                Documents
                            </h2>
<button className="text-primary hover:text-primary-fixed-dim transition-colors"><span className="material-symbols-outlined">add</span></button>
</div>
<ul className="flex flex-col gap-2">
<li className="flex items-center justify-between p-2 rounded hover:bg-surface-container-high transition-colors group">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-error">picture_as_pdf</span>
<span className="font-body-md text-body-md text-on-surface">Offer_Letter_Signed.pdf</span>
</div>
<button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[18px]">download</span></button>
</li>
<li className="flex items-center justify-between p-2 rounded hover:bg-surface-container-high transition-colors group">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-error">picture_as_pdf</span>
<span className="font-body-md text-body-md text-on-surface">W4_Form_2023.pdf</span>
</div>
<button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[18px]">download</span></button>
</li>
<li className="flex items-center justify-between p-2 rounded hover:bg-surface-container-high transition-colors group">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-status-blue">description</span>
<span className="font-body-md text-body-md text-on-surface">Perf_Review_Q4.docx</span>
</div>
<button className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[18px]">download</span></button>
</li>
</ul>
</div>
</div>
</div>
</main>
</div>

    </div>
  );
}
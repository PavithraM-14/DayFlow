export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body-md m-0 p-0 overflow-x-hidden min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      <style dangerouslySetInnerHTML={{ __html: `` }} />
      
{/*  SideNavBar  */}
<nav className="hidden md:flex bg-surface-container dark:bg-surface-container text-primary dark:text-primary font-body-md text-body-md fixed left-0 top-0 h-full w-[240px] border-r border-outline-variant dark:border-outline-variant transition-all duration-200 ease-in-out flex flex-col p-md z-50 shadow-none">
<div className="flex items-center gap-sm mb-xl mt-sm px-sm">
<div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
<img alt="Organization Logo" className="w-full h-full object-cover" data-alt="A minimalist, modern corporate logo featuring a sleek geometric design. The logo uses a palette of deep violet and bright silver, representing innovation and reliability in a professional HR context. Soft, diffuse lighting highlights the clean lines of the vector-style graphic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQasb2e0wO7he3AvAfonCPCK14aimOd23Iakzes5j15k43gH1LNSPE-bisT9tBiaaoa93FnGKB6zxk1q87KEgS5V7tDVnAsYFwKsIxQiCkZcQmUsdfeP0EclnIKWNwTJcDQLxNI9q-ZzeeawDKF4rF1CLepSIydOq6fpmRc9VgvQINv9EYG-m3sR3TmuvN2N5biBD2RtFBF5xDhQTEGcV7sM2VtizsECI0ieeV81PDDn-o3QdysfTUSQ"/>
</div>
<div>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary m-0 leading-tight">Dayflow</h1>
<p className="font-label-sm text-label-sm text-on-surface-variant m-0">Enterprise HRMS</p>
</div>
</div>
<ul className="flex flex-col gap-xs flex-grow list-none p-0 m-0">
<li>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">dashboard</span>
<span>Dashboard</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">group</span>
<span>Employees</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">event_available</span>
<span>Attendance</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">event_busy</span>
<span>Time Off</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-sm bg-secondary-container dark:bg-secondary-container text-on-secondary-container font-bold rounded-lg transition-colors duration-200" href="#">
<span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: '\'FILL\' 1' }}>payments</span>
<span>Payroll</span>
</a>
</li>
<li>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">analytics</span>
<span>Reports</span>
</a>
</li>
</ul>
<div className="mt-auto flex flex-col gap-xs list-none p-0">
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">account_circle</span>
<span>My Profile</span>
</a>
<a className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors duration-200 group" href="#">
<span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">settings</span>
<span>Settings</span>
</a>
</div>
</nav>
{/*  Main Content Area  */}
<div className="flex-grow flex flex-col min-h-screen w-full md:ml-[240px]">
{/*  TopAppBar  */}
<header className="bg-surface dark:bg-surface text-primary dark:text-primary font-body-md text-body-md docked full-width top-0 sticky z-40 border-b border-outline-variant dark:border-outline-variant flex justify-between items-center h-16 px-margin-desktop shadow-none">
<div className="flex-1 flex items-center">
{/*  Search Bar Placeholder to match search_bar: "on_left" intent, though not explicitly requested as an interactive element in prompt, it's part of the component structure  */}
<div className="relative w-full max-w-md hidden md:flex items-center">
<span className="material-symbols-outlined absolute left-sm text-on-surface-variant text-[20px]">search</span>
<input className="w-full bg-surface-container-low border border-outline-variant text-on-surface font-body-md text-body-md rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant/50" placeholder="Search employees, payroll runs..." type="text"/>
</div>
</div>
<div className="flex items-center gap-md">
<button className="text-on-surface-variant hover:text-primary transition-colors duration-200 relative p-2 rounded-full hover:bg-surface-container-high focus-within:ring-2 focus-within:ring-primary outline-none">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
</button>
<button className="text-on-surface-variant hover:text-primary transition-colors duration-200 p-2 rounded-full hover:bg-surface-container-high focus-within:ring-2 focus-within:ring-primary outline-none hidden md:block">
<span className="material-symbols-outlined">light_mode</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-sm shrink-0 cursor-pointer hover:border-primary transition-colors">
<img alt="User Avatar" className="w-full h-full object-cover" data-alt="A professional headshot of a smiling HR manager in a modern office setting. Soft, natural lighting from a nearby window illuminates their face. They are wearing smart-casual corporate attire in muted navy tones. The background is slightly blurred showing subtle office plants and glass partitions, conveying a welcoming yet authoritative corporate environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWx7XTN62sUORcFKdy7e6vAwBMha6u5FVlud7LUoevPYyiarF_8pAYf50XmS-ccDoFJL7LVbVAifqsRHTjESKhejW25fsyK4cYHU_QEQyRIYpKCDwN4WimkbUNIcNoAfIyKwsOq1XFSANd7Rm9gqBxj3Iaf9BbWICInkM2K0YRiasrPWc0kyXwU5ab5V02a_Qj_eAjAYYLwOf9Vjv7ViWZmUpdADj_3gWrF63z1-ua65eUzURw4dvQUQ"/>
</div>
</div>
</header>
{/*  Page Canvas  */}
<main className="flex-grow p-margin-mobile md:p-margin-desktop bg-background overflow-y-auto">
{/*  Page Header  */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
<div>
<h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface m-0 mb-xs">Payroll Processing</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant m-0">Review and execute payroll for October 2023.</p>
</div>
<div className="flex flex-wrap items-center gap-sm">
<button className="flex items-center gap-xs px-md py-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high hover:border-primary/50 transition-all duration-200 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[18px]">download</span>
                        Download All Payslips
                    </button>
<button className="flex items-center gap-xs px-md py-2 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-all duration-200 font-label-sm text-label-sm font-bold shadow-[0_4px_12px_rgba(208,188,255,0.2)]">
<span className="material-symbols-outlined text-[18px]">play_arrow</span>
                        Process Payroll
                    </button>
</div>
</div>
{/*  Bento Grid Layout  */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-lg">
{/*  Summary Cards (Top Row)  */}
<div className="xl:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-lg">
{/*  Total Cost  */}
<div className="bg-surface-container p-lg rounded-xl border border-surface-variant flex flex-col justify-between relative overflow-hidden group hover:border-primary/30 transition-colors">
<div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-container/10 rounded-full blur-2xl group-hover:bg-primary-container/20 transition-all"></div>
<div className="flex items-start justify-between mb-md relative z-10">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Payroll Cost</span>
<span className="material-symbols-outlined text-primary bg-primary/10 p-xs rounded-md">account_balance_wallet</span>
</div>
<div className="relative z-10">
<span className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold">$245,890.00</span>
<div className="flex items-center gap-xs mt-xs text-status-green font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+2.4% vs last month</span>
</div>
</div>
</div>
{/*  Total Employees  */}
<div className="bg-surface-container p-lg rounded-xl border border-surface-variant flex flex-col justify-between hover:border-primary/30 transition-colors">
<div className="flex items-start justify-between mb-md">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Employees Processed</span>
<span className="material-symbols-outlined text-tertiary bg-tertiary/10 p-xs rounded-md">groups</span>
</div>
<div>
<span className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold">142</span>
<span className="text-on-surface-variant font-label-sm text-label-sm ml-xs">/ 145 Active</span>
</div>
</div>
{/*  Pending Actions  */}
<div className="bg-surface-container p-lg rounded-xl border border-surface-variant flex flex-col justify-between hover:border-primary/30 transition-colors">
<div className="flex items-start justify-between mb-md">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Pending Approvals</span>
<span className="material-symbols-outlined text-status-amber bg-status-amber/10 p-xs rounded-md">pending_actions</span>
</div>
<div>
<span className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold">3</span>
<div className="flex items-center gap-xs mt-xs text-status-amber font-label-sm text-label-sm">
<span>Action required before processing</span>
</div>
</div>
</div>
</div>
{/*  Main Data Table  */}
<div className="xl:col-span-12 bg-surface-container rounded-xl border border-surface-variant overflow-hidden flex flex-col">
{/*  Table Header Actions  */}
<div className="p-md border-b border-outline-variant/30 flex flex-col sm:flex-row justify-between items-center gap-md">
<div className="font-headline-md text-headline-md text-on-surface">Employee Salary Details</div>
<div className="flex items-center gap-sm w-full sm:w-auto">
<div className="relative w-full sm:w-64">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">filter_list</span>
<select className="w-full bg-surface-container-low border border-outline-variant text-on-surface font-body-md text-body-md rounded-lg py-1.5 pl-8 pr-8 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer">
<option>All Departments</option>
<option>Engineering</option>
<option>Design</option>
<option>Marketing</option>
</select>
</div>
<button className="p-1.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
</div>
{/*  Table Container (Scrollable)  */}
<div className="overflow-x-auto w-full">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant/50">
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium whitespace-nowrap sticky left-0 bg-surface-container-low z-10 w-[250px]">Employee</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium text-right whitespace-nowrap">Base Pay</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium text-right whitespace-nowrap">HRA / Allow.</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium text-right whitespace-nowrap">Bonus (YTD)</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium text-right whitespace-nowrap">Deductions</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium text-right whitespace-nowrap bg-surface-container-low">Net Pay</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium text-center whitespace-nowrap">Status</th>
<th className="p-sm font-label-sm text-label-sm text-on-surface-variant font-medium text-center whitespace-nowrap w-[50px]"></th>
</tr>
</thead>
<tbody className="font-body-md text-body-md">
{/*  Row 1  */}
<tr className="border-b border-outline-variant/20 hover:bg-surface-container-high/50 transition-colors group">
<td className="p-sm sticky left-0 bg-surface-container group-hover:bg-surface-container-high/90 z-10">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0">AS</div>
<div>
<div className="font-medium text-on-surface">Alex Smith</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Engineering • EMP-001</div>
</div>
</div>
</td>
<td className="p-sm text-right font-data-mono text-data-mono text-on-surface-variant">$8,500.00</td>
<td className="p-sm text-right font-data-mono text-data-mono text-on-surface-variant">$1,200.00</td>
<td className="p-sm text-right font-data-mono text-data-mono text-status-green">+$500.00</td>
<td className="p-sm text-right font-data-mono text-data-mono text-status-red">-$1,850.00</td>
<td className="p-sm text-right font-data-mono text-data-mono font-bold text-on-surface bg-surface-container-low/30">$8,350.00</td>
<td className="p-sm text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-status-green/10 text-status-green font-label-sm text-label-sm border border-status-green/20">Ready</span>
</td>
<td className="p-sm text-center">
<button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</td>
</tr>
{/*  Row 2  */}
<tr className="border-b border-outline-variant/20 hover:bg-surface-container-high/50 transition-colors group">
<td className="p-sm sticky left-0 bg-surface-container group-hover:bg-surface-container-high/90 z-10">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-tertiary-container/30 text-tertiary flex items-center justify-center font-bold text-xs shrink-0">MJ</div>
<div>
<div className="font-medium text-on-surface">Maria Johnson</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Design • EMP-042</div>
</div>
</div>
</td>
<td className="p-sm text-right font-data-mono text-data-mono text-on-surface-variant">$7,200.00</td>
<td className="p-sm text-right font-data-mono text-data-mono text-on-surface-variant">$950.00</td>
<td className="p-sm text-right font-data-mono text-data-mono text-on-surface-variant">-</td>
<td className="p-sm text-right font-data-mono text-data-mono text-status-red">-$1,400.00</td>
<td className="p-sm text-right font-data-mono text-data-mono font-bold text-on-surface bg-surface-container-low/30">$6,750.00</td>
<td className="p-sm text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-status-green/10 text-status-green font-label-sm text-label-sm border border-status-green/20">Ready</span>
</td>
<td className="p-sm text-center">
<button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</td>
</tr>
{/*  Row 3 (Pending)  */}
<tr className="border-b border-outline-variant/20 hover:bg-surface-container-high/50 transition-colors group bg-status-amber/5">
<td className="p-sm sticky left-0 bg-surface-container group-hover:bg-surface-container-high/90 z-10 border-l-2 border-l-status-amber">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">DK</div>
<div>
<div className="font-medium text-on-surface">David Kim</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Marketing • EMP-088</div>
</div>
</div>
</td>
<td className="p-sm text-right font-data-mono text-data-mono text-on-surface-variant">$6,800.00</td>
<td className="p-sm text-right font-data-mono text-data-mono text-on-surface-variant">$800.00</td>
<td className="p-sm text-right font-data-mono text-data-mono text-status-green">+$1,200.00</td>
<td className="p-sm text-right font-data-mono text-data-mono text-status-red">-$1,650.00</td>
<td className="p-sm text-right font-data-mono text-data-mono font-bold text-on-surface bg-surface-container-low/30">$7,150.00</td>
<td className="p-sm text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-status-amber/10 text-status-amber font-label-sm text-label-sm border border-status-amber/20">Pending Approval</span>
</td>
<td className="p-sm text-center">
<button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</td>
</tr>
{/*  Row 4  */}
<tr className="hover:bg-surface-container-high/50 transition-colors group">
<td className="p-sm sticky left-0 bg-surface-container group-hover:bg-surface-container-high/90 z-10">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-xs shrink-0">SJ</div>
<div>
<div className="font-medium text-on-surface">Sarah Jenkins</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Engineering • EMP-102</div>
</div>
</div>
</td>
<td className="p-sm text-right font-data-mono text-data-mono text-on-surface-variant">$9,200.00</td>
<td className="p-sm text-right font-data-mono text-data-mono text-on-surface-variant">$1,500.00</td>
<td className="p-sm text-right font-data-mono text-data-mono text-on-surface-variant">-</td>
<td className="p-sm text-right font-data-mono text-data-mono text-status-red">-$2,100.00</td>
<td className="p-sm text-right font-data-mono text-data-mono font-bold text-on-surface bg-surface-container-low/30">$8,600.00</td>
<td className="p-sm text-center">
<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-status-green/10 text-status-green font-label-sm text-label-sm border border-status-green/20">Ready</span>
</td>
<td className="p-sm text-center">
<button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
{/*  Table Footer / Pagination Placeholder  */}
<div className="p-sm border-t border-outline-variant/30 bg-surface-container-low flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
<span>Showing 1-4 of 142 employees</span>
<div className="flex gap-xs">
<button className="p-1 rounded hover:bg-surface-variant transition-colors disabled:opacity-50"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
<button className="p-1 rounded hover:bg-surface-variant transition-colors"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
</div>
</div>
</div>
</div>
</main>
</div>

    </div>
  );
}
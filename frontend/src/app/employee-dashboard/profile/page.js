'use client';

import Link from 'next/link';

export default function EmployeeProfile() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      {/* SideNavBar (Hidden on Mobile, Flex on MD+) */}
<nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 py-unit-base px-4 border-r border-outline-variant dark:border-outline bg-surface-container-low dark:bg-surface-container-lowest z-40">
<div className="mb-8 mt-4 px-2">
<h1 className="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed">Dayflow</h1>
<p className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant mt-1 uppercase">HR Portal</p>
</div>
<div className="flex-1 space-y-2">
<Link href="/employee-dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" >
<span className="material-symbols-outlined">dashboard</span>
                Dashboard
            </Link>
<Link href="/employee-dashboard/attendance" className="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" >
<span className="material-symbols-outlined">event_available</span>
                Attendance
            </Link>
<Link href="/employee-dashboard/time-off" className="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" >
<span className="material-symbols-outlined">calendar_today</span>
                Time Off
            </Link>
{/* Active Tab */}
<Link href="/employee-dashboard/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary scale-95 active:scale-90 transition-transform" >
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>person</span>
                My Profile
            </Link>
<Link href="/employee-dashboard/payroll" className="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" >
<span className="material-symbols-outlined">payments</span>
                Payroll
            </Link>
</div>
<div className="mt-auto space-y-2 pt-4 border-t border-outline-variant dark:border-outline">
<Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" >
<span className="material-symbols-outlined">help</span>
                Help
            </Link>
<Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" >
<span className="material-symbols-outlined">logout</span>
                Logout
            </Link>
</div>
</nav>
{/* Main Content Area */}
<div className="flex-1 md:ml-64 flex flex-col min-h-screen">
{/* TopNavBar (Mobile Only) */}
<header className="md:hidden flex justify-between items-center px-container-padding w-full h-16 sticky top-0 z-50 bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline">
<h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary dark:text-primary-fixed">Dayflow</h1>
<div className="flex gap-4">
<button className="text-on-surface-variant dark:text-outline-variant cursor-pointer active:opacity-80 transition-all">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="text-on-surface-variant dark:text-outline-variant cursor-pointer active:opacity-80 transition-all">
<span className="material-symbols-outlined">settings</span>
</button>
</div>
</header>
{/* Canvas */}
<main className="flex-1 p-margin-mobile md:p-gutter max-w-[1120px] mx-auto w-full space-y-gutter">
{/* Page Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant dark:border-outline pb-4">
<div>
<h2 className="font-display-lg text-display-lg text-on-surface dark:text-inverse-on-surface">Elena Rodriguez</h2>
<p className="font-title-md text-title-md text-primary dark:text-primary-fixed-dim mt-2 font-accent-marker marker-highlight">Senior Product Designer</p>
</div>
<div className="flex gap-3">
<button className="px-4 py-2 rounded-lg border border-outline text-on-surface dark:text-inverse-on-surface font-title-md text-title-md hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-colors">Edit Profile</button>
<button className="px-4 py-2 rounded-lg bg-primary text-on-primary font-title-md text-title-md hover:opacity-90 transition-opacity">Request Update</button>
</div>
</div>
{/* Bento Grid Layout */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
{/* Quick Info Card (Span 4) */}
<div className="md:col-span-4 bg-surface-container-lowest dark:bg-inverse-surface border border-outline-variant dark:border-outline rounded-xl p-6 hover:shadow-[0_4px_12px_rgba(47,16,41,0.05)] transition-shadow">
<div className="flex items-center gap-4 mb-6">
<div className="w-16 h-16 rounded-full bg-surface-variant dark:bg-surface-container overflow-hidden">
<img alt="Profile Picture" className="w-full h-full object-cover" data-alt="A professional headshot of a young woman with dark hair in a modern corporate setting, soft high-key lighting, dark plum and crisp white aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGgX_Ph9S1U6ewX-fN31tPfwPkufR-9GhFgrZROQ2jNNlqWqI0VSDiht9URdZd_0CNRauq7JOCgIxct9Ix92TudIRys_gZD_I1vLrAgc6sSQlseMIMYW7h_JD-N2lPFgwSpkReNh56K0dgkST-ZreCdxNhTPAGPal0vlbVSnwzziu6h6h_ie-QBOEE1MenN1gci07S03PiB9JPS8NvrRXXOUqX083DHDe5VTcOgzDUWH9lTts8bq0XDA"/>
</div>
<div>
<span className="inline-block px-2 py-1 rounded bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary font-label-sm text-label-sm uppercase mb-1">Active</span>
<p className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">ID: EMP-2023-042</p>
</div>
</div>
<div className="space-y-4">
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-1">Email</p>
<p className="font-body-md text-body-md">elena.r@dayflow.inc</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-1">Phone</p>
<p className="font-body-md text-body-md">+1 (555) 019-2834</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-1">Location</p>
<p className="font-body-md text-body-md">San Francisco, CA (Hybrid)</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-1">Hire Date</p>
<p className="font-body-md text-body-md">March 15, 2021</p>
</div>
</div>
</div>
{/* Job Details Card (Span 8) */}
<div className="md:col-span-8 bg-surface-container-lowest dark:bg-inverse-surface border border-outline-variant dark:border-outline rounded-xl p-6 hover:shadow-[0_4px_12px_rgba(47,16,41,0.05)] transition-shadow flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 mb-6">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">work</span>
<h3 className="font-title-md text-title-md">Role &amp; Organization</h3>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
<div className="p-4 rounded-lg bg-surface-container-low dark:bg-surface-container-highest border border-outline-variant dark:border-outline">
<p className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-2">Department</p>
<p className="font-title-md text-title-md">Product Design</p>
</div>
<div className="p-4 rounded-lg bg-surface-container-low dark:bg-surface-container-highest border border-outline-variant dark:border-outline">
<p className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-2">Cost Center</p>
<p className="font-title-md text-title-md">CC-4091-UX</p>
</div>
</div>
</div>
<div className="mt-6 pt-6 border-t border-outline-variant dark:border-outline">
<p className="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-3">Direct Manager</p>
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-variant dark:bg-surface-container overflow-hidden">
<img alt="Manager Picture" className="w-full h-full object-cover" data-alt="A professional headshot of an older man with glasses in a bright modern office, minimalist background, corporate aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgMIzG0x7I6lfkeqCNB-nwoTCR6Lsr8CsbXSwWUNiSzxOFjW4Oe9VytrVmqDQ6XVJ6TOQvy8ZHxOE0CK89Ujbg2NyCRzAKlnLhsxt9lgMP2SZ8Wdp1m6koaGtQQb6hLgGABNhNFgG0EUeGspyCzcxI1Cb3c17VNJNGmqZwtyN3rAyZRy3tffmNrJ2yotMQbzDxzBoL-lkKh_q6NSs2j1SnpG7Gcpvi7_Nr-thwqssragxkIIfpulxD_w"/>
</div>
<div>
<p className="font-body-md text-body-md font-semibold">Marcus Chen</p>
<p className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">VP of Design</p>
</div>
<button className="ml-auto text-primary dark:text-primary-fixed-dim hover:bg-primary-container dark:hover:bg-primary-container p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">mail</span>
</button>
</div>
</div>
</div>
{/* Personal Documents Card (Span 12) */}
<div className="md:col-span-12 bg-surface-container-lowest dark:bg-inverse-surface border border-outline-variant dark:border-outline rounded-xl p-6 hover:shadow-[0_4px_12px_rgba(47,16,41,0.05)] transition-shadow">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">folder</span>
<h3 className="font-title-md text-title-md">My Documents</h3>
</div>
<button className="text-sm font-label-sm uppercase text-primary dark:text-primary-fixed-dim hover:underline">View All</button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low dark:bg-surface-container-highest border-b border-outline-variant dark:border-outline">
<th className="py-3 px-4 font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-outline-variant">Document Name</th>
<th className="py-3 px-4 font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-outline-variant">Date Added</th>
<th className="py-3 px-4 font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-outline-variant">Type</th>
<th className="py-3 px-4 font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-outline-variant text-right">Action</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-outline-variant dark:border-outline hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors h-12">
<td className="py-2 px-4 font-body-sm text-body-sm flex items-center gap-2">
<span className="material-symbols-outlined text-outline text-sm">description</span>
                                        2024_W4_Tax_Form.pdf
                                    </td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">Jan 10, 2024</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">Tax</td>
<td className="py-2 px-4 text-right">
<button className="text-primary dark:text-primary-fixed-dim hover:bg-primary-container dark:hover:bg-primary-container p-1 rounded transition-colors">
<span className="material-symbols-outlined text-base">download</span>
</button>
</td>
</tr>
<tr className="border-b border-outline-variant dark:border-outline hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors h-12">
<td className="py-2 px-4 font-body-sm text-body-sm flex items-center gap-2">
<span className="material-symbols-outlined text-outline text-sm">contract</span>
                                        Signed_Offer_Letter_2021.pdf
                                    </td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">Mar 01, 2021</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">HR</td>
<td className="py-2 px-4 text-right">
<button className="text-primary dark:text-primary-fixed-dim hover:bg-primary-container dark:hover:bg-primary-container p-1 rounded transition-colors">
<span className="material-symbols-outlined text-base">download</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors h-12">
<td className="py-2 px-4 font-body-sm text-body-sm flex items-center gap-2">
<span className="material-symbols-outlined text-outline text-sm">verified_user</span>
                                        Employee_Handbook_Ack.pdf
                                    </td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">Mar 15, 2021</td>
<td className="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">Compliance</td>
<td className="py-2 px-4 text-right">
<button className="text-primary dark:text-primary-fixed-dim hover:bg-primary-container dark:hover:bg-primary-container p-1 rounded transition-colors">
<span className="material-symbols-outlined text-base">download</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</main>
</div>
    </div>
  );
}

import os
import re

html_payroll = r"""<!-- SideNavBar -->
<nav class="hidden md:flex flex-col h-full py-unit-base px-4 h-screen w-64 fixed left-0 top-0 border-r border-outline-variant dark:border-outline bg-surface-container-low dark:bg-surface-container-lowest z-40">
<div class="flex items-center gap-3 px-4 py-6">
<div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-xl">D</div>
<div>
<h1 class="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed leading-none">Dayflow</h1>
<p class="text-on-surface-variant text-label-sm font-label-sm mt-1">HR Portal</p>
</div>
</div>
<div class="flex-1 overflow-y-auto mt-4">
<ul class="space-y-1">
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined">dashboard</span>
                        Dashboard
                    </a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined">event_available</span>
                        Attendance
                    </a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined">calendar_today</span>
                        Time Off
                    </a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined">person</span>
                        My Profile
                    </a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined">payments</span>
                        Payroll
                    </a>
</li>
</ul>
</div>
<div class="mt-auto border-t border-outline-variant pt-4">
<ul class="space-y-1">
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined">help</span>
                        Help
                    </a>
</li>
<li>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined">logout</span>
                        Logout
                    </a>
</li>
</ul>
</div>
</nav>
<!-- Main Content Area -->
<div class="flex-1 flex flex-col md:ml-64 w-full h-full bg-background overflow-hidden">
<!-- TopNavBar (Mobile) -->
<header class="md:hidden flex justify-between items-center px-container-padding w-full h-16 sticky top-0 z-50 bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline">
<div class="flex items-center gap-2">
<div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold">D</div>
<h1 class="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary dark:text-primary-fixed">Dayflow</h1>
</div>
<div class="flex items-center gap-4">
<button class="text-on-surface-variant cursor-pointer active:opacity-80 transition-all p-2 rounded-full hover:bg-surface-container">
<span class="material-symbols-outlined">notifications</span>
</button>
<img alt="Employee Profile Avatar" class="w-8 h-8 rounded-full object-cover border border-outline-variant" data-alt="A professional headshot of a female employee in a modern corporate setting, soft lighting, warm tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOYoCYHPmFAUjovkw2x54y2Kaa_K-rUD-ryUngyaW_ZkC1BsyBzpxZI2v0UiMDlIFJuGYFyOhmArmLBK2M0dwFHLN2iqdQOuP1TK9E0WnVocX-2ixwXAehu81h9rrvyS1eBBVB-bxRN2Y7xuQE5J-z-FqcVe0EGUHdtwix3GM2QlXrozyY0XTtDzOyJfcYJrZlgx5WgoelhYWQomiNDP2ZBgW08jAzXrx1fAZOVHnphoT0mNdga5HW_w"/>
</div>
</header>
<!-- TopNavBar (Desktop) -->
<header class="hidden md:flex justify-between items-center px-container-padding w-full h-16 sticky top-0 z-30 bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline">
<div class="flex-1"></div> <!-- Spacer since search is not specified in prompt for this view -->
<div class="flex items-center gap-4">
<button class="text-on-surface-variant cursor-pointer active:opacity-80 transition-all p-2 rounded-full hover:bg-surface-container">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="text-on-surface-variant cursor-pointer active:opacity-80 transition-all p-2 rounded-full hover:bg-surface-container">
<span class="material-symbols-outlined">settings</span>
</button>
<img alt="Employee Profile Avatar" class="w-8 h-8 rounded-full object-cover border border-outline-variant" data-alt="A professional headshot of a female employee in a modern corporate setting, soft lighting, warm tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1UOHcmjj8ms9hkHVlkGTAQ-Cr5VqOODWwddjE3sxqYQjgpR0zIXr9f-fnr7HiZuS1qPS4QSfnhC-8XJjSHG3qLVTMaUiA-f_OKvknSdxd7g4RngmmjV80TyqElrOTbQsNIy-uQL6nld8eflb_xyfUccXPXtdMNhbtsfRsaib3nlogNlU8UpcVjazUddGRNpR_d9rrCVDyoHGiXVx_lUaTHhBXd7w8qMnnkmwt-Z3siouc2Ctny3FbLw"/>
</div>
</header>
<!-- Scrollable Canvas -->
<main class="flex-1 overflow-y-auto p-margin-mobile md:p-gutter lg:p-container-padding">
<div class="max-w-[1120px] mx-auto space-y-gutter">
<!-- Header -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 class="font-display-lg text-display-lg text-on-surface">Payroll &amp; Earnings</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-2">Manage your compensation, payslips, and direct deposit details.</p>
</div>
</div>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- YTD Earnings Card (Spans 8 cols on desktop) -->
<div class="col-span-1 md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
<!-- Decorative background element -->
<div class="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
<div>
<h3 class="font-title-md text-title-md text-on-surface-variant">2024 YTD Earnings</h3>
<div class="mt-4 flex items-baseline gap-2">
<span class="font-display-lg text-display-lg text-primary">$84,250.00</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Gross</span>
</div>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-surface-variant">
<div>
<p class="font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Net Pay</p>
<p class="font-title-md text-title-md text-on-surface">$61,420.50</p>
</div>
<div>
<p class="font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Taxes</p>
<p class="font-title-md text-title-md text-on-surface">$18,500.25</p>
</div>
<div>
<p class="font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Deductions</p>
<p class="font-title-md text-title-md text-on-surface">$4,329.25</p>
</div>
<div>
<p class="font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">Last Pay Date</p>
<p class="font-title-md text-title-md text-on-surface">Oct 15, 2024</p>
</div>
</div>
</div>
<!-- Direct Deposit Card (Spans 4 cols on desktop) -->
<div class="col-span-1 md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col justify-between">
<div class="flex justify-between items-start">
<h3 class="font-title-md text-title-md text-on-surface-variant">Direct Deposit</h3>
<button class="text-primary hover:bg-primary-fixed rounded-full p-1 transition-colors">
<span class="material-symbols-outlined">edit</span>
</button>
</div>
<div class="mt-6 space-y-4">
<div class="flex items-center gap-4 bg-surface-container-low p-4 rounded-lg border border-surface-variant">
<div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span class="material-symbols-outlined">account_balance</span>
</div>
<div>
<p class="font-body-sm text-body-sm font-medium text-on-surface">Chase Bank</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">**** **** 4092</p>
</div>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-sm">check_circle</span>
<span class="font-label-sm text-label-sm text-secondary">Active &amp; Verified</span>
</div>
</div>
</div>
<!-- Payslip History (Spans full width) -->
<div class="col-span-1 md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
<div class="p-6 border-b border-surface-variant flex justify-between items-center bg-surface-bright">
<h3 class="font-title-md text-title-md text-on-surface">Recent Payslips</h3>
<button class="flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface-variant font-body-sm text-body-sm rounded-lg hover:bg-surface-variant transition-colors">
<span class="material-symbols-outlined text-sm">filter_list</span>
                                Filter
                            </button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low font-label-sm text-label-sm uppercase text-on-surface-variant h-12">
<th class="px-6 font-medium">Pay Period</th>
<th class="px-6 font-medium">Pay Date</th>
<th class="px-6 font-medium">Gross</th>
<th class="px-6 font-medium">Net Pay</th>
<th class="px-6 font-medium">Status</th>
<th class="px-6 font-medium text-right">Action</th>
</tr>
</thead>
<tbody class="font-body-sm text-body-sm text-on-surface divide-y divide-surface-variant">
<tr class="h-12 hover:bg-surface-container-lowest group transition-colors">
<td class="px-6">Oct 01 - Oct 15, 2024</td>
<td class="px-6">Oct 15, 2024</td>
<td class="px-6">$3,850.00</td>
<td class="px-6 font-medium">$2,810.25</td>
<td class="px-6">
<span class="inline-flex items-center px-2 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm">
                                                Paid
                                            </span>
</td>
<td class="px-6 text-right">
<button class="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-variant transition-colors" title="Download PDF">
<span class="material-symbols-outlined">download</span>
</button>
</td>
</tr>
<tr class="h-12 hover:bg-surface-container-lowest group transition-colors">
<td class="px-6">Sep 16 - Sep 30, 2024</td>
<td class="px-6">Sep 30, 2024</td>
<td class="px-6">$3,850.00</td>
<td class="px-6 font-medium">$2,810.25</td>
<td class="px-6">
<span class="inline-flex items-center px-2 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm">
                                                Paid
                                            </span>
</td>
<td class="px-6 text-right">
<button class="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-variant transition-colors" title="Download PDF">
<span class="material-symbols-outlined">download</span>
</button>
</td>
</tr>
<tr class="h-12 hover:bg-surface-container-lowest group transition-colors">
<td class="px-6">Sep 01 - Sep 15, 2024</td>
<td class="px-6">Sep 15, 2024</td>
<td class="px-6">$3,850.00</td>
<td class="px-6 font-medium">$2,810.25</td>
<td class="px-6">
<span class="inline-flex items-center px-2 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm">
                                                Paid
                                            </span>
</td>
<td class="px-6 text-right">
<button class="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-variant transition-colors" title="Download PDF">
<span class="material-symbols-outlined">download</span>
</button>
</td>
</tr>
<tr class="h-12 hover:bg-surface-container-lowest group transition-colors">
<td class="px-6 relative">
                                            Aug 16 - Aug 31, 2024
                                            <!-- Marker Highlight Example -->
<span class="absolute top-1/2 -translate-y-1/2 left-48 font-accent-marker text-accent-marker text-primary z-10 whitespace-nowrap">Bonus included!</span>
<div class="absolute top-1/2 -translate-y-1/2 left-48 w-32 h-3 bg-primary-fixed opacity-50 -z-10 mt-1 skew-x-12"></div>
</td>
<td class="px-6">Aug 31, 2024</td>
<td class="px-6">$4,500.00</td>
<td class="px-6 font-medium">$3,300.50</td>
<td class="px-6">
<span class="inline-flex items-center px-2 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm">
                                                Paid
                                            </span>
</td>
<td class="px-6 text-right">
<button class="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-variant transition-colors" title="Download PDF">
<span class="material-symbols-outlined">download</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div class="p-4 border-t border-surface-variant flex justify-center bg-surface-bright">
<button class="font-body-sm text-body-sm font-medium text-primary hover:text-primary-container transition-colors">View All Payslips</button>
</div>
</div>
</div>
</div>
</main>
</div>"""

html_attendance = r"""<!-- SideNavBar (Web Only) -->
<nav class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low dark:bg-surface-container-lowest border-r border-outline-variant dark:border-outline py-unit-base px-4 z-40">
<div class="flex items-center gap-3 px-4 py-6">
<div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-lg">D</div>
<div>
<div class="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed">Dayflow</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">HR Portal</div>
</div>
</div>
<div class="flex-1 mt-6 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary scale-95 active:scale-90 transition-transform font-title-md text-title-md" href="#">
<span class="material-symbols-outlined" data-icon="event_available">event_available</span>
                Attendance
            </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
                Time Off
            </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
                My Profile
            </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
                Payroll
            </a>
</div>
<div class="mt-auto space-y-2 border-t border-outline-variant pt-4">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
                Help
            </a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all scale-95 active:scale-90 font-title-md text-title-md" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
                Logout
            </a>
</div>
</nav>
<!-- Main Content Area -->
<div class="flex-1 md:ml-64 flex flex-col min-h-screen">
<!-- TopNavBar (Mobile Only) -->
<header class="md:hidden flex justify-between items-center px-margin-mobile w-full sticky top-0 z-50 bg-surface dark:bg-inverse-surface h-16 border-b border-outline-variant dark:border-outline">
<div class="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary dark:text-primary-fixed">Dayflow</div>
<div class="flex gap-4 text-primary dark:text-primary-fixed-dim">
<span class="material-symbols-outlined cursor-pointer active:opacity-80 transition-all hover:bg-surface-container dark:hover:bg-surface-container-highest p-2 rounded-full" data-icon="notifications">notifications</span>
<span class="material-symbols-outlined cursor-pointer active:opacity-80 transition-all hover:bg-surface-container dark:hover:bg-surface-container-highest p-2 rounded-full" data-icon="settings">settings</span>
</div>
</header>
<!-- TopNavBar (Web - Simplified header since Sidebar handles nav) -->
<header class="hidden md:flex justify-between items-center px-container-padding w-full h-16 sticky top-0 z-30 bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline">
<h1 class="font-headline-lg text-headline-lg text-on-surface font-semibold">Attendance Overview</h1>
<div class="flex gap-4 items-center">
<span class="material-symbols-outlined text-primary cursor-pointer active:opacity-80 transition-all hover:bg-surface-container p-2 rounded-full" data-icon="notifications">notifications</span>
<div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
<img alt="Employee Profile Avatar" class="w-full h-full object-cover" data-alt="A professional headshot of a young woman with dark hair smiling warmly in a well-lit office environment, corporate attire, shallow depth of field, high resolution, light plum and teal color palette hints in the background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbxvt3pY-uLta9Hk214SHvFId6jss0n_qbj6VEcSvs9y9CNXBFxs1nysaSpXP18--8Vp0Q31Uyy_t0mE5z28SVsf99D8HAOP4pu4oZXgyyWSCAJvjSdl9nlFEkvHl2EXzipHAeT4Ed5hOBjFe4xvs0gBigVjeVU_XYZqhc8a8rxZUFfPTMtlfa2a-eqcx4UddZ6qkw417ah59tIzD-OHpU7_v7EUj70uw-oJNxnOYoi80qKXdao5O9Ug"/>
</div>
</div>
</header>
<!-- Main Canvas -->
<main class="flex-1 p-margin-mobile md:p-container-padding max-w-[max-width] mx-auto w-full">
<div class="mb-gutter md:hidden">
<h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold">Attendance Overview</h1>
</div>
<!-- Dashboard Summary Bento Grid -->
<section class="grid grid-cols-1 md:grid-cols-12 gap-unit-base md:gap-gutter mb-gutter">
<!-- Main Status Card -->
<div class="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 relative overflow-hidden group hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div class="flex justify-between items-start mb-4">
<div>
<h2 class="font-title-md text-title-md text-on-surface">October 2023 Summary</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">You are currently <span class="marker-highlight font-accent-marker text-accent-marker text-primary ml-1">on track</span> for this month.</p>
</div>
<span class="material-symbols-outlined text-secondary text-3xl opacity-20 group-hover:opacity-100 transition-opacity" data-icon="insert_chart">insert_chart</span>
</div>
<div class="grid grid-cols-3 gap-4 mt-8">
<div>
<div class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Hours Logged</div>
<div class="flex items-baseline gap-1 font-display-lg text-display-lg text-primary font-bold">142<span class="text-title-md font-medium">h</span><span class="ml-2 text-secondary">30<span class="text-body-sm font-medium">m</span></span></div>
</div>
<div>
<div class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Target Hours</div>
<div class="flex items-baseline gap-1 font-display-lg text-display-lg text-on-surface-variant font-bold">160<span class="text-title-md font-medium">h</span></div>
</div>
<div class="flex flex-col justify-end pb-2">
<div class="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full" style="width: 89%;"></div>
</div>
<div class="text-right font-label-sm text-label-sm text-secondary mt-2 font-bold">89% Complete</div>
</div>
</div>
</div>
<!-- Punctuality Stats -->
<div class="md:col-span-4 grid grid-cols-1 gap-unit-base md:gap-gutter">
<!-- On Time -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl flex items-center justify-between hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow p-6">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span class="material-symbols-outlined" data-icon="schedule">schedule</span>
</div>
<div>
<div class="font-label-sm text-label-sm text-on-surface-variant uppercase">Punctuality</div>
<div class="flex items-baseline gap-1 font-display-lg text-display-lg text-on-surface font-bold">95<span class="text-title-md font-medium">%</span><span class="ml-1 text-body-sm text-on-surface-variant font-normal">On Time</span></div>
</div>
</div>
</div>
<!-- Absences -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl flex items-center justify-between hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow p-6">
<div class="flex items-center gap-4">
<div class="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-on-error-container">
<span class="material-symbols-outlined" data-icon="event_busy">event_busy</span>
</div>
<div>
<div class="font-label-sm text-label-sm text-on-surface-variant uppercase">Absences</div>
<div class="flex items-baseline gap-1 font-display-lg text-display-lg text-on-surface font-bold">1<span class="text-title-md font-medium">Day</span><span class="ml-1 text-body-sm text-on-surface-variant font-normal">(Sick Leave)</span></div>
</div>
</div>
</div>
</div>
</section>
<!-- Detailed Log Table -->
<section class="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
<div class="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
<h3 class="font-title-md text-title-md text-on-surface">Detailed Attendance Log</h3>
<div class="flex gap-2">
<button class="px-4 py-2 bg-primary-fixed-dim text-primary rounded-lg font-label-sm text-label-sm flex items-center gap-2 hover:bg-primary-fixed transition-colors">
<span class="material-symbols-outlined text-sm" data-icon="filter_list">filter_list</span>
                            Filter
                        </button>
<button class="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
<span class="material-symbols-outlined text-sm" data-icon="download">download</span>
                            Export
                        </button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-[#FAF8FA] border-b border-outline-variant">
<th class="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Date</th>
<th class="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Status</th>
<th class="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Check In</th>
<th class="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Check Out</th>
<th class="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Total Hours</th>
<th class="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">Notes</th>
</tr>
</thead>
<tbody class="font-body-md text-body-md text-on-surface">
<tr class="border-b border-outline-variant hover:bg-surface-variant transition-colors h-12">
<td class="p-4">Oct 24, Tue</td>
<td class="p-4"><span class="inline-block px-2 py-1 rounded bg-secondary-fixed-dim bg-opacity-20 text-secondary text-xs font-semibold">Present</span></td>
<td class="p-4">08:55 AM</td>
<td class="p-4">05:10 PM</td>
<td class="p-4">8h 15m</td>
<td class="p-4 text-on-surface-variant">--</td>
</tr>
<tr class="border-b border-outline-variant hover:bg-surface-variant transition-colors h-12">
<td class="p-4">Oct 23, Mon</td>
<td class="p-4"><span class="inline-block px-2 py-1 rounded bg-secondary-fixed-dim bg-opacity-20 text-secondary text-xs font-semibold">Present</span></td>
<td class="p-4">09:05 AM <span class="text-error font-bold">*</span></td>
<td class="p-4">05:30 PM</td>
<td class="p-4">8h 25m</td>
<td class="p-4 text-on-surface-variant text-sm">Traffic delay</td>
</tr>
<tr class="border-b border-outline-variant hover:bg-surface-variant transition-colors h-12">
<td class="p-4 text-on-surface-variant">Oct 20, Fri</td>
<td class="p-4"><span class="inline-block px-2 py-1 rounded bg-error-container bg-opacity-50 text-error text-xs font-semibold">Absent</span></td>
<td class="p-4 text-on-surface-variant">--</td>
<td class="p-4 text-on-surface-variant">--</td>
<td class="p-4 text-on-surface-variant">0h</td>
<td class="p-4 text-on-surface-variant text-sm">Sick Leave Approved</td>
</tr>
<tr class="border-b border-outline-variant hover:bg-surface-variant transition-colors h-12">
<td class="p-4">Oct 19, Thu</td>
<td class="p-4"><span class="inline-block px-2 py-1 rounded bg-secondary-fixed-dim bg-opacity-20 text-secondary text-xs font-semibold">Present</span></td>
<td class="p-4">08:50 AM</td>
<td class="p-4">05:00 PM</td>
<td class="p-4">8h 10m</td>
<td class="p-4 text-on-surface-variant">--</td>
</tr>
</tbody>
</table>
</div>
</section>
</main>
</div>
<!-- BottomNavBar (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 w-full bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline z-50 px-2 py-2 flex justify-between items-center shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
<a class="flex flex-col items-center p-2 text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest rounded-lg transition-colors w-1/4" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="text-[10px] mt-1 font-medium">Dashboard</span>
</a>
<a class="flex flex-col items-center p-2 text-primary dark:text-primary-fixed bg-primary-container bg-opacity-20 rounded-lg transition-colors w-1/4" href="#">
<span class="material-symbols-outlined" data-icon="event_available" data-weight="fill">event_available</span>
<span class="text-[10px] mt-1 font-bold">Attendance</span>
</a>
<a class="flex flex-col items-center p-2 text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest rounded-lg transition-colors w-1/4" href="#">
<span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
<span class="text-[10px] mt-1 font-medium">Time Off</span>
</a>
<a class="flex flex-col items-center p-2 text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest rounded-lg transition-colors w-1/4" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="text-[10px] mt-1 font-medium">Profile</span>
</a>
</nav>"""

html_profile = r"""<!-- SideNavBar (Hidden on Mobile, Flex on MD+) -->
<nav class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 py-unit-base px-4 border-r border-outline-variant dark:border-outline bg-surface-container-low dark:bg-surface-container-lowest z-40">
<div class="mb-8 mt-4 px-2">
<h1 class="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed">Dayflow</h1>
<p class="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant mt-1 uppercase">HR Portal</p>
</div>
<div class="flex-1 space-y-2">
<a class="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined">event_available</span>
                Attendance
            </a>
<a class="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined">calendar_today</span>
                Time Off
            </a>
<!-- Active Tab -->
<a class="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary scale-95 active:scale-90 transition-transform" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">person</span>
                My Profile
            </a>
<a class="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined">payments</span>
                Payroll
            </a>
</div>
<div class="mt-auto space-y-2 pt-4 border-t border-outline-variant dark:border-outline">
<a class="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined">help</span>
                Help
            </a>
<a class="flex items-center gap-3 px-3 py-2 rounded-lg font-title-md text-title-md text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-all scale-95 active:scale-90" href="#">
<span class="material-symbols-outlined">logout</span>
                Logout
            </a>
</div>
</nav>
<!-- Main Content Area -->
<div class="flex-1 md:ml-64 flex flex-col min-h-screen">
<!-- TopNavBar (Mobile Only) -->
<header class="md:hidden flex justify-between items-center px-container-padding w-full h-16 sticky top-0 z-50 bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline">
<h1 class="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary dark:text-primary-fixed">Dayflow</h1>
<div class="flex gap-4">
<button class="text-on-surface-variant dark:text-outline-variant cursor-pointer active:opacity-80 transition-all">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="text-on-surface-variant dark:text-outline-variant cursor-pointer active:opacity-80 transition-all">
<span class="material-symbols-outlined">settings</span>
</button>
</div>
</header>
<!-- Canvas -->
<main class="flex-1 p-margin-mobile md:p-gutter max-w-[1120px] mx-auto w-full space-y-gutter">
<!-- Page Header -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant dark:border-outline pb-4">
<div>
<h2 class="font-display-lg text-display-lg text-on-surface dark:text-inverse-on-surface">Elena Rodriguez</h2>
<p class="font-title-md text-title-md text-primary dark:text-primary-fixed-dim mt-2 font-accent-marker marker-highlight">Senior Product Designer</p>
</div>
<div class="flex gap-3">
<button class="px-4 py-2 rounded-lg border border-outline text-on-surface dark:text-inverse-on-surface font-title-md text-title-md hover:bg-surface-variant dark:hover:bg-surface-container-highest transition-colors">Edit Profile</button>
<button class="px-4 py-2 rounded-lg bg-primary text-on-primary font-title-md text-title-md hover:opacity-90 transition-opacity">Request Update</button>
</div>
</div>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- Quick Info Card (Span 4) -->
<div class="md:col-span-4 bg-surface-container-lowest dark:bg-inverse-surface border border-outline-variant dark:border-outline rounded-xl p-6 hover:shadow-[0_4px_12px_rgba(47,16,41,0.05)] transition-shadow">
<div class="flex items-center gap-4 mb-6">
<div class="w-16 h-16 rounded-full bg-surface-variant dark:bg-surface-container overflow-hidden">
<img alt="Profile Picture" class="w-full h-full object-cover" data-alt="A professional headshot of a young woman with dark hair in a modern corporate setting, soft high-key lighting, dark plum and crisp white aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGgX_Ph9S1U6ewX-fN31tPfwPkufR-9GhFgrZROQ2jNNlqWqI0VSDiht9URdZd_0CNRauq7JOCgIxct9Ix92TudIRys_gZD_I1vLrAgc6sSQlseMIMYW7h_JD-N2lPFgwSpkReNh56K0dgkST-ZreCdxNhTPAGPal0vlbVSnwzziu6h6h_ie-QBOEE1MenN1gci07S03PiB9JPS8NvrRXXOUqX083DHDe5VTcOgzDUWH9lTts8bq0XDA"/>
</div>
<div>
<span class="inline-block px-2 py-1 rounded bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary font-label-sm text-label-sm uppercase mb-1">Active</span>
<p class="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">ID: EMP-2023-042</p>
</div>
</div>
<div class="space-y-4">
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-1">Email</p>
<p class="font-body-md text-body-md">elena.r@dayflow.inc</p>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-1">Phone</p>
<p class="font-body-md text-body-md">+1 (555) 019-2834</p>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-1">Location</p>
<p class="font-body-md text-body-md">San Francisco, CA (Hybrid)</p>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-1">Hire Date</p>
<p class="font-body-md text-body-md">March 15, 2021</p>
</div>
</div>
</div>
<!-- Job Details Card (Span 8) -->
<div class="md:col-span-8 bg-surface-container-lowest dark:bg-inverse-surface border border-outline-variant dark:border-outline rounded-xl p-6 hover:shadow-[0_4px_12px_rgba(47,16,41,0.05)] transition-shadow flex flex-col justify-between">
<div>
<div class="flex items-center gap-2 mb-6">
<span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim">work</span>
<h3 class="font-title-md text-title-md">Role &amp; Organization</h3>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
<div class="p-4 rounded-lg bg-surface-container-low dark:bg-surface-container-highest border border-outline-variant dark:border-outline">
<p class="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-2">Department</p>
<p class="font-title-md text-title-md">Product Design</p>
</div>
<div class="p-4 rounded-lg bg-surface-container-low dark:bg-surface-container-highest border border-outline-variant dark:border-outline">
<p class="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-2">Cost Center</p>
<p class="font-title-md text-title-md">CC-4091-UX</p>
</div>
</div>
</div>
<div class="mt-6 pt-6 border-t border-outline-variant dark:border-outline">
<p class="font-label-sm text-label-sm text-on-surface-variant dark:text-outline-variant uppercase mb-3">Direct Manager</p>
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-variant dark:bg-surface-container overflow-hidden">
<img alt="Manager Picture" class="w-full h-full object-cover" data-alt="A professional headshot of an older man with glasses in a bright modern office, minimalist background, corporate aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgMIzG0x7I6lfkeqCNB-nwoTCR6Lsr8CsbXSwWUNiSzxOFjW4Oe9VytrVmqDQ6XVJ6TOQvy8ZHxOE0CK89Ujbg2NyCRzAKlnLhsxt9lgMP2SZ8Wdp1m6koaGtQQb6hLgGABNhNFgG0EUeGspyCzcxI1Cb3c17VNJNGmqZwtyN3rAyZRy3tffmNrJ2yotMQbzDxzBoL-lkKh_q6NSs2j1SnpG7Gcpvi7_Nr-thwqssragxkIIfpulxD_w"/>
</div>
<div>
<p class="font-body-md text-body-md font-semibold">Marcus Chen</p>
<p class="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">VP of Design</p>
</div>
<button class="ml-auto text-primary dark:text-primary-fixed-dim hover:bg-primary-container dark:hover:bg-primary-container p-2 rounded-full transition-colors">
<span class="material-symbols-outlined">mail</span>
</button>
</div>
</div>
</div>
<!-- Personal Documents Card (Span 12) -->
<div class="md:col-span-12 bg-surface-container-lowest dark:bg-inverse-surface border border-outline-variant dark:border-outline rounded-xl p-6 hover:shadow-[0_4px_12px_rgba(47,16,41,0.05)] transition-shadow">
<div class="flex items-center justify-between mb-6">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim">folder</span>
<h3 class="font-title-md text-title-md">My Documents</h3>
</div>
<button class="text-sm font-label-sm uppercase text-primary dark:text-primary-fixed-dim hover:underline">View All</button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-low dark:bg-surface-container-highest border-b border-outline-variant dark:border-outline">
<th class="py-3 px-4 font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-outline-variant">Document Name</th>
<th class="py-3 px-4 font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-outline-variant">Date Added</th>
<th class="py-3 px-4 font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-outline-variant">Type</th>
<th class="py-3 px-4 font-label-sm text-label-sm uppercase text-on-surface-variant dark:text-outline-variant text-right">Action</th>
</tr>
</thead>
<tbody>
<tr class="border-b border-outline-variant dark:border-outline hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors h-12">
<td class="py-2 px-4 font-body-sm text-body-sm flex items-center gap-2">
<span class="material-symbols-outlined text-outline text-sm">description</span>
                                        2024_W4_Tax_Form.pdf
                                    </td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">Jan 10, 2024</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">Tax</td>
<td class="py-2 px-4 text-right">
<button class="text-primary dark:text-primary-fixed-dim hover:bg-primary-container dark:hover:bg-primary-container p-1 rounded transition-colors">
<span class="material-symbols-outlined text-base">download</span>
</button>
</td>
</tr>
<tr class="border-b border-outline-variant dark:border-outline hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors h-12">
<td class="py-2 px-4 font-body-sm text-body-sm flex items-center gap-2">
<span class="material-symbols-outlined text-outline text-sm">contract</span>
                                        Signed_Offer_Letter_2021.pdf
                                    </td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">Mar 01, 2021</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">HR</td>
<td class="py-2 px-4 text-right">
<button class="text-primary dark:text-primary-fixed-dim hover:bg-primary-container dark:hover:bg-primary-container p-1 rounded transition-colors">
<span class="material-symbols-outlined text-base">download</span>
</button>
</td>
</tr>
<tr class="hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors h-12">
<td class="py-2 px-4 font-body-sm text-body-sm flex items-center gap-2">
<span class="material-symbols-outlined text-outline text-sm">verified_user</span>
                                        Employee_Handbook_Ack.pdf
                                    </td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">Mar 15, 2021</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">Compliance</td>
<td class="py-2 px-4 text-right">
<button class="text-primary dark:text-primary-fixed-dim hover:bg-primary-container dark:hover:bg-primary-container p-1 rounded transition-colors">
<span class="material-symbols-outlined text-base">download</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</main>
</div>"""

html_time_off = r"""<!-- Side Navigation (Desktop) -->
<nav class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 py-unit-base px-4 border-r border-outline-variant bg-surface-container-low z-40">
<div class="mb-8 px-4 py-4">
<h1 class="font-headline-lg text-headline-lg text-primary">Dayflow</h1>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">HR Portal</p>
</div>
<div class="flex-1 space-y-2">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span class="material-symbols-outlined" data-icon="event_available">event_available</span>
<span>Attendance</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg transition-all font-title-md text-title-md scale-100 shadow-sm border border-secondary-fixed" href="#">
<span class="material-symbols-outlined" data-icon="calendar_today" data-weight="fill" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
<span>Time Off</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span>My Profile</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
<span>Payroll</span>
</a>
</div>
<div class="mt-auto pt-4 border-t border-outline-variant space-y-2">
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span class="material-symbols-outlined" data-icon="help">help</span>
<span>Help</span>
</a>
<a class="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-all font-title-md text-title-md scale-95 hover:scale-100" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span>Logout</span>
</a>
</div>
</nav>
<!-- Main Content Area -->
<main class="flex-1 md:ml-64 flex flex-col min-h-screen max-w-[1120px] mx-auto w-full">
<!-- Top App Bar (Mobile & Desktop overrides) -->
<header class="flex justify-between items-center px-container-padding w-full sticky top-0 z-50 bg-surface h-16 md:border-none border-b border-outline-variant backdrop-blur-md bg-opacity-90">
<div class="md:hidden">
<h1 class="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">Dayflow</h1>
</div>
<div class="hidden md:block">
<!-- Empty spacer for desktop flex -->
</div>
<div class="flex items-center gap-4">
<button class="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:opacity-80">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:opacity-80">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</button>
<img alt="Employee Profile Avatar" class="w-8 h-8 rounded-full border border-outline-variant object-cover" data-alt="A small, professional circular avatar showing a smiling person in a modern office environment. Soft, diffused lighting. Modern corporate aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIohrOB8NUKrTYdwR0HgauUreON0i0nQTa1nj8DKLrDu9nTzFP7LB731r7tR9KpYjVepu8bjqsePW-uotEYvieGTcAxGvPdqdn0nuuCJIF7LsOL0EJe0yIoASSn-CBcG9eiTGMJdBAq2-rn8n7Pof-7MCWfAn6j5-qpoV2BMJUmyd_volQou3G2RTj39eDEsNpVjs6OhB1TmcbVHR_Z7VOgyxSxQfDDQRxwN5-CR8puro0YeGNmYAnSQ"/>
</div>
</header>
<!-- Page Content -->
<div class="p-margin-mobile md:p-gutter flex-1 space-y-gutter">
<div class="mb-8">
<h2 class="font-display-lg text-display-lg text-on-surface mb-2">Time Off</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Manage your leave requests and view balances.</p>
</div>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
<!-- Balances Section (Spans 8 columns on desktop) -->
<div class="md:col-span-8 flex flex-col gap-gutter">
<div class="glass-card rounded-xl p-6 relative overflow-hidden group hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary-fixed opacity-20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-40 transition-opacity duration-500"></div>
<h3 class="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">account_balance_wallet</span>
                            Current Balances
                        </h3>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
<!-- PTO Balance -->
<div class="p-4 rounded-lg bg-surface-container border border-surface-variant">
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Paid Time Off</p>
<div class="flex items-end gap-2">
<span class="font-headline-lg text-headline-lg text-primary marker-highlight">14.5</span>
<span class="font-body-sm text-body-sm text-on-surface-variant mb-1">days available</span>
</div>
<div class="w-full bg-surface-dim rounded-full h-1.5 mt-4">
<div class="bg-primary h-1.5 rounded-full" style="width: 65%"></div>
</div>
</div>
<!-- Sick Leave Balance -->
<div class="p-4 rounded-lg bg-surface-container border border-surface-variant">
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Sick Leave</p>
<div class="flex items-end gap-2">
<span class="font-headline-lg text-headline-lg text-secondary">6.0</span>
<span class="font-body-sm text-body-sm text-on-surface-variant mb-1">days available</span>
</div>
<div class="w-full bg-surface-dim rounded-full h-1.5 mt-4">
<div class="bg-secondary h-1.5 rounded-full" style="width: 40%"></div>
</div>
</div>
</div>
</div>
<!-- Recent Requests Table -->
<div class="glass-card rounded-xl border border-outline-variant overflow-hidden">
<div class="p-6 border-b border-surface-variant flex justify-between items-center bg-[#FAF8FA]">
<h3 class="font-title-md text-title-md text-on-surface">Recent Requests</h3>
<button class="text-primary font-label-sm text-label-sm uppercase hover:underline">View All</button>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-[#FAF8FA] border-b border-outline-variant">
<th class="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Type</th>
<th class="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Dates</th>
<th class="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Duration</th>
<th class="py-3 px-6 font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Status</th>
</tr>
</thead>
<tbody class="font-body-sm text-body-sm">
<tr class="border-b border-surface-variant hover:bg-surface-container-low transition-colors h-[48px]">
<td class="py-2 px-6 text-on-surface font-medium">PTO</td>
<td class="py-2 px-6 text-on-surface-variant">Oct 12 - Oct 14</td>
<td class="py-2 px-6 text-on-surface-variant">3 Days</td>
<td class="py-2 px-6">
<span class="inline-flex items-center px-2 py-1 rounded-full bg-secondary-fixed/20 text-on-secondary-container font-label-sm text-label-sm">
                                                Approved
                                            </span>
</td>
</tr>
<tr class="border-b border-surface-variant hover:bg-surface-container-low transition-colors h-[48px]">
<td class="py-2 px-6 text-on-surface font-medium">Sick Leave</td>
<td class="py-2 px-6 text-on-surface-variant">Sep 05</td>
<td class="py-2 px-6 text-on-surface-variant">1 Day</td>
<td class="py-2 px-6">
<span class="inline-flex items-center px-2 py-1 rounded-full bg-secondary-fixed/20 text-on-secondary-container font-label-sm text-label-sm">
                                                Approved
                                            </span>
</td>
</tr>
<tr class="hover:bg-surface-container-low transition-colors h-[48px]">
<td class="py-2 px-6 text-on-surface font-medium">PTO</td>
<td class="py-2 px-6 text-on-surface-variant">Nov 20 - Nov 24</td>
<td class="py-2 px-6 text-on-surface-variant">5 Days</td>
<td class="py-2 px-6">
<span class="inline-flex items-center px-2 py-1 rounded-full bg-primary-fixed-dim/20 text-on-primary-fixed-variant font-label-sm text-label-sm">
                                                Pending
                                            </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
<!-- Request Form Section (Spans 4 columns on desktop) -->
<div class="md:col-span-4">
<div class="glass-card rounded-xl p-6 h-full flex flex-col">
<h3 class="font-title-md text-title-md text-on-surface mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-secondary">edit_calendar</span>
                            Request Time Off
                        </h3>
<form class="flex-1 flex flex-col gap-4">
<!-- Leave Type -->
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" for="leave_type">Leave Type</label>
<select class="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all" id="leave_type" name="leave_type">
<option>Paid Time Off (PTO)</option>
<option>Sick Leave</option>
<option>Unpaid Leave</option>
</select>
</div>
<!-- Date Range -->
<div class="grid grid-cols-2 gap-4">
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" for="start_date">Start Date</label>
<input class="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all" id="start_date" name="start_date" type="date"/>
</div>
<div>
<label class="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" for="end_date">End Date</label>
<input class="w-full bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all" id="end_date" name="end_date" type="date"/>
</div>
</div>
<!-- Reason -->
<div class="flex-1">
<label class="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1" for="reason">Reason (Optional)</label>
<textarea class="w-full h-full min-h-[100px] bg-surface border border-outline-variant rounded-[10px] py-2 px-3 text-on-surface font-body-md focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim focus:outline-none transition-all resize-none" id="reason" name="reason" placeholder="Briefly describe your request..." rows="3"></textarea>
</div>
<!-- Submit Button -->
<div class="mt-4 pt-4 border-t border-outline-variant">
<button class="w-full bg-secondary hover:bg-secondary/90 text-on-secondary font-title-md text-title-md py-3 rounded-lg transition-colors flex items-center justify-center gap-2" type="button">
<span class="material-symbols-outlined font-light text-[20px]">send</span>
                                    Submit Request
                                </button>
<p class="text-center font-accent-marker text-accent-marker text-on-surface-variant mt-3 opacity-70">
                                    Needs manager approval
                                </p>
</div>
</form>
</div>
</div>
</div>
</div>
</main>
<!-- Bottom Navigation (Mobile Only) -->
<nav class="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant z-50 flex justify-around items-center h-16 pb-safe">
<a class="flex flex-col items-center justify-center w-full h-full text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-label-sm text-label-sm mt-1">Dashboard</span>
</a>
<a class="flex flex-col items-center justify-center w-full h-full text-primary border-t-2 border-primary bg-primary-container/10" href="#">
<span class="material-symbols-outlined" data-icon="calendar_today" data-weight="fill" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
<span class="font-label-sm text-label-sm mt-1 font-bold">Time Off</span>
</a>
<a class="flex flex-col items-center justify-center w-full h-full text-on-surface-variant" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-label-sm text-label-sm mt-1">Profile</span>
</a>
</nav>"""

def html_to_jsx(html):
    jsx = re.sub(r'class="([^"]*)"', r'className="\1"', html)
    for tag in ['input', 'img', 'hr', 'br']:
        jsx = re.sub(rf'<{tag}([^>]*?)(?<!/)>', rf'<{tag}\1 />', jsx)
    
    jsx = jsx.replace('stroke-width', 'strokeWidth')
    jsx = jsx.replace('stroke-dasharray', 'strokeDasharray')
    jsx = jsx.replace('stroke-dashoffset', 'strokeDashoffset')
    jsx = jsx.replace('stroke-linecap', 'strokeLinecap')
    jsx = jsx.replace('viewbox', 'viewBox')
    jsx = jsx.replace('preserveaspectratio', 'preserveAspectRatio')
    jsx = jsx.replace('lineargradient', 'linearGradient')
    jsx = jsx.replace('stop-color', 'stopColor')
    jsx = jsx.replace('stop-opacity', 'stopOpacity')

    # Convert style strings safely without backslash
    jsx = re.sub(r'style="([^"]*)"', r'style={{\1}}', jsx)
    jsx = jsx.replace("width: 94%", "width: '94%'")
    jsx = jsx.replace("width: 89%;", "width: '89%'")
    jsx = jsx.replace("width: 65%", "width: '65%'")
    jsx = jsx.replace("width: 40%", "width: '40%'")
    jsx = jsx.replace("font-variation-settings: 'FILL' 0;", "fontVariationSettings: \"'FILL' 0\"")
    jsx = jsx.replace("font-variation-settings: 'FILL' 1;", "fontVariationSettings: \"'FILL' 1\"")
    
    jsx = jsx.replace('for=', 'htmlFor=')
    jsx = jsx.replace('disabled=""', 'disabled')
    
    # Replace comments
    jsx = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', jsx, flags=re.DOTALL)
    
    return jsx

pages = {
    "payroll": html_payroll,
    "attendance": html_attendance,
    "profile": html_profile,
    "time-off": html_time_off
}

base_dir = "d:/odoo bangalore/DayFlow/frontend/src/app/employee-dashboard"

for name, html in pages.items():
    jsx_content = f"""'use client';

import Link from 'next/link';

export default function Employee{name.replace('-', ' ').title().replace(' ', '')}() {{
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      {html_to_jsx(html)}
    </div>
  );
}}
"""
    dir_path = os.path.join(base_dir, name)
    os.makedirs(dir_path, exist_ok=True)
    with open(os.path.join(dir_path, "page.js"), "w", encoding="utf-8") as f:
        f.write(jsx_content)
        
print("Successfully generated all employee pages!")

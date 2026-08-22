import os
import re

html_data = {
    "time-off": r"""<!-- Time Off - Dayflow -->
<div class="flex-1 flex flex-col md:ml-64 relative min-h-screen">
<!-- TopAppBar -->
<header class="bg-surface dark:bg-surface-dim sticky top-0 w-full z-40 border-b border-outline-variant dark:border-outline h-16 px-gutter flex justify-between items-center transition-colors">
<div class="flex-1 flex items-center gap-4 max-w-md">
<div class="relative w-full hidden md:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-shadow text-on-surface" placeholder="Search employees, requests..." type="text">
</div>
<button class="md:hidden text-on-surface-variant p-2 rounded-full hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined">menu</span>
</button>
</div>
<div class="flex items-center gap-2 md:gap-4">
<button class="text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors p-2 rounded-full relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
</button>
<button class="text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors p-2 rounded-full hidden sm:block">
<span class="material-symbols-outlined">apps</span>
</button>
<div class="h-8 w-px bg-outline-variant mx-2 hidden sm:block"></div>
<button class="flex items-center gap-2 focus:ring-2 focus:ring-primary-container outline-none rounded-full overflow-hidden border border-outline-variant">
<img alt="Administrator Profile" class="w-8 h-8 object-cover rounded-full bg-surface-container-high" data-alt="A professional headshot of a corporate HR administrator, looking friendly and approachable, modern well-lit office background, high quality photography, professional humanist aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm0Arlux9LDS02wq-3ccxiorgGEn9Jq7yHVwrTVImM_BUIvUw9Zckhk4uY961_ferIKz2Ggmlhveol7D-fsbb-Bj-OfklT9w9FcZF05aXw4ulDbPWIDKN_BX6yFP_LGQYVRHi5GzB1csdc1RqgWrtTTOjak9PKVIubLLjGxZOsYpaPndwVut5eIy980JEJ0tx0w8dh98Tsv-ImcbedBiPNxRqJOnlXBKttxhFXNOsY4hE8z7aQ4VLU0A">
</button>
</div>
</header>
<!-- Canvas -->
<main class="flex-1 overflow-y-auto p-4 md:p-gutter lg:p-container-padding">
<div class="max-w-[1120px] mx-auto w-full">
<!-- Page Header -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
<div>
<h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">Time Off Management</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">Review and manage employee leave requests.</p>
</div>
<button class="bg-primary text-on-primary px-4 py-2.5 rounded-lg font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary">
<span class="material-symbols-outlined text-xl">add</span>
                        New Request
                    </button>
</div>
<!-- Summary Cards Bento -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<!-- Pending Approvals -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 relative overflow-hidden group hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div class="absolute top-0 left-0 w-1 h-full bg-[#f59e0b]"></div>
<div class="flex justify-between items-start mb-4">
<h3 class="font-title-md text-title-md text-on-surface">Pending Approvals</h3>
<div class="w-10 h-10 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center">
<span class="material-symbols-outlined">hourglass_empty</span>
</div>
</div>
<div class="flex items-end gap-3">
<span class="font-display-lg text-display-lg text-on-background">12</span>
<span class="font-body-sm text-body-sm text-error bg-error/10 px-2 py-0.5 rounded flex items-center gap-1 mb-2">
<span class="material-symbols-outlined text-[14px]">arrow_upward</span> 3 new
                            </span>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 tracking-wider">Requires attention</p>
</div>
<!-- Upcoming Leaves -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div class="flex justify-between items-start mb-4">
<h3 class="font-title-md text-title-md text-on-surface">Upcoming Leaves</h3>
<div class="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
<span class="material-symbols-outlined">event_upcoming</span>
</div>
</div>
<div class="flex items-end gap-3">
<span class="font-display-lg text-display-lg text-on-background">24</span>
<span class="font-body-sm text-body-sm text-on-surface-variant mb-2">this week</span>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 tracking-wider">Scheduled absences</p>
</div>
<!-- Team Availability -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow relative">
<!-- Marker Highlight Accent -->
<div class="absolute -top-3 -right-2 transform rotate-12 bg-tertiary-fixed-dim/50 px-2 py-0.5 rounded-sm pointer-events-none">
<span class="font-accent-marker text-accent-marker text-primary">All hands!</span>
</div>
<div class="flex justify-between items-start mb-4">
<h3 class="font-title-md text-title-md text-on-surface">Team Availability Today</h3>
<div class="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
<span class="material-symbols-outlined">group</span>
</div>
</div>
<div class="flex items-center gap-4">
<div class="relative w-16 h-16">
<svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path class="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4"></path>
<path class="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-dasharray="85, 100" stroke-width="4"></path>
</svg>
<div class="absolute inset-0 flex items-center justify-center font-title-md text-title-md">
                                    85%
                                </div>
</div>
<div>
<p class="font-body-sm text-body-sm text-on-surface-variant">142/165 Present</p>
<p class="font-body-sm text-body-sm text-on-surface-variant">23 On Leave</p>
</div>
</div>
</div>
</div>
<!-- Requests Table Section -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden">
<div class="p-4 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FAF8FA]">
<h3 class="font-title-md text-title-md text-on-surface">Recent Requests</h3>
<div class="flex gap-2 w-full sm:w-auto">
<select class="bg-surface border border-outline-variant text-body-sm font-body-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-container outline-none text-on-surface flex-1 sm:flex-none">
<option>All Statuses</option>
<option>Pending</option>
<option>Approved</option>
<option>Rejected</option>
</select>
<button class="p-1.5 border border-outline-variant rounded-lg bg-surface text-on-surface-variant hover:bg-surface-container-low transition-colors">
<span class="material-symbols-outlined text-xl">filter_list</span>
</button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-[#FAF8FA] border-b border-outline-variant">
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Employee</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Type</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Dates</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider hidden md:table-cell">Duration</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider hidden lg:table-cell">Reason</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant">
<!-- Row 1: Pending -->
<tr class="hover:bg-surface-container-lowest transition-colors group h-12">
<td class="py-3 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-title-md text-sm">
                                                JD
                                            </div>
<div>
<p class="font-body-sm text-body-sm font-medium text-on-surface">Jane Doe</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Engineering</p>
</div>
</div>
</td>
<td class="py-3 px-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-container text-on-surface">Annual</span>
</td>
<td class="py-3 px-4">
<p class="font-body-sm text-body-sm text-on-surface">Oct 24 - Oct 28</p>
</td>
<td class="py-3 px-4 hidden md:table-cell">
<p class="font-body-sm text-body-sm text-on-surface">5 days</p>
</td>
<td class="py-3 px-4 hidden lg:table-cell max-w-[200px] truncate text-on-surface-variant font-body-sm text-body-sm">
                                        Family vacation to the mountains...
                                    </td>
<td class="py-3 px-4 text-right">
<div class="flex justify-end gap-2">
<button class="w-8 h-8 rounded border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors" title="Approve">
<span class="material-symbols-outlined text-[18px]">check</span>
</button>
<button class="w-8 h-8 rounded border border-outline-variant text-on-surface-variant hover:bg-error hover:border-error hover:text-on-error flex items-center justify-center transition-colors" title="Reject">
<span class="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</td>
</tr>
<!-- Row 2: Pending Sick -->
<tr class="hover:bg-surface-container-lowest transition-colors group h-12">
<td class="py-3 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-title-md text-sm">
                                                MS
                                            </div>
<div>
<p class="font-body-sm text-body-sm font-medium text-on-surface">Michael Smith</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Marketing</p>
</div>
</div>
</td>
<td class="py-3 px-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-error/10 text-error">Sick</span>
</td>
<td class="py-3 px-4">
<p class="font-body-sm text-body-sm text-on-surface">Oct 18</p>
</td>
<td class="py-3 px-4 hidden md:table-cell">
<p class="font-body-sm text-body-sm text-on-surface">1 day</p>
</td>
<td class="py-3 px-4 hidden lg:table-cell max-w-[200px] truncate text-on-surface-variant font-body-sm text-body-sm">
                                        Not feeling well, fever.
                                    </td>
<td class="py-3 px-4 text-right">
<div class="flex justify-end gap-2">
<button class="w-8 h-8 rounded border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors" title="Approve">
<span class="material-symbols-outlined text-[18px]">check</span>
</button>
<button class="w-8 h-8 rounded border border-outline-variant text-on-surface-variant hover:bg-error hover:border-error hover:text-on-error flex items-center justify-center transition-colors" title="Reject">
<span class="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</td>
</tr>
<!-- Row 3: Approved -->
<tr class="hover:bg-surface-container-lowest transition-colors group h-12 bg-surface-bright/50">
<td class="py-3 px-4">
<div class="flex items-center gap-3">
<img class="w-8 h-8 rounded-full object-cover border border-outline-variant" data-alt="A small circular avatar of a female professional employee, subtle corporate background, bright and clear." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCcro5iaMFnHr1xOT4fpEceJ-LwfBKVaLTm-jkguNuVvo78MwPdbXqFQmfrCluLBTWpIi8EU8W_jk0-162_xU0c5KSDiqBrOaqYOIxjYVlD0jUwYbs4UaG0bjZRHUMCRuvwEsTpyZR3JmUletnBpTQa4GWUb2BGhyLYyE3clwKGVtH43l3lJLETE0Kc7JmVzHkx0tBcaHTEhw5ggenflO8Ba_OjlgnsII6ZtnhO06GohyHr2H18Px8Qg">
<div>
<p class="font-body-sm text-body-sm font-medium text-on-surface">Sarah Connor</p>
<p class="font-label-sm text-label-sm text-on-surface-variant">Sales</p>
</div>
</div>
</td>
<td class="py-3 px-4">
<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-container text-on-surface">Casual</span>
</td>
<td class="py-3 px-4">
<p class="font-body-sm text-body-sm text-on-surface">Oct 20</p>
</td>
<td class="py-3 px-4 hidden md:table-cell">
<p class="font-body-sm text-body-sm text-on-surface">0.5 days</p>
</td>
<td class="py-3 px-4 hidden lg:table-cell max-w-[200px] truncate text-on-surface-variant font-body-sm text-body-sm">
                                        Personal errands in the afternoon.
                                    </td>
<td class="py-3 px-4 text-right">
<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
<span class="material-symbols-outlined text-[14px]">done_all</span> Approved
                                        </span>
</td>
</tr>
</tbody>
</table>
</div>
<div class="p-4 border-t border-outline-variant flex justify-between items-center bg-[#FAF8FA]">
<p class="font-label-sm text-label-sm text-on-surface-variant">Showing 1 to 3 of 12 requests</p>
<div class="flex gap-1">
<button class="p-1 rounded text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50" disabled="">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<button class="p-1 rounded text-on-surface-variant hover:bg-surface-container-high">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</main>
</div>
""",
    "payroll": r"""<!-- Payroll - Dayflow -->
<div class="flex-1 md:ml-64 flex flex-col min-h-screen">
<!-- Top App Bar -->
<header class="bg-surface dark:bg-surface-dim text-primary dark:text-primary-fixed-dim docked top-0 w-full sticky z-40 border-b border-outline-variant dark:border-outline flat no shadows flex justify-between items-center h-16 px-gutter">
<!-- Mobile Menu & Title -->
<div class="flex items-center gap-4">
<button class="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors focus:ring-2 ring-primary-container outline-none">
<span class="material-symbols-outlined">menu</span>
</button>
<div class="hidden md:flex items-center gap-4 text-on-surface-variant dark:text-surface-variant">
<span class="material-symbols-outlined text-[20px]">search</span>
<input class="bg-transparent border-none focus:ring-0 text-body-sm font-body-sm placeholder:text-outline w-64 p-0" placeholder="Search..." type="text">
</div>
</div>
<div class="md:hidden font-accent-marker text-accent-marker text-secondary">
                Dayflow
            </div>
<!-- Actions & Profile -->
<div class="flex items-center gap-2">
<button class="p-2 text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors rounded-full focus:ring-2 ring-primary-container outline-none relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
</button>
<button class="p-2 text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors rounded-full focus:ring-2 ring-primary-container outline-none hidden md:block">
<span class="material-symbols-outlined">apps</span>
</button>
<div class="ml-4 h-8 w-8 rounded-full bg-surface-variant border border-outline-variant overflow-hidden flex items-center justify-center">
<img alt="Administrator Profile" class="w-full h-full object-cover" data-alt="A professional headshot of a corporate HR administrator, looking friendly and competent. High-key lighting, bright modern office setting, plum and teal subtle accents in the background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqr55u7AYzX7oTsI4D5xhmMIMo769r1i-Yoth1Ii_3mPD_uCGitkRKh8nVTZh2yatdvBpWzfCD1gJCRWh_igwHPgBnMeFxrnP4o2BLLXqUePLwOqovletoLHrXuEYFyIjUq6lOsZI1q1yESiMiCo_9lMmLtosCEeab_J0vYQOrercQfvSdEdcD_mVsRjoh7lne0PTT4dcd8kaPS-XjWEjVb-1kfKe9E22CluaKG-zbDKGEA9wn5ZDSOg">
</div>
</div>
</header>
<!-- Page Content -->
<main class="flex-1 p-margin-mobile md:p-gutter max-w-max-width mx-auto w-full flex flex-col gap-6">
<!-- Page Header -->
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h2 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-background">Payroll Processing</h2>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Review and process employee salaries for the current period.</p>
</div>
<div class="flex items-center gap-3">
<!-- Month Selector -->
<div class="relative flex items-center border border-outline-variant rounded-lg bg-surface-container-lowest px-3 py-2">
<span class="material-symbols-outlined text-on-surface-variant mr-2 text-[20px]">calendar_month</span>
<select class="appearance-none bg-transparent border-none p-0 pr-6 focus:ring-0 font-body-sm text-body-sm text-on-surface font-medium cursor-pointer">
<option>October 2023</option>
<option>September 2023</option>
<option>August 2023</option>
</select>
<span class="material-symbols-outlined text-on-surface-variant absolute right-2 pointer-events-none text-[20px]">arrow_drop_down</span>
</div>
<!-- Export Button -->
<button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors border border-outline-variant font-label-sm text-label-sm font-medium shadow-sm">
<span class="material-symbols-outlined text-[18px]">download</span>
                        Export
                    </button>
<!-- Process Button -->
<button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors shadow-sm font-label-sm text-label-sm font-medium">
<span class="material-symbols-outlined text-[18px]">play_arrow</span>
                        Process Payroll
                    </button>
</div>
</div>
<!-- Summary Metric Cards -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
<!-- Metric 1 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col gap-2 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">Total Payroll Cost</span>
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[18px]">account_balance</span>
</div>
</div>
<div class="font-display-lg text-display-lg text-on-surface mt-2 relative">
                        $245,890
                        <span class="absolute -right-2 top-0 font-accent-marker text-accent-marker text-secondary-fixed-dim bg-secondary/10 px-2 rounded -rotate-6 hidden md:inline-block">Approved</span>
</div>
<div class="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
<span>+2.4% from last month</span>
</div>
</div>
<!-- Metric 2 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col gap-2 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">Employees Processed</span>
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[18px]">groups</span>
</div>
</div>
<div class="font-display-lg text-display-lg text-on-surface mt-2">
                        142 <span class="font-title-md text-title-md text-outline">/ 150</span>
</div>
<div class="w-full bg-surface-variant rounded-full h-1.5 mt-2">
<div class="bg-secondary h-1.5 rounded-full" style="width: 94%"></div>
</div>
</div>
<!-- Metric 3 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col gap-2 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase">Pending Approvals</span>
<div class="w-8 h-8 rounded-full bg-error-container flex items-center justify-center text-error">
<span class="material-symbols-outlined text-[18px]">error</span>
</div>
</div>
<div class="font-display-lg text-display-lg text-on-surface mt-2">
                        8
                    </div>
<div class="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
<span>Requires manager sign-off</span>
</div>
</div>
</div>
<!-- Data Table Section -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden flex flex-col flex-1">
<div class="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
<h3 class="font-title-md text-title-md text-on-surface">Employee Details</h3>
<div class="flex items-center gap-2">
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
<input class="pl-9 pr-4 py-1.5 border border-outline-variant rounded-lg font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container outline-none bg-surface-bright w-64 transition-all" placeholder="Search employee..." type="text">
</div>
<button class="p-1.5 text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-[20px]">filter_list</span>
</button>
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-[#FAF8FA] border-b border-outline-variant">
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Employee Name</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">Role / Dept</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Base Pay</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Allowances</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Deductions</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Net Pay</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-center">Status</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant">
<!-- Row 1 -->
<tr class="hover:bg-surface/50 transition-colors h-[48px] group">
<td class="py-2 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-label-sm font-bold text-xs">JD</div>
<div class="font-body-sm text-body-sm font-medium text-on-surface">Jane Doe</div>
</div>
</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant">Senior Engineer<br><span class="text-xs text-outline">Engineering</span></td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right">$8,500.00</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-secondary">+$450.00</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-error">-$1,250.00</td>
<td class="py-2 px-4 font-body-sm text-body-sm font-bold text-on-surface text-right">$7,700.00</td>
<td class="py-2 px-4 text-center">
<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">Ready</span>
</td>
<td class="py-2 px-4 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface/50 transition-colors h-[48px] group">
<td class="py-2 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-sm font-bold text-xs">JS</div>
<div class="font-body-sm text-body-sm font-medium text-on-surface">John Smith</div>
</div>
</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant">Marketing Mgr<br><span class="text-xs text-outline">Marketing</span></td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right">$6,200.00</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-secondary">+$200.00</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-error">-$850.00</td>
<td class="py-2 px-4 font-body-sm text-body-sm font-bold text-on-surface text-right">$5,550.00</td>
<td class="py-2 px-4 text-center">
<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-error/10 text-error border border-error/20">Pending</span>
</td>
<td class="py-2 px-4 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface/50 transition-colors h-[48px] group bg-surface-container/30">
<td class="py-2 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-label-sm font-bold text-xs">AW</div>
<div class="font-body-sm text-body-sm font-medium text-on-surface">Alice Wong</div>
</div>
</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface-variant">Designer<br><span class="text-xs text-outline">Product</span></td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right">$5,800.00</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-secondary">+$150.00</td>
<td class="py-2 px-4 font-body-sm text-body-sm text-on-surface text-right text-error">-$700.00</td>
<td class="py-2 px-4 font-body-sm text-body-sm font-bold text-on-surface text-right">$5,250.00</td>
<td class="py-2 px-4 text-center">
<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">Ready</span>
</td>
<td class="py-2 px-4 text-right">
<button class="text-on-surface-variant hover:text-primary transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none">
<span class="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination -->
<div class="p-4 border-t border-outline-variant flex items-center justify-between bg-[#FAF8FA] mt-auto">
<span class="font-body-sm text-body-sm text-on-surface-variant">Showing 1 to 3 of 150 entries</span>
<div class="flex items-center gap-1">
<button class="p-1 rounded text-outline hover:bg-surface-container transition-colors disabled:opacity-50" disabled="">
<span class="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button class="w-8 h-8 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-medium flex items-center justify-center">1</button>
<button class="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium flex items-center justify-center transition-colors">2</button>
<button class="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container font-label-sm text-label-sm font-medium flex items-center justify-center transition-colors">3</button>
<span class="text-outline">...</span>
<button class="p-1 rounded text-on-surface-variant hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
</div>
</main>
</div>
""",
    "reports": r"""<!-- Reports Overview - Dayflow -->
<!-- Main Content -->
<main class="ml-64 p-gutter max-w-max-width mx-auto pb-24 w-full">
<!-- Header -->
<div class="flex justify-between items-end mb-8">
<div>
<h1 class="font-headline-lg text-headline-lg text-on-background">Reports &amp; Analytics</h1>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">High-level insights and organizational metrics for management.</p>
</div>
<div class="flex gap-3">
<button class="px-4 py-2 bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm rounded-lg hover:bg-surface-container-highest transition-colors border border-outline-variant flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">calendar_month</span> Last 30 Days
                </button>
<button class="px-4 py-2 bg-primary text-on-primary font-label-sm text-label-sm rounded-lg hover:bg-primary-container transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">download</span> Export
                </button>
</div>
</div>
<!-- Summary Card Row -->
<div class="grid grid-cols-12 gap-6 mb-8">
<!-- Total Headcount -->
<div class="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div class="flex justify-between items-start mb-4">
<div class="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span class="material-symbols-outlined">group_add</span>
</div>
<div class="bg-green-100 text-green-700 px-2 py-1 rounded-[4px] flex items-center gap-1 font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[14px]">trending_up</span>
                        +5.2%
                    </div>
</div>
<div class="mt-2">
<p class="font-body-sm text-body-sm text-on-surface-variant mb-1">Total Headcount</p>
<div class="font-display-lg text-[32px] font-bold text-on-surface leading-tight">1,248</div>
</div>
</div>
<!-- Turnover Rate -->
<div class="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div class="flex justify-between items-start mb-4">
<div class="w-10 h-10 rounded-lg bg-error-container text-error flex items-center justify-center">
<span class="material-symbols-outlined">person_remove</span>
</div>
<div class="bg-green-100 text-green-700 px-2 py-1 rounded-[4px] flex items-center gap-1 font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[14px]">trending_down</span>
                        -1.1%
                    </div>
</div>
<div class="mt-2">
<p class="font-body-sm text-body-sm text-on-surface-variant mb-1">Turnover Rate</p>
<div class="font-display-lg text-[32px] font-bold text-on-surface leading-tight">4.2%</div>
</div>
</div>
<!-- Avg. Attendance -->
<div class="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div class="flex justify-between items-start mb-4">
<div class="w-10 h-10 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center">
<span class="material-symbols-outlined">how_to_reg</span>
</div>
<div class="bg-orange-100 text-orange-700 px-2 py-1 rounded-[4px] flex items-center gap-1 font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                        0.0%
                    </div>
</div>
<div class="mt-2">
<p class="font-body-sm text-body-sm text-on-surface-variant mb-1">Avg. Attendance</p>
<div class="font-display-lg text-[32px] font-bold text-on-surface leading-tight">94.5%</div>
</div>
</div>
<!-- Monthly Payroll -->
<div class="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<div class="flex justify-between items-start mb-4">
<div class="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
<span class="material-symbols-outlined">payments</span>
</div>
<div class="bg-red-100 text-red-700 px-2 py-1 rounded-[4px] flex items-center gap-1 font-label-sm text-label-sm">
<span class="material-symbols-outlined text-[14px]">trending_up</span>
                        +8.4%
                    </div>
</div>
<div class="mt-2">
<p class="font-body-sm text-body-sm text-on-surface-variant mb-1">Monthly Payroll</p>
<div class="font-display-lg text-[32px] font-bold text-on-surface leading-tight">$1.4M</div>
</div>
</div>
</div>
<!-- Main Analytics Grid -->
<div class="grid grid-cols-12 gap-6 mb-8">
<!-- Headcount vs Turnover (Span 8) -->
<div class="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow min-h-[360px] flex flex-col">
<div class="flex justify-between items-start mb-6">
<div>
<h3 class="font-title-md text-title-md text-on-surface">Headcount Growth vs Turnover</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Year over year comparison</p>
</div>
<button class="text-on-surface-variant hover:bg-surface-container rounded-full p-1 transition-colors">
<span class="material-symbols-outlined">more_horiz</span>
</button>
</div>
<!-- Faux Bar Chart Area -->
<div class="flex-1 relative flex items-end pt-8 pb-8">
<!-- Y Axis Labels -->
<div class="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-[10px] text-on-surface-variant font-label-sm h-full pb-4">
<span>1500</span>
<span>1000</span>
<span>500</span>
<span>0</span>
</div>
<!-- Grid Lines -->
<div class="absolute left-10 right-0 top-0 bottom-12 flex flex-col justify-between h-full pb-4 pointer-events-none">
<div class="border-b border-outline-variant opacity-20 w-full"></div>
<div class="border-b border-outline-variant opacity-20 w-full"></div>
<div class="border-b border-outline-variant opacity-20 w-full"></div>
<div class="border-b border-outline-variant opacity-20 w-full"></div>
</div>
<!-- Bar Chart Content -->
<div class="ml-10 w-full h-full relative flex justify-between items-end px-4 z-10 pb-4">
<!-- Jan -->
<div class="w-12 h-[60%] flex flex-col justify-end group">
<div class="w-full bg-[#E6D4F0] h-[75%] rounded-t-sm"></div>
<div class="w-full bg-[#6C34CF] h-[25%] rounded-b-sm"></div>
</div>
<!-- Feb -->
<div class="w-12 h-[65%] flex flex-col justify-end group">
<div class="w-full bg-[#E6D4F0] h-[75%] rounded-t-sm"></div>
<div class="w-full bg-[#6C34CF] h-[25%] rounded-b-sm"></div>
</div>
<!-- Mar -->
<div class="w-12 h-[63%] flex flex-col justify-end group">
<div class="w-full bg-[#E6D4F0] h-[80%] rounded-t-sm"></div>
<div class="w-full bg-[#6C34CF] h-[20%] rounded-b-sm"></div>
</div>
<!-- Apr -->
<div class="w-12 h-[70%] flex flex-col justify-end group">
<div class="w-full bg-[#E6D4F0] h-[70%] rounded-t-sm"></div>
<div class="w-full bg-[#6C34CF] h-[30%] rounded-b-sm"></div>
</div>
<!-- May -->
<div class="w-12 h-[75%] flex flex-col justify-end group">
<div class="w-full bg-[#E6D4F0] h-[80%] rounded-t-sm"></div>
<div class="w-full bg-[#6C34CF] h-[20%] rounded-b-sm"></div>
</div>
<!-- Jun -->
<div class="w-12 h-[80%] flex flex-col justify-end group">
<div class="w-full bg-[#E6D4F0] h-[75%] rounded-t-sm"></div>
<div class="w-full bg-[#6C34CF] h-[25%] rounded-b-sm"></div>
</div>
</div>
<!-- X Axis Labels -->
<div class="absolute left-10 right-0 bottom-8 flex justify-between px-4 text-[12px] text-on-surface-variant font-label-sm">
<span class="w-12 text-center">Jan</span>
<span class="w-12 text-center">Feb</span>
<span class="w-12 text-center">Mar</span>
<span class="w-12 text-center">Apr</span>
<span class="w-12 text-center">May</span>
<span class="w-12 text-center">Jun</span>
</div>
<!-- Legend -->
<div class="absolute left-10 right-0 bottom-0 flex justify-center gap-6 text-[12px] text-on-surface-variant font-label-sm">
<div class="flex items-center gap-2"><div class="w-3 h-3 rounded-sm bg-[#E6D4F0]"></div><span>Total Headcount</span></div>
<div class="flex items-center gap-2"><div class="w-3 h-3 rounded-sm bg-[#6C34CF]"></div><span>Turnover</span></div>
</div>
</div>
</div>
<!-- Departmental Payroll (Span 4) -->
<div class="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow flex flex-col">
<div class="mb-6">
<h3 class="font-title-md text-title-md text-on-surface">Departmental Payroll</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Distribution by division</p>
</div>
<div class="flex-1 flex flex-col justify-center items-center gap-8">
<!-- Faux Pie Chart -->
<div class="w-48 h-48 rounded-full relative flex items-center justify-center" style="background: conic-gradient(#6C34CF 0% 45%, #1D70F5 45% 75%, #F09A0A 75% 90%, #E2E8F0 90% 100%);">
<div class="absolute inset-5 bg-surface-container-lowest rounded-full flex flex-col items-center justify-center">
<span class="text-body-sm text-on-surface-variant">Total</span>
<span class="font-title-md text-title-md font-bold text-on-surface">$1.4M</span>
</div>
</div>
<!-- Legend -->
<div class="w-full space-y-3">
<div class="flex justify-between items-center text-body-sm">
<div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-[#6C34CF]"></div><span>Engineering</span></div>
<span class="font-semibold text-on-surface-variant">45%</span>
</div>
<div class="flex justify-between items-center text-body-sm">
<div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-[#1D70F5]"></div><span>Sales &amp; Marketing</span></div>
<span class="font-semibold text-on-surface-variant">30%</span>
</div>
<div class="flex justify-between items-center text-body-sm">
<div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-[#F09A0A]"></div><span>Operations</span></div>
<span class="font-semibold text-on-surface-variant">15%</span>
</div>
<div class="flex justify-between items-center text-body-sm">
<div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-[#E2E8F0]"></div><span>Other</span></div>
<span class="font-semibold text-on-surface-variant">10%</span>
</div>
</div>
</div>
</div>
</div>
<!-- Secondary Analytics Section -->
<div class="grid grid-cols-12 gap-6">
<!-- Headcount Growth Trend (Span 8) -->
<div class="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow min-h-[300px] flex flex-col">
<div class="flex justify-between items-center mb-6">
<h3 class="font-title-md text-title-md text-on-surface">Headcount Growth</h3>
<select class="bg-surface border-none text-body-sm text-on-surface-variant focus:ring-0 cursor-pointer rounded-lg px-3 py-1">
<option>2023 YTD</option>
<option>2022</option>
</select>
</div>
<!-- Faux Line Chart Area -->
<div class="flex-1 relative flex items-end pt-8">
<!-- Y Axis Labels -->
<div class="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-on-surface-variant font-label-sm h-full pb-4">
<span>300</span>
<span>200</span>
<span>100</span>
<span>0</span>
</div>
<!-- Grid Lines -->
<div class="absolute left-8 right-0 top-0 bottom-6 flex flex-col justify-between h-full pb-4 pointer-events-none">
<div class="border-b border-outline-variant opacity-20 w-full"></div>
<div class="border-b border-outline-variant opacity-20 w-full"></div>
<div class="border-b border-outline-variant opacity-20 w-full"></div>
<div class="border-b border-outline-variant opacity-20 w-full"></div>
</div>
<!-- Chart Content (SVG) -->
<div class="ml-8 w-full h-full relative">
<svg class="w-full h-full" preserveaspectratio="none" viewbox="0 0 100 100">
<!-- Area fill -->
<defs>
<lineargradient id="primaryGrad2" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stop-color="#714b67" stop-opacity="0.15"></stop>
<stop offset="100%" stop-color="#714b67" stop-opacity="0.02"></stop>
</lineargradient>
</defs>
<path d="M0 85 Q 30 75, 40 60 T 75 40 T 100 20 L 100 100 L 0 100 Z" fill="url(#primaryGrad2)"></path>
<!-- Line -->
<path d="M0 85 Q 30 75, 40 60 T 75 40 T 100 20" fill="none" stroke="#714b67" stroke-linecap="round" stroke-width="4"></path>
<!-- Data Points -->
<circle cx="40" cy="60" fill="#ffffff" r="5" stroke="#714b67" stroke-width="3"></circle>
<circle cx="75" cy="40" fill="#ffffff" r="5" stroke="#714b67" stroke-width="3"></circle>
</svg>
</div>
<!-- X Axis Labels -->
<div class="absolute left-8 right-0 bottom-0 flex justify-between text-[10px] text-on-surface-variant font-label-sm px-2">
<span>Q1</span>
<span>Q2</span>
<span>Q3</span>
<span>Q4</span>
</div>
</div>
</div>
<!-- Exportable Reports Section (Span 4) -->
<div class="col-span-12 lg:col-span-4 flex flex-col">
<h2 class="font-title-md text-title-md text-on-surface mb-4">Exportable Reports</h2>
<div class="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex-1">
<!-- Table Header -->
<div class="bg-[#FAF8FA] grid grid-cols-12 gap-2 px-4 py-3 border-b border-outline-variant font-label-sm text-[10px] uppercase text-on-surface-variant">
<div class="col-span-6">Report Name</div>
<div class="col-span-3">Frequency</div>
<div class="col-span-3 text-right">Action</div>
</div>
<!-- Table Rows -->
<div class="divide-y divide-outline-variant">
<div class="grid grid-cols-12 gap-2 px-4 py-4 items-center hover:bg-surface-bright transition-colors">
<div class="col-span-6 flex items-center gap-2 text-body-sm text-on-surface">
<span class="material-symbols-outlined text-secondary text-[18px]">description</span>
                            Monthly Payroll
                        </div>
<div class="col-span-3 text-[12px] text-on-surface-variant">Monthly</div>
<div class="col-span-3 flex justify-end">
<button class="px-2 py-1 border border-outline-variant rounded-md text-on-surface-variant text-[11px] hover:bg-surface-container transition-colors flex items-center gap-1">
                                Download <span class="material-symbols-outlined text-[14px]">file_download</span>
</button>
</div>
</div>
<div class="grid grid-cols-12 gap-2 px-4 py-4 items-center hover:bg-surface-bright transition-colors">
<div class="col-span-6 flex items-center gap-2 text-body-sm text-on-surface">
<span class="material-symbols-outlined text-secondary text-[18px]">groups</span>
                            Attendance
                        </div>
<div class="col-span-3 text-[12px] text-on-surface-variant">Weekly</div>
<div class="col-span-3 flex justify-end">
<button class="px-2 py-1 border border-outline-variant rounded-md text-on-surface-variant text-[11px] hover:bg-surface-container transition-colors flex items-center gap-1">
                                Download <span class="material-symbols-outlined text-[14px]">file_download</span>
</button>
</div>
</div>
<div class="grid grid-cols-12 gap-2 px-4 py-4 items-center hover:bg-surface-bright transition-colors">
<div class="col-span-6 flex items-center gap-2 text-body-sm text-on-surface">
<span class="material-symbols-outlined text-secondary text-[18px]">event_available</span>
                            Leave Utilization
                        </div>
<div class="col-span-3 text-[12px] text-on-surface-variant">Quarterly</div>
<div class="col-span-3 flex justify-end">
<button class="px-2 py-1 border border-outline-variant rounded-md text-on-surface-variant text-[11px] hover:bg-surface-container transition-colors flex items-center gap-1">
                                Download <span class="material-symbols-outlined text-[14px]">file_download</span>
</button>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
""",
    "attendance": r"""<!-- Attendance - Dayflow -->
<div class="flex-1 md:ml-64 flex flex-col min-h-screen">
<!-- Shared Component: TopAppBar -->
<header class="flex justify-between items-center h-16 px-gutter bg-surface sticky top-0 z-40 border-b border-outline-variant">
<!-- Left Side: Mobile Menu & Breadcrumb -->
<div class="flex items-center gap-4">
<button class="md:hidden text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors focus:ring-2 ring-primary-container outline-none">
<span class="material-symbols-outlined">menu</span>
</button>
<div class="hidden sm:flex items-center gap-2 text-sm text-on-surface-variant">
<span>Dayflow</span>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
<span class="font-medium text-on-surface">Attendance Log</span>
</div>
</div>
<!-- Right Side: Search & Actions -->
<div class="flex items-center gap-3">
<button class="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors focus:ring-2 ring-primary-container outline-none">
<span class="material-symbols-outlined">search</span>
</button>
<button class="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors focus:ring-2 ring-primary-container outline-none relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<button class="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors focus:ring-2 ring-primary-container outline-none">
<span class="material-symbols-outlined">apps</span>
</button>
<div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2 shrink-0">
<img alt="Administrator Profile" class="w-full h-full object-cover" data-alt="Professional corporate headshot of a diverse female executive with warm, bright lighting and an approachable smile. Modern office background out of focus. High-key light-mode aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjxbXNV55YTHkNXvTnuimjX8WD8nqqbABQr7jb72MtodLMW7jnQQiBNLsb7WY8_yfpBJAKRwu2nRlg8foKbHC6f7ZRv62_CuyVLEC_I2FrdQObDdd2t-VgKDlU2E2JWnJ0ZGR9NfCjzO6s1XloBUqbQ5IL4gcH7QtEO3Su2ddUjx7TTCm6fFE7AU44j-nR5i5mVtXAUEc440E69hCJa4JlQx3sO5GuJTOfemKTM6ZLnCKv229xVtqZHg">
</div>
</div>
</header>
<!-- Page Content Canvas -->
<main class="flex-1 p-gutter max-w-[1120px] w-full mx-auto">
<!-- Page Header -->
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
<div>
<h2 class="font-headline-lg text-headline-lg md:text-[32px] md:leading-[40px] text-on-surface mb-1">
                        Attendance Log <span class="font-accent-marker text-accent-marker text-secondary ml-2 marker-highlight">Today</span>
</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Track and monitor daily employee attendance and punctuality.</p>
</div>
<div class="flex items-center gap-3">
<button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface transition-colors font-body-sm text-body-sm font-medium border border-outline-variant">
<span class="material-symbols-outlined text-[18px]">filter_list</span>
                        Filter
                    </button>
<button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-on-primary transition-colors font-body-sm text-body-sm font-medium shadow-sm">
<span class="material-symbols-outlined text-[18px]">download</span>
                        Export Log
                    </button>
</div>
</div>
<!-- Summary Bento Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<!-- Bento Card 1: Avg Working Hours -->
<div class="card-base card-hover p-5 flex flex-col justify-between">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-surface-container rounded-lg text-primary">
<span class="material-symbols-outlined">schedule</span>
</div>
<span class="status-chip on-time">+15m vs avg</span>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Avg Working Hours</p>
<p class="font-display-lg text-display-lg text-on-surface">8h 45m</p>
</div>
</div>
<!-- Bento Card 2: Punctuality Rate -->
<div class="card-base card-hover p-5 flex flex-col justify-between">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-secondary-container rounded-lg text-on-secondary-container">
<span class="material-symbols-outlined">fact_check</span>
</div>
<span class="status-chip late">-2.5% vs last week</span>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Punctuality Rate</p>
<p class="font-display-lg text-display-lg text-on-surface">94.2%</p>
</div>
</div>
<!-- Bento Card 3: Total Absences -->
<div class="card-base card-hover p-5 flex flex-col justify-between">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-error-container rounded-lg text-on-error-container">
<span class="material-symbols-outlined">person_off</span>
</div>
<span class="font-body-sm text-body-sm text-on-surface-variant font-medium">Out of 142 Staff</span>
</div>
<div>
<p class="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Total Absences Today</p>
<p class="font-display-lg text-display-lg text-on-surface">3</p>
</div>
</div>
</div>
<!-- Detailed Data Table -->
<div class="card-base overflow-hidden">
<div class="p-4 border-b border-outline-variant bg-surface flex justify-between items-center">
<h3 class="font-title-md text-title-md text-on-surface">Detailed Log</h3>
<!-- Search Input -->
<div class="relative w-full max-w-xs hidden sm:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
<input class="w-full pl-9 pr-3 py-1.5 bg-surface border border-outline-variant rounded-lg text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container outline-none transition-all placeholder:text-on-surface-variant" placeholder="Search employees..." type="text">
</div>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-[#FAF8FA] border-b border-outline-variant">
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Employee</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Date</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Check In</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Check Out</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Total Hours</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap">Status</th>
<th class="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase whitespace-nowrap text-right">Actions</th>
</tr>
</thead>
<tbody class="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant">
<!-- Row 1 -->
<tr class="hover:bg-surface-container-lowest hover:shadow-[inset_4px_0_0_0_#57344f] transition-all duration-150 h-12 bg-surface">
<td class="py-2 px-4">
<div class="flex items-center gap-3">
<img alt="Alex Chen" class="w-8 h-8 rounded-full object-cover border border-outline-variant" data-alt="Professional corporate headshot of a young male software engineer with warm, bright lighting. Modern office background out of focus. High-key light-mode aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAauWQLwzmPvTM9ap5tJkcLTE4sSSPNJ-K4L0iP8LyQDd4jsZOZWdnYN3uoO-3a5f4a5ZR_0MjqrGxdraoErifdUTcWqXSVnwG_MuzDpW3UqJRTOxaxzgnVY0_-UnNV-AF5F8WgNIpQgvHrns1-PwkltChAeI7bWBNffZAYqEZykFcZzhPO5iIVWcKrDZ5yEnRJ9mPGTB1tdY_2GSwhWP0BNApKFvHbi0yxqXRgwFBPgGj_xrutrbOsbA">
<div>
<p class="font-medium">Alex Chen</p>
<p class="text-xs text-on-surface-variant">Engineering</p>
</div>
</div>
</td>
<td class="py-2 px-4 text-on-surface-variant">Oct 24, 2023</td>
<td class="py-2 px-4 font-medium">08:45 AM</td>
<td class="py-2 px-4 text-on-surface-variant">--:--</td>
<td class="py-2 px-4 text-on-surface-variant">--</td>
<td class="py-2 px-4"><span class="status-chip on-time">On Time</span></td>
<td class="py-2 px-4 text-right">
<button class="text-on-surface-variant hover:text-primary p-1 rounded transition-colors"><span class="material-symbols-outlined text-[20px]">more_vert</span></button>
</td>
</tr>
<!-- Row 2 -->
<tr class="hover:bg-surface-container-lowest hover:shadow-[inset_4px_0_0_0_#57344f] transition-all duration-150 h-12 bg-surface">
<td class="py-2 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-tint text-on-primary flex items-center justify-center font-bold text-xs border border-outline-variant">SJ</div>
<div>
<p class="font-medium">Sarah Jenkins</p>
<p class="text-xs text-on-surface-variant">Marketing</p>
</div>
</div>
</td>
<td class="py-2 px-4 text-on-surface-variant">Oct 24, 2023</td>
<td class="py-2 px-4 font-medium text-error">09:15 AM</td>
<td class="py-2 px-4 text-on-surface-variant">--:--</td>
<td class="py-2 px-4 text-on-surface-variant">--</td>
<td class="py-2 px-4"><span class="status-chip late">Late</span></td>
<td class="py-2 px-4 text-right">
<button class="text-on-surface-variant hover:text-primary p-1 rounded transition-colors"><span class="material-symbols-outlined text-[20px]">more_vert</span></button>
</td>
</tr>
<!-- Row 3 -->
<tr class="hover:bg-surface-container-lowest hover:shadow-[inset_4px_0_0_0_#57344f] transition-all duration-150 h-12 bg-surface">
<td class="py-2 px-4">
<div class="flex items-center gap-3">
<img alt="Maria Garcia" class="w-8 h-8 rounded-full object-cover border border-outline-variant" data-alt="Professional corporate headshot of a mature female HR manager with warm, bright lighting. Modern office background out of focus. High-key light-mode aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjiVlRC6bhAPoyaoaD3fO1LrsbDVH7qaBHKNVsDHvy_hGturcRt3V5NRVYQ-NKkQn-Lzo6oLfCiThj1f_ZckQkp_57VxPk0JrNjufvhxRMCcwwub_mpWEdYZetRxAzpZ00DVKG1ADI75eLJIzYwQweplTQoATFnXaPrCCR0paGkdWT94Rbwd2RK-O8ngtGqNsVws-So2Xmm5OihfIxvja6Ff-1mK9M6tm5JeMMY7iSSG3HIvhPatMDgA">
<div>
<p class="font-medium">Maria Garcia</p>
<p class="text-xs text-on-surface-variant">HR</p>
</div>
</div>
</td>
<td class="py-2 px-4 text-on-surface-variant">Oct 23, 2023</td>
<td class="py-2 px-4 font-medium">08:55 AM</td>
<td class="py-2 px-4 text-on-surface-variant">05:10 PM</td>
<td class="py-2 px-4 font-medium">8h 15m</td>
<td class="py-2 px-4"><span class="status-chip on-time">On Time</span></td>
<td class="py-2 px-4 text-right">
<button class="text-on-surface-variant hover:text-primary p-1 rounded transition-colors"><span class="material-symbols-outlined text-[20px]">more_vert</span></button>
</td>
</tr>
<!-- Row 4 -->
<tr class="hover:bg-surface-container-lowest hover:shadow-[inset_4px_0_0_0_#57344f] transition-all duration-150 h-12 bg-[#FAF8FA]/50">
<td class="py-2 px-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-outline text-on-primary flex items-center justify-center font-bold text-xs border border-outline-variant">DT</div>
<div>
<p class="font-medium text-on-surface-variant">David Thompson</p>
<p class="text-xs text-on-surface-variant">Sales</p>
</div>
</div>
</td>
<td class="py-2 px-4 text-on-surface-variant">Oct 24, 2023</td>
<td class="py-2 px-4 text-on-surface-variant">--:--</td>
<td class="py-2 px-4 text-on-surface-variant">--:--</td>
<td class="py-2 px-4 text-on-surface-variant">0h</td>
<td class="py-2 px-4"><span class="status-chip absent">Absent</span></td>
<td class="py-2 px-4 text-right">
<button class="text-on-surface-variant hover:text-primary p-1 rounded transition-colors"><span class="material-symbols-outlined text-[20px]">more_vert</span></button>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Pagination Footer -->
<div class="p-4 border-t border-outline-variant bg-surface flex items-center justify-between">
<p class="font-body-sm text-body-sm text-on-surface-variant">Showing 1 to 4 of 142 entries</p>
<div class="flex gap-1">
<button class="p-1 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50" disabled="">
<span class="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button class="w-8 h-8 rounded bg-primary text-on-primary font-medium text-sm flex items-center justify-center">1</button>
<button class="w-8 h-8 rounded hover:bg-surface-container-high text-on-surface font-medium text-sm flex items-center justify-center transition-colors">2</button>
<button class="w-8 h-8 rounded hover:bg-surface-container-high text-on-surface font-medium text-sm flex items-center justify-center transition-colors">3</button>
<span class="w-8 h-8 flex items-center justify-center text-on-surface-variant">...</span>
<button class="p-1 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
</div>
</main>
</div>
""",
    "employee": r"""<!-- Employees - Dayflow -->
<div class="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
<!-- TopAppBar -->
<header class="bg-surface docked top-0 w-full sticky z-40 border-b border-outline-variant flex justify-between items-center h-16 px-gutter shrink-0">
<div class="flex-1 max-w-md">
<div class="relative group">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-[10px] text-body-sm font-body-sm focus:ring-2 focus:ring-primary-container focus:border-primary focus:outline-none transition-all placeholder:text-outline shadow-sm" placeholder="Search employees..." type="text">
</div>
</div>
<div class="flex items-center gap-4 ml-auto">
<button class="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
</button>
<button class="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined">apps</span>
</button>
<div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2">
<img alt="Administrator Profile" class="w-full h-full object-cover" data-alt="Professional corporate headshot of an administrator in a modern office, soft high-key lighting, professional humanist style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEDeLXmBoP7CweMLnRfstMJNSe_9SZ9MLN9_vl1BKotGoxVB-o9PAUryzcR2Vtfrs7aA6JoffkaAt-KspRgQ-JzsjSeJMya2qrFDXRpgpJLVsxMXfKAy3XlOodAxHIFm9IUZiSw15STw1BRg0no68Ovdo81Opo4DQDyHHir2oJlpVJXtD56_PhNlbe6-iHreT4o4C9UvX0YFdHgviqk47L1aRFqZVdGDbS2DXepjhB8VOFFuqTcIHYTw">
</div>
</div>
</header>
<!-- Page Content -->
<main class="flex-1 overflow-y-auto bg-surface-container-low px-gutter py-8">
<div class="max-w-[1120px] mx-auto">
<!-- Page Header & Actions -->
<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
<div>
<h1 class="font-headline-lg text-headline-lg text-on-surface">Employee Directory</h1>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage and view all team members across the organization.</p>
</div>
<div class="flex items-center gap-3">
<div class="flex bg-surface-container-lowest border border-outline-variant rounded-[10px] overflow-hidden shadow-sm">
<select class="border-none bg-transparent py-2 pl-4 pr-8 font-label-sm text-label-sm text-on-surface focus:ring-0 cursor-pointer">
<option>All Departments</option>
<option>Engineering</option>
<option>Design</option>
<option>Marketing</option>
</select>
<div class="w-px bg-outline-variant"></div>
<select class="border-none bg-transparent py-2 pl-4 pr-8 font-label-sm text-label-sm text-on-surface focus:ring-0 cursor-pointer">
<option>All Statuses</option>
<option>Present</option>
<option>On Leave</option>
</select>
</div>
<button class="bg-primary text-on-primary px-4 py-2 rounded-[10px] font-label-sm text-label-sm flex items-center gap-2 hover:bg-tertiary-container transition-colors shadow-sm">
<span class="material-symbols-outlined text-[18px]">add</span>
                            Add Employee
                        </button>
</div>
</div>
<!-- Bento Grid Layout for Employees -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
<!-- Employee Card 1 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col items-center text-center card-hover transition-shadow group relative overflow-hidden">
<div class="absolute top-0 left-0 w-full h-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="relative mb-4">
<img class="w-20 h-20 rounded-full object-cover border border-outline-variant shadow-sm" data-alt="Portrait of a female software engineer smiling, natural bright office lighting, modern corporate aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBi4RDG8eaFspPTxtHlywmsQnIPrjMRO73dsN5beb27aet6MIsrS7CXTidrPYrWnkVcbP8pFqD6aA0LQXrzekVNXiIkIz2zG3xcAzCEwXkxTme1yukEUOwjAsJsvEIrZ2x6zuH-AzEa04vQdeYdYhlrVJ7ZP6GbSpiClDaiWAS4mrmHtzz88vMLOQ34-Qm7YoDkjRhBWRjAmtb0Hi-F8WOzq4X-JALJo-9KsQYM-TX7E7ojOkrZbgcfA">
<span class="absolute bottom-0 right-0 w-4 h-4 bg-[#2e7d32] border-2 border-surface-container-lowest rounded-full" title="Present"></span>
</div>
<h3 class="font-title-md text-title-md text-on-surface mb-1">Sarah Jenkins</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-3">Senior Backend Engineer</p>
<span class="px-3 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/50">Engineering</span>
<div class="flex gap-2 mt-5 w-full pt-4 border-t border-surface-container-highest">
<button class="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface">View</button>
<button class="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">mail</span>
</button>
</div>
</div>
<!-- Employee Card 2 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col items-center text-center card-hover transition-shadow group relative overflow-hidden">
<div class="absolute top-0 left-0 w-full h-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="relative mb-4">
<img class="w-20 h-20 rounded-full object-cover border border-outline-variant shadow-sm" data-alt="Portrait of a male product designer with glasses, thoughtful expression, clean minimalist background, modern corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfSTp0su1GSF621scjIC0SE9gvxqyvjE2EGirMAPvRXhPuYm8dkOhutj4EgCRt9L8Y7Vs3Ii5p0B4qOZFIxAMTzciODEfMXdoiXYaBUGuyo51TFZb-SOk1TDkY8OTlp17546HLRzMlSdRKvyAPumpUlQcmIjSHSn_auykWG43wP7JffmJRqymtDW3OtKxnMQXnNZwAfTQiyvumnisZSMKE1f5hLs7fWtlO-y2cbyhzTDR7oZpz3jgRdw">
<span class="absolute bottom-0 right-0 w-4 h-4 bg-[#ed6c02] border-2 border-surface-container-lowest rounded-full" title="On Leave"></span>
</div>
<h3 class="font-title-md text-title-md text-on-surface mb-1">Marcus Chen</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-3">Lead Product Designer</p>
<span class="px-3 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/50">Design</span>
<div class="flex gap-2 mt-5 w-full pt-4 border-t border-surface-container-highest">
<button class="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface">View</button>
<button class="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">mail</span>
</button>
</div>
</div>
<!-- Employee Card 3 (New Hire Highlight) -->
<div class="bg-surface-container-lowest border border-primary-fixed-dim rounded-[10px] p-5 flex flex-col items-center text-center card-hover transition-shadow group relative overflow-hidden shadow-sm">
<div class="absolute top-0 right-0 px-3 py-1 bg-primary text-on-primary font-accent-marker text-accent-marker rounded-bl-[10px] transform rotate-3 translate-x-1 -translate-y-1 z-10 shadow-sm">New Hire!</div>
<div class="absolute top-0 left-0 w-full h-1 bg-primary opacity-100"></div>
<div class="relative mb-4 mt-2">
<div class="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-display-lg text-[32px] border-2 border-primary-fixed">ER</div>
<span class="absolute bottom-0 right-0 w-4 h-4 bg-[#2e7d32] border-2 border-surface-container-lowest rounded-full" title="Present"></span>
</div>
<h3 class="font-title-md text-title-md text-on-surface mb-1">Elena Rodriguez</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-3">Marketing Manager</p>
<span class="px-3 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/50">Marketing</span>
<div class="flex gap-2 mt-5 w-full pt-4 border-t border-surface-container-highest">
<button class="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface">View</button>
<button class="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">mail</span>
</button>
</div>
</div>
<!-- Employee Card 4 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-5 flex flex-col items-center text-center card-hover transition-shadow group relative overflow-hidden">
<div class="absolute top-0 left-0 w-full h-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="relative mb-4">
<img class="w-20 h-20 rounded-full object-cover border border-outline-variant shadow-sm" data-alt="Portrait of a male HR professional in a casual suit, warm inviting office lighting, professional humanist corporate style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuACYVRVWLlMiyWCzd61pX5rLJrXOEI99kT6Fzu00Bsoq4P5vEUi5k0DByxibbayg65EZc71Xb5pZ0nm4y-Q8nAnvJTF8lS894cr4Xm-p1_JJMo6wiq8BVvmC3bq2lEBvBEPg-tWkGA-wtz3WCr7fNzSHKvAZj1Ytinwz4sOh-yvzqR06xiseOuywDSHtjWQqITWcmzmXThFie3xVRyPTwj3PYoe2mBCJ2OC1fljiTMlSDDK147V72vLHA">
<span class="absolute bottom-0 right-0 w-4 h-4 bg-[#2e7d32] border-2 border-surface-container-lowest rounded-full" title="Present"></span>
</div>
<h3 class="font-title-md text-title-md text-on-surface mb-1">David Kim</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant mb-3">HR Business Partner</p>
<span class="px-3 py-1 bg-surface-container rounded-full font-label-sm text-label-sm text-on-surface-variant border border-outline-variant/50">Human Resources</span>
<div class="flex gap-2 mt-5 w-full pt-4 border-t border-surface-container-highest">
<button class="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface">View</button>
<button class="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface-variant">
<span class="material-symbols-outlined text-[16px]">mail</span>
</button>
</div>
</div>
</div>
</div>
</main>
</div>
""",
    "profile": r"""<!-- Employee Profile - Dayflow -->
<!-- Main Content Area -->
<main class="flex-1 flex flex-col min-w-0 bg-[#FAF8FA] md:ml-64">
<!-- TopAppBar (Shared Component) -->
<header class="docked top-0 w-full sticky z-40 border-b border-outline-variant dark:border-outline bg-surface dark:bg-surface-dim flex justify-between items-center h-16 px-gutter ml-0 md:ml-0">
<div class="flex items-center gap-4">
<button class="md:hidden text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<div class="relative hidden sm:block">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input class="pl-10 pr-4 py-2 w-64 bg-surface-container-lowest border border-outline-variant rounded-[10px] text-body-sm focus:ring-2 focus:ring-primary-container outline-none transition-all focus:border-primary" placeholder="Search employees..." type="text">
</div>
</div>
<div class="flex items-center gap-4">
<span class="font-accent-marker text-accent-marker text-secondary hidden lg:block">Welcome back, Admin!</span>
<button class="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full relative">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
<span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<button class="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full hidden sm:block">
<span class="material-symbols-outlined" data-icon="apps">apps</span>
</button>
<img class="w-8 h-8 rounded-full object-cover ml-2 border border-outline-variant cursor-pointer" data-alt="A professional headshot of a corporate administrator, female, mid-30s, wearing glasses and a dark blazer, soft natural lighting, light-mode background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs1aEsH8beTkKabnaz-uxzDgQ15QknxXbG1iM3IaUawoo7caMMRWM7mGf2fgHcDO-ZNNRqL_SM6x8qiFP0QInS6NfBBuFe5-baGY4MLv72XfNBfs_UfsrDeSkchj-i2vdm3jPzyOuzykitTyl2zhCSTvMnoh-qnJ4Ty-hDBphOrtslvVmPwIPJo36RXvQ8kC1rcVzOhBClddhgs07MD5sVEWEOItcogyMwaJCF2aRBX3YC7pp68GmquA">
</div>
</header>
<!-- Profile Content Canvas -->
<div class="flex-1 overflow-y-auto p-4 md:p-gutter">
<div class="max-w-[1120px] mx-auto w-full flex flex-col gap-gutter">
<!-- Profile Header Card (Glassmorphism inspired) -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden relative group">
<div class="h-32 bg-gradient-to-r from-primary-container to-secondary-container opacity-20 absolute w-full top-0"></div>
<div class="p-gutter relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 mt-8">
<div class="relative">
<img class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-surface-container-lowest shadow-sm" data-alt="A professional portrait of a senior backend engineer, male, late 20s, casual tech attire, smiling slightly, bright well-lit modern office background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsr-mV1mbNoSqDy29UHbfhGYYFuBiRBmofeJOPUHcq93Jjs2GPsd8LxXlGI3ZT6TR2r-mIhEfb8b0sD7VlfwtYE1omxl-jAj9HHX7JfRCuAhLCT1tvsNDAaOQMHH7SDwpbSp6MIiXk5RnEQFWHHcu8KNnMoG4M5x73XxJ1FdDroLCK3LhCnYXdgA4tECJ2wF6DMbJ9OoHFfRenuGAmjFXApqqG025j52J9jilMQ3TCP_A69EVfZIoxBg">
<div class="absolute bottom-1 right-1 w-5 h-5 bg-secondary rounded-full border-2 border-surface-container-lowest" title="Active"></div>
</div>
<div class="flex-1">
<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
<h2 class="font-headline-lg text-headline-lg text-on-background">Alex Mercer</h2>
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container">
                                    Active
                                </span>
</div>
<p class="font-title-md text-title-md text-on-surface-variant mb-1">Senior Backend Engineer</p>
<div class="flex flex-wrap items-center gap-4 text-body-sm text-on-surface-variant">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[18px]">domain</span> Engineering Dept</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[18px]">location_on</span> New York Office</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[18px]">mail</span> alex.m@dayflow.com</span>
</div>
</div>
<div class="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
<button class="flex-1 md:flex-none px-4 py-2 bg-primary text-on-primary rounded-[10px] font-label-sm hover:bg-surface-tint transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]">edit</span> Edit Profile
                            </button>
<button class="px-4 py-2 bg-surface-container border border-outline-variant text-on-surface rounded-[10px] hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined text-[18px]">more_horiz</span>
</button>
</div>
</div>
<!-- Navigation Tabs within Card -->
<div class="px-gutter border-t border-outline-variant bg-surface-container-lowest">
<nav class="flex gap-6 overflow-x-auto">
<a class="py-4 text-primary border-b-2 border-primary font-label-sm font-bold whitespace-nowrap" href="#">Personal Details</a>
<a class="py-4 text-on-surface-variant hover:text-primary transition-colors font-label-sm whitespace-nowrap" href="#">Job Info</a>
<a class="py-4 text-on-surface-variant hover:text-primary transition-colors font-label-sm whitespace-nowrap flex items-center gap-1" href="#">Salary Info <span class="material-symbols-outlined text-[14px]">lock</span></a>
<a class="py-4 text-on-surface-variant hover:text-primary transition-colors font-label-sm whitespace-nowrap" href="#">Documents</a>
</nav>
</div>
</div>
<!-- Bento Grid Layout for Details -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
<!-- Main Detail Column -->
<div class="lg:col-span-2 flex flex-col gap-gutter">
<!-- Basic Info Card -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
<h3 class="font-title-md text-title-md text-on-background mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">person</span> Basic Information
                            </h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
<div>
<p class="text-label-sm font-label-sm text-outline mb-1 uppercase">Full Name</p>
<p class="text-body-md text-on-background">Alexander James Mercer</p>
</div>
<div>
<p class="text-label-sm font-label-sm text-outline mb-1 uppercase">Date of Birth</p>
<p class="text-body-md text-on-background">Oct 14, 1992</p>
</div>
<div>
<p class="text-label-sm font-label-sm text-outline mb-1 uppercase">Nationality</p>
<p class="text-body-md text-on-background">American</p>
</div>
<div>
<p class="text-label-sm font-label-sm text-outline mb-1 uppercase">Gender</p>
<p class="text-body-md text-on-background">Male</p>
</div>
<div>
<p class="text-label-sm font-label-sm text-outline mb-1 uppercase">Marital Status</p>
<p class="text-body-md text-on-background">Single</p>
</div>
</div>
</div>
<!-- Contact & Address Card -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow relative">
<h3 class="font-title-md text-title-md text-on-background mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">contact_mail</span> Contact Details
                            </h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-8">
<div>
<p class="text-label-sm font-label-sm text-outline mb-1 uppercase">Work Email</p>
<p class="text-body-md text-on-background">alex.m@dayflow.com</p>
</div>
<div>
<p class="text-label-sm font-label-sm text-outline mb-1 uppercase">Personal Email</p>
<p class="text-body-md text-on-background">alex.mercer.dev@gmail.com</p>
</div>
<div>
<p class="text-label-sm font-label-sm text-outline mb-1 uppercase">Phone Number</p>
<p class="text-body-md text-on-background">+1 (555) 019-2834</p>
</div>
</div>
<div class="border-t border-outline-variant pt-6">
<p class="text-label-sm font-label-sm text-outline mb-2 uppercase">Current Address</p>
<p class="text-body-md text-on-background">
                                    1245 Innovation Drive, Apt 4B<br>
                                    Tech District, NY 10001<br>
                                    United States
                                </p>
</div>
</div>
</div>
<!-- Sidebar Column -->
<div class="flex flex-col gap-gutter">
<!-- Reporting To Card -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 relative overflow-hidden">
<div class="absolute -right-4 -top-4 w-16 h-16 bg-tertiary-fixed rounded-full opacity-50 blur-xl"></div>
<h3 class="font-title-md text-title-md text-on-background mb-4 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">account_tree</span> Reporting To
                            </h3>
<div class="flex items-center gap-4 p-3 rounded-lg border border-outline-variant bg-[#FAF8FA] hover:border-primary-container transition-colors cursor-pointer">
<img class="w-12 h-12 rounded-full object-cover" data-alt="Professional portrait of a female engineering director in her 40s, wearing business casual attire, confident expression, soft modern office lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7Z4o6WkzZfnlDbrA5aiL9jouF0_0DzRiQ8w0qI1oyZDEgZ4gWK-CUDdgje0qmCTU5cetAJBFwuVPT9TkH3qJjGglkWuJLWqIeeVVnMqhL5MnhagRL7d-4sfJ_duBigc-MDnmEk-0cdV3OdkFvj8DyXgq-3AC6iGKFnrBD7OZFhNvP-kRrMbhhav9HgXpJ-u2arnlYitPZ6UJjSzEsCxrbprxAxf6CDsCaES13-aoEnfcWq5b7A9hmBg">
<div>
<p class="font-title-md text-title-md text-on-background text-sm">Sarah Jenkins</p>
<p class="text-label-sm font-label-sm text-on-surface-variant">VP of Engineering</p>
</div>
<span class="material-symbols-outlined ml-auto text-outline">chevron_right</span>
</div>
</div>
<!-- Quick Stats / Onboarding Note -->
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 relative">
<div class="absolute left-0 top-0 w-1 h-full bg-secondary rounded-l-xl"></div>
<h3 class="font-title-md text-title-md text-on-background mb-4">Milestone Highlight</h3>
<div class="p-4 bg-surface-container-low rounded-lg relative">
<p class="font-accent-marker text-accent-marker text-primary text-xl relative z-10 leading-snug">
                                    3 Year Work Anniversary coming up in October! 🎉
                                </p>
<div class="absolute left-2 bottom-2 w-3/4 h-3 bg-secondary-fixed opacity-40 -rotate-2"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
"""
}

sidebar_jsx = r"""
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
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'dashboard' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/hr">
              <span className="material-symbols-outlined" style={active === 'dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
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
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'attendance' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/attendance">
              <span className="material-symbols-outlined" style={active === 'attendance' ? { fontVariationSettings: "'FILL' 1" } : {}}>pending_actions</span>
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'time-off' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/time-off">
              <span className="material-symbols-outlined" style={active === 'time-off' ? { fontVariationSettings: "'FILL' 1" } : {}}>calendar_today</span>
              <span>Time Off</span>
            </Link>
          </li>
          <li>
            <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active === 'payroll' ? 'text-on-secondary-container bg-secondary-container font-bold scale-[0.98]' : 'text-on-surface-variant hover:bg-surface-container-highest'}`} href="/dashboard/payroll">
              <span className="material-symbols-outlined" style={active === 'payroll' ? { fontVariationSettings: "'FILL' 1" } : {}}>payments</span>
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
"""

def html_to_jsx(html, active_tab):
    # Convert classes
    jsx = re.sub(r'class="([^"]*)"', r'className="\1"', html)
    # Self-close specific tags
    for tag in ['input', 'img', 'hr', 'br']:
        jsx = re.sub(rf'<{tag}([^>]*?)(?<!/)>', rf'<{tag}\1 />', jsx)
    
    # Fix SVG attributes
    jsx = jsx.replace('stroke-width', 'strokeWidth')
    jsx = jsx.replace('stroke-dasharray', 'strokeDasharray')
    jsx = jsx.replace('stroke-dashoffset', 'strokeDashoffset')
    jsx = jsx.replace('stroke-linecap', 'strokeLinecap')
    jsx = jsx.replace('viewbox', 'viewBox')
    jsx = jsx.replace('preserveaspectratio', 'preserveAspectRatio')
    jsx = jsx.replace('lineargradient', 'linearGradient')
    jsx = jsx.replace('stop-color', 'stopColor')
    jsx = jsx.replace('stop-opacity', 'stopOpacity')

    # Fix specific inline styles
    jsx = re.sub(r'style="([^"]*)"', r'style={{\1}}', jsx)
    jsx = jsx.replace(r"width: 94%", r"width: '94%'")
    jsx = jsx.replace(r"background: conic-gradient(#6C34CF 0% 45%, #1D70F5 45% 75%, #F09A0A 75% 90%, #E2E8F0 90% 100%);", 
                      r"background: 'conic-gradient(#6C34CF 0% 45%, #1D70F5 45% 75%, #F09A0A 75% 90%, #E2E8F0 90% 100%)'")
    jsx = jsx.replace(r"font-variation-settings: 'FILL' 0;", r"fontVariationSettings: \"'FILL' 0\"")
    jsx = jsx.replace(r"font-variation-settings: 'FILL' 1;", r"fontVariationSettings: \"'FILL' 1\"")
    jsx = jsx.replace(r"font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;", r"fontVariationSettings: \"'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24\"")
    
    jsx = jsx.replace('for=', 'htmlFor=')
    jsx = jsx.replace('disabled=""', 'disabled')

    # Extract just the main content if it's there (skip nav)
    # the user gave HTML snippets starting with <main> or <div class="flex-1...">
    # We will wrap it in our layout
    
    sidebar_injected = sidebar_jsx.replace("active === 'dashboard'", f"active === '{active_tab}'")
    sidebar_injected = sidebar_injected.replace("active === 'employee'", f"active === '{active_tab}'")
    sidebar_injected = sidebar_injected.replace("active === 'attendance'", f"active === '{active_tab}'")
    sidebar_injected = sidebar_injected.replace("active === 'time-off'", f"active === '{active_tab}'")
    sidebar_injected = sidebar_injected.replace("active === 'payroll'", f"active === '{active_tab}'")
    sidebar_injected = sidebar_injected.replace("active === 'reports'", f"active === '{active_tab}'")
    
    # We remove the <nav> from their code if it exists. Actually they gave code that doesn't have <nav> in the data dict strings, I stripped it for some, wait no, I copied the whole <div class="flex-1..."> for time-off, payroll, reports etc. Some have <main> directly.
    
    return f"""'use client';

import Link from 'next/link';

export default function Page() {{
  const active = '{active_tab}';
  return (
    <div className="bg-surface text-on-surface font-body-md h-screen flex overflow-hidden">
      {sidebar_injected}
      {jsx}
    </div>
  );
}}
"""

for key, content in html_data.items():
    jsx_content = html_to_jsx(content, key)
    # Ensure directory exists
    dir_path = f"d:/odoo bangalore/DayFlow/frontend/src/app/dashboard/{key}"
    os.makedirs(dir_path, exist_ok=True)
    with open(os.path.join(dir_path, "page.js"), "w", encoding="utf-8") as f:
        f.write(jsx_content)

print("Conversion complete!")

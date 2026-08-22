export default function Page() {
 return (
 <>
{/* Scrollable Canvas */}
<div className="flex-1 p-lg lg:p-xl xl:px-24 xl:py-12 scroll-smooth">
<div className="max-w-7xl mx-auto space-y-8">
{/* Page Header */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
<div>
<h2 className="font-display-lg text-display-lg text-on-surface mb-2">Employees</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant">Manage and view your organization's employees.</p>
</div>
<div className="flex items-center gap-4">
<button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-headline-md text-headline-md font-medium hover:bg-primary/90 transition-colors shadow-sm">
<span className="material-symbols-outlined">add</span>
 Add Employee
 </button>
</div>
</div>
{/* Controls Bar */}
<div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-surface-container p-4 rounded-2xl border border-outline-variant">
<div className="flex-1 w-full md:w-auto relative lg:hidden">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">search</span>
<input className="w-full bg-surface border border-outline-variant rounded-xl py-2 pl-12 pr-4 text-on-surface font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors" placeholder="Search employees..." type="text"/>
</div>
<div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
<div className="relative group">
<select className="appearance-none bg-surface border border-outline-variant rounded-xl py-2 pl-4 pr-10 text-on-surface font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors cursor-pointer hover:border-outline">
<option value="">All Departments</option>
<option value="design">Design</option>
<option value="engineering">Engineering</option>
<option value="marketing">Marketing</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-hover:text-on-surface">arrow_drop_down</span>
</div>
<div className="relative group">
<select className="appearance-none bg-surface border border-outline-variant rounded-xl py-2 pl-4 pr-10 text-on-surface font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors cursor-pointer hover:border-outline">
<option value="">All Statuses</option>
<option value="present">Present</option>
<option value="absent">Absent</option>
<option value="on-leave">On Leave</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none group-hover:text-on-surface">arrow_drop_down</span>
</div>
<div className="h-6 w-px bg-outline-variant mx-2 hidden md:block"></div>
<button className="p-2 rounded-xl border border-outline-variant bg-surface-container-high text-on-surface hover:text-primary hover:border-primary transition-colors ml-auto md:ml-0" title="Grid View">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '\'FILL\' 1' }}>grid_view</span>
</button>
<button className="p-2 rounded-xl border border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" title="List View">
<span className="material-symbols-outlined">list</span>
</button>
</div>
</div>
{/* Employee Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{/* Card 1 */}
<div className="bg-surface-container border border-outline-variant rounded-2xl p-6 flex flex-col hover:border-primary/50 hover:bg-surface-container-high transition-all duration-300 cursor-pointer group relative overflow-hidden">
<div className="flex justify-between items-start mb-6 relative z-10">
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-green/10 text-status-green border border-status-green/20">
<span className="w-1.5 h-1.5 rounded-full bg-status-green"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Present</span>
</div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-1.5 rounded-full hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
<div className="flex flex-col items-center text-center flex-1 relative z-10">
<div className="w-24 h-24 rounded-full border-4 border-surface-container-highest overflow-hidden mb-4 shadow-sm group-hover:border-primary/30 transition-colors">
<img alt="Arjun Kumar" className="w-full h-full object-cover" data-alt="A high quality portrait of Arjun Kumar, a professional product manager in a modern dark office setting. Sharp focus, subtle rim lighting, confident expression." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSIGzf5CZe4fOaWMbejJB4gKSWrPGKG63kODZSc5BqtaPqHqNp55vdD5O6rQhyA93CRVXnpWzLRUBxCkzs7jpoQtXYf1Sul9AXaY8bE2VlFsBTGztlfP6lSsYoerL97x51i-D4GHzOlNwPiBF31gleuzN75cTtBNKFwhUB_nC2Xjjstp_lLd0lduCtr5W33VD-Mf5JryJeGpm6aGWpe3gBU4vK2J7l0k2XFhwOX3mAL70RV4vQEYGcBw"/>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Arjun Kumar</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-3">Product Manager</p>
<p className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase tracking-widest">Design</p>
</div>
<div className="mt-6 pt-4 border-t border-outline-variant flex justify-between items-center relative z-10">
<span className="font-data-mono text-data-mono text-on-surface-variant">DF-1024</span>
<div className="flex gap-2">
<button className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors" title="Email">
<span className="material-symbols-outlined text-[18px]">mail</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors" title="Message">
<span className="material-symbols-outlined text-[18px]">chat</span>
</button>
</div>
</div>
</div>
{/* Card 2 */}
<div className="bg-surface-container border border-outline-variant rounded-2xl p-6 flex flex-col hover:border-primary/50 hover:bg-surface-container-high transition-all duration-300 cursor-pointer group relative overflow-hidden">
<div className="flex justify-between items-start mb-6 relative z-10">
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-blue/10 text-status-blue border border-status-blue/20">
<span className="material-symbols-outlined text-[14px]">flight</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">On Leave</span>
</div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-1.5 rounded-full hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
<div className="flex flex-col items-center text-center flex-1 relative z-10">
<div className="w-24 h-24 rounded-full border-4 border-surface-container-highest overflow-hidden mb-4 shadow-sm group-hover:border-primary/30 transition-colors">
<img alt="Priya Sharma" className="w-full h-full object-cover" data-alt="A high quality portrait of Priya Sharma, a professional senior designer in a modern dark office setting. Sharp focus, subtle rim lighting, approachable expression." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjCM7FJFqtom-cKn-zEli0JitgO9_zeDavva9Dd5_Lsh49gel-Ajaa_igmhl56FwrUnfM60MuZ4n0zfUTwC9uQeGGfxdUmyFP19jmA_xhMsOfrC-bmtUMLUynKAY3cUpdwUWDhaovzfNgFW1nzjvhjwE5sGCTyfGjme3B-7BfQkWfVlPMBVWpZlvO9nr-UnnnZ_4KmZ-S21Qtn9Orz8_4qOCtVyKTskbkB9ZcaWxvjl9u-q2SnJet2Hg"/>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Priya Sharma</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-3">Senior Designer</p>
<p className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase tracking-widest">Design</p>
</div>
<div className="mt-6 pt-4 border-t border-outline-variant flex justify-between items-center relative z-10">
<span className="font-data-mono text-data-mono text-on-surface-variant">DF-1045</span>
<div className="flex gap-2">
<button className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors" title="Email">
<span className="material-symbols-outlined text-[18px]">mail</span>
</button>
</div>
</div>
</div>
{/* Card 3 */}
<div className="bg-surface-container border border-outline-variant rounded-2xl p-6 flex flex-col hover:border-primary/50 hover:bg-surface-container-high transition-all duration-300 cursor-pointer group relative overflow-hidden">
<div className="flex justify-between items-start mb-6 relative z-10">
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-green/10 text-status-green border border-status-green/20">
<span className="w-1.5 h-1.5 rounded-full bg-status-green"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Present</span>
</div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-1.5 rounded-full hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
<div className="flex flex-col items-center text-center flex-1 relative z-10">
<div className="w-24 h-24 rounded-full border-4 border-surface-container-highest overflow-hidden mb-4 shadow-sm group-hover:border-primary/30 transition-colors">
<img alt="Karthik Raj" className="w-full h-full object-cover" data-alt="A high quality portrait of Karthik Raj, a professional software engineer in a modern dark office setting. Sharp focus, subtle rim lighting, focused expression." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIh8LA4ZPwxg2SwZhDiShGv3FvL9Qhi9n7MzxtuOR6UomMKFTP83ltfN2SviIg1q6KO5BJsleYOpzfJVrss4oA2Hcw8AHpPBN4g24_pp8OnZUYdwrScvigdce6_JzHOV3sflRJFRrSlVZbimfYYz_62h8b8VOaNdyEx3ReVU0E0aWfy9l1cpOLaKFwK7CDLi585okp_f5rvEnEteyvQyp280Edhy7RcGW5H6d_19cQHROBMkHAv-ZAuw"/>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Karthik Raj</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-3">Software Engineer</p>
<p className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase tracking-widest">Engineering</p>
</div>
<div className="mt-6 pt-4 border-t border-outline-variant flex justify-between items-center relative z-10">
<span className="font-data-mono text-data-mono text-on-surface-variant">DF-1088</span>
<div className="flex gap-2">
<button className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors" title="Email">
<span className="material-symbols-outlined text-[18px]">mail</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors" title="Message">
<span className="material-symbols-outlined text-[18px]">chat</span>
</button>
</div>
</div>
</div>
{/* Card 4 */}
<div className="bg-surface-container border border-outline-variant rounded-2xl p-6 flex flex-col hover:border-primary/50 hover:bg-surface-container-high transition-all duration-300 cursor-pointer group relative overflow-hidden">
<div className="flex justify-between items-start mb-6 relative z-10">
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-red/10 text-status-red border border-status-red/20">
<span className="w-1.5 h-1.5 rounded-full bg-status-red"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Absent</span>
</div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-1.5 rounded-full hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
<div className="flex flex-col items-center text-center flex-1 relative z-10">
<div className="w-24 h-24 rounded-full border-4 border-surface-container-highest overflow-hidden mb-4 shadow-sm group-hover:border-primary/30 transition-colors">
<img alt="Ananya Iyer" className="w-full h-full object-cover" data-alt="A high quality portrait of Ananya Iyer, a professional marketing specialist in a modern dark office setting. Sharp focus, subtle rim lighting, engaging expression." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_GU3GzRwlH78lISKkraGurtfmvvYbkVS-L6yiUd77yhcOJ51Ep0cl5RN_3ciNz9956JZrjeQiyfmAb0iXSX6qD6-IeBWMY_uH-V6ApFr92ZHmT0hDWqM3wKjNTazyOrxMZpm5b9zsAAg4GKbHhtaeyKhTri0t8SZdEpEMk7UgtlAQ6uqDy0btvsC6Mjcw44-TvfZBPI45EQBg1jwcz8abXOVED4rQPz65P7Or_UVPpqFcFmDbYOfDsA"/>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors">Ananya Iyer</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-3">Marketing Specialist</p>
<p className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase tracking-widest">Marketing</p>
</div>
<div className="mt-6 pt-4 border-t border-outline-variant flex justify-between items-center relative z-10">
<span className="font-data-mono text-data-mono text-on-surface-variant">DF-1102</span>
<div className="flex gap-2">
<button className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors" title="Email">
<span className="material-symbols-outlined text-[18px]">mail</span>
</button>
</div>
</div>
</div>
</div>
{/* Pagination */}
<div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-outline-variant mt-8">
<p className="font-body-md text-body-md text-on-surface-variant">Showing 1 to 4 of 48 employees</p>
<div className="flex gap-3">
<button className="px-4 py-2 rounded-xl border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium" disabled={true}>Previous</button>
<button className="px-4 py-2 rounded-xl border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-medium">Next</button>
</div>
</div>
</div>
</div>
 </>
 );
}

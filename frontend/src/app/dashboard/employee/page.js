'use client';

import Link from 'next/link';

export default function Page() {
 const active = 'employee';
 return (
 <>
{/* Page Content */}
<main className="flex-1 bg-surface-container-low px-gutter py-8">
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
<Link href="/dashboard/profile" className="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface block text-center">View</Link>
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
<Link href="/dashboard/profile" className="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface block text-center">View</Link>
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
<Link href="/dashboard/profile" className="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface block text-center">View</Link>
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
<Link href="/dashboard/profile" className="flex-1 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors font-label-sm text-label-sm text-on-surface block text-center">View</Link>
<button className="w-8 h-8 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">mail</span>
</button>
</div>
</div>
</div>
</div>
</main>
 </>
 );
}

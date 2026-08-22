'use client';

import Link from 'next/link';

export default function PerformanceReviewPage() {
 return (
 <>
{/* Main Canvas */}
 <main className="flex-1 p-4 md:p-gutter bg-surface">
 <div className="max-w-[1200px] mx-auto pb-12">
 {/* Breadcrumbs & Header */}
 <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
 <div>
 <nav className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant mb-3">
 <Link href="/dashboard/employee" className="hover:text-primary transition-colors">Employees</Link>
 <span className="material-symbols-outlined text-[16px]">chevron_right</span>
 <a className="hover:text-primary transition-colors" href="#">Sarah Jenkins</a>
 <span className="material-symbols-outlined text-[16px]">chevron_right</span>
 <span className="text-on-surface font-medium">Performance Review Q3</span>
 </nav>
 <div className="flex items-center gap-4">
 <div className="relative">
 <img alt="Sarah Jenkins" className="w-16 h-16 rounded-full border-2 border-surface object-cover shadow-sm" src="https://i.pravatar.cc/150?u=sarah" />
 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center border-2 border-surface text-on-secondary">
 <span className="material-symbols-outlined text-[12px]">verified</span>
 </div>
 </div>
 <div>
 <h2 className="font-headline-lg text-headline-lg text-on-surface">Sarah Jenkins <span className="text-outline font-normal">| Product Design Lead</span></h2>
 <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 flex items-center gap-4">
 <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">domain</span> Design Department</span>
 <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">history</span> Employed 2y 4m</span>
 </p>
 </div>
 </div>
 </div>
 <div className="flex gap-3">
 <button className="px-4 py-2 border border-outline-variant rounded-lg font-body-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2">
 <span className="material-symbols-outlined text-[18px]">download</span> Export PDF
 </button>
 <button className="px-4 py-2 bg-primary text-on-primary rounded-lg font-body-sm font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
 <span className="material-symbols-outlined text-[18px]">edit_document</span> Edit Review
 </button>
 </div>
 </div>

 {/* Review Status Banner */}
 <div className="bg-tertiary-container/30 border border-tertiary/20 rounded-xl p-4 flex items-center justify-between mb-8">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center">
 <span className="material-symbols-outlined">done_all</span>
 </div>
 <div>
 <h4 className="font-title-md text-title-md text-on-surface">Q3 Review Completed</h4>
 <p className="font-body-sm text-body-sm text-on-surface-variant">Acknowledged by employee on Oct 14, 2023.</p>
 </div>
 </div>
 <div className="text-right">
 <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">Overall Rating</p>
 <div className="flex items-center gap-1 text-secondary">
 <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
 <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
 <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
 <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
 <span className="material-symbols-outlined text-outline">star</span>
 <span className="font-title-lg text-title-lg text-on-surface ml-2">4.2</span>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Left Column (Main Review Content) */}
 <div className="lg:col-span-2 space-y-6">
 
 {/* Core Competencies */}
 <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
 <h3 className="font-title-lg text-title-lg text-on-surface mb-6 flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">psychology</span> Core Competencies
 </h3>
 
 <div className="space-y-6">
 {/* Competency 1 */}
 <div>
 <div className="flex justify-between items-end mb-2">
 <h4 className="font-title-md text-title-md text-on-surface">Technical Skills & Execution</h4>
 <span className="font-body-md font-bold text-secondary">5.0 / 5.0</span>
 </div>
 <div className="w-full bg-surface-container-highest rounded-full h-2 mb-3 overflow-hidden">
 <div className="bg-secondary h-2 rounded-full" style={{ width: "100%" }}></div>
 </div>
 <p className="font-body-sm text-on-surface-variant">Sarah consistently delivers high-quality design work. Her mastery of Figma and prototyping tools has significantly accelerated our sprint cycles. She successfully led the design system overhaul this quarter without missing any deadlines.</p>
 </div>

 {/* Competency 2 */}
 <div>
 <div className="flex justify-between items-end mb-2">
 <h4 className="font-title-md text-title-md text-on-surface">Communication & Collaboration</h4>
 <span className="font-body-md font-bold text-primary">4.0 / 5.0</span>
 </div>
 <div className="w-full bg-surface-container-highest rounded-full h-2 mb-3 overflow-hidden">
 <div className="bg-primary h-2 rounded-full" style={{ width: "80%" }}></div>
 </div>
 <p className="font-body-sm text-on-surface-variant">Excellent cross-functional collaboration with the engineering team. Sarah communicates design rationale clearly. There is slight room for improvement in proactively updating stakeholders when scope changes occur during a sprint.</p>
 </div>

 {/* Competency 3 */}
 <div>
 <div className="flex justify-between items-end mb-2">
 <h4 className="font-title-md text-title-md text-on-surface">Leadership & Mentorship</h4>
 <span className="font-body-md font-bold text-tertiary">3.5 / 5.0</span>
 </div>
 <div className="w-full bg-surface-container-highest rounded-full h-2 mb-3 overflow-hidden">
 <div className="bg-tertiary h-2 rounded-full" style={{ width: "70%" }}></div>
 </div>
 <p className="font-body-sm text-on-surface-variant">As a new lead, Sarah is finding her footing. She provides good feedback during design critiques but could take a more active role in formalizing mentorship sessions for junior designers.</p>
 </div>
 </div>
 </section>

 {/* Manager Comments */}
 <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
 <h3 className="font-title-lg text-title-lg text-on-surface mb-4 flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">forum</span> Manager's Summary
 </h3>
 <div className="bg-surface-container-low rounded-xl p-5 border-l-4 border-primary">
 <p className="font-body-md text-on-surface italic mb-4">"Sarah has had an outstanding quarter. Stepping into the Lead role mid-project is never easy, but she handled the transition gracefully. Her work on the new Dashboard UI (Dayflow HRMS) directly contributed to a 15% increase in user engagement scores. Looking ahead, I'd like to see her focus more on team capacity building and delegating tasks to her direct reports."</p>
 <div className="flex items-center gap-3">
 <img alt="Manager" className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/150?u=manager" />
 <div>
 <p className="font-label-sm text-on-surface font-medium">Reviewed by Michael Chen</p>
 <p className="font-label-sm text-on-surface-variant">VP of Design • Oct 12, 2023</p>
 </div>
 </div>
 </div>
 </section>
 
 {/* Employee Comments */}
 <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
 <h3 className="font-title-lg text-title-lg text-on-surface mb-4 flex items-center gap-2">
 <span className="material-symbols-outlined text-secondary">person_check</span> Employee Comments
 </h3>
 <div className="bg-surface p-5 border border-outline-variant rounded-xl">
 <p className="font-body-md text-on-surface-variant">"I agree with Michael's assessment. Leading the design system project was challenging but rewarding. I acknowledge the feedback regarding delegation—it's something I struggled with initially as I wanted to ensure quality, but I am actively working with the junior team to build trust and hand off larger pieces of work next quarter."</p>
 </div>
 </section>
 </div>

 {/* Right Column (Goals & Metadata) */}
 <div className="space-y-6">
 {/* Goals Progress */}
 <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
 <div className="flex justify-between items-center mb-6">
 <h3 className="font-title-md text-title-md text-on-surface">Q3 Goals</h3>
 <span className="bg-secondary-container text-on-secondary-container text-label-sm font-bold px-2 py-1 rounded-md">85% Complete</span>
 </div>
 
 <ul className="space-y-4">
 <li className="flex items-start gap-3">
 <div className="mt-0.5 text-secondary">
 <span className="material-symbols-outlined text-[20px]">check_circle</span>
 </div>
 <div>
 <p className="font-body-sm font-medium text-on-surface">Launch Global Design System V2</p>
 <p className="font-label-sm text-on-surface-variant">Completed Sept 15</p>
 </div>
 </li>
 <li className="flex items-start gap-3">
 <div className="mt-0.5 text-secondary">
 <span className="material-symbols-outlined text-[20px]">check_circle</span>
 </div>
 <div>
 <p className="font-body-sm font-medium text-on-surface">Reduce prototype handoff time by 20%</p>
 <p className="font-label-sm text-on-surface-variant">Achieved 25% reduction</p>
 </div>
 </li>
 <li className="flex items-start gap-3">
 <div className="mt-0.5 text-primary">
 <span className="material-symbols-outlined text-[20px]">pending</span>
 </div>
 <div>
 <p className="font-body-sm font-medium text-on-surface">Conduct 3 accessibility workshops</p>
 <p className="font-label-sm text-on-surface-variant">2/3 completed. Moved to Q4.</p>
 </div>
 </li>
 </ul>
 <button className="w-full mt-6 py-2 border border-outline-variant rounded-lg font-body-sm text-primary hover:bg-surface-container-low transition-colors">View All Goals</button>
 </section>

 {/* Upcoming Goals */}
 <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
 <div className="absolute -right-4 -top-4 text-primary/10">
 <span className="material-symbols-outlined text-[100px]">flag</span>
 </div>
 <h3 className="font-title-md text-title-md text-primary mb-4 relative z-10">Next Quarter Focus</h3>
 <ul className="list-disc list-inside space-y-2 font-body-sm text-on-surface relative z-10">
 <li>Establish formalized mentorship program for junior designers.</li>
 <li>Lead UX research initiative for Mobile App redesign.</li>
 <li>Complete Advanced Accessibility Certification.</li>
 </ul>
 </section>

 {/* Review Details */}
 <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
 <h3 className="font-title-md text-title-md text-on-surface mb-4">Review Details</h3>
 <div className="space-y-3 font-body-sm">
 <div className="flex justify-between py-2 border-b border-outline-variant/50">
 <span className="text-on-surface-variant">Period</span>
 <span className="font-medium text-on-surface">Jul 1 - Sep 30, 2023</span>
 </div>
 <div className="flex justify-between py-2 border-b border-outline-variant/50">
 <span className="text-on-surface-variant">Type</span>
 <span className="font-medium text-on-surface">Quarterly Check-in</span>
 </div>
 <div className="flex justify-between py-2 border-b border-outline-variant/50">
 <span className="text-on-surface-variant">Self-Review Submitted</span>
 <span className="font-medium text-on-surface">Oct 5, 2023</span>
 </div>
 <div className="flex justify-between py-2">
 <span className="text-on-surface-variant">Next Review Due</span>
 <span className="font-medium text-on-surface">Jan 15, 2024</span>
 </div>
 </div>
 </section>
 </div>
 </div>
 </div>
 </main>
 </>
 );
}

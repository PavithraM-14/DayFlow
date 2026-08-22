'use client';

import { useState } from 'react';

import Link from 'next/link';

export default function Page() {
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const active = 'profile';
 return (
 <>
{/* Profile Content Canvas */}
<div className="flex-1 p-4 md:p-gutter">
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
<button onClick={() => setIsEditModalOpen(true)} className="flex-1 md:flex-none px-4 py-2 bg-primary text-on-primary rounded-[10px] font-label-sm hover:bg-surface-tint transition-colors flex items-center justify-center gap-2">
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
<Link className="py-4 text-on-surface-variant hover:text-primary transition-colors font-label-sm whitespace-nowrap" href="/dashboard/performance">Job Info</Link>
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

 {/* Edit Profile Modal */}
 {isEditModalOpen && (
 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-gutter font-body-md text-on-surface">
 <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
 
 <div className="relative bg-surface-container-lowest w-full max-w-[960px] rounded-[10px] border border-outline-variant shadow-[0_12px_24px_rgba(30,26,29,0.1)] flex flex-col max-h-[90vh] overflow-hidden z-10">
 {/* Header */}
 <header className="flex justify-between items-center px-4 md:px-8 py-6 border-b border-outline-variant bg-surface shrink-0">
 <div>
 <h1 className="font-headline-lg text-headline-lg text-primary">Edit Profile</h1>
 <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Update your personal and professional details.</p>
 </div>
 <button onClick={() => setIsEditModalOpen(false)} className="p-2 text-on-surface-variant hover:bg-surface-variant/50 rounded-full transition-colors group">
 <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">close</span>
 </button>
 </header>
 
 {/* Scrollable Form Area */}
 <div className="flex-1 px-4 md:px-8 py-6">
 <form className="space-y-6">
 {/* Profile Photo Section */}
 <div className="bg-surface-container-low rounded-xl border border-outline-variant p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
 <div className="relative group cursor-pointer shrink-0">
 <img alt="Profile Picture" className="w-24 h-24 rounded-full object-cover border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyxifbI3YBP0Q5JjVgfpRQi7k1fj0SzvOCEEJzYZow9uOn5IvCd3DVK03LuLcJN5aJNr77wnhYF1YS7qlIHtKhL0MHKJBev0Pxyc0r9OZC73J22B3h6idMGB_AOeigA76KsQukwjCgCrjno6aOGYaeZ74Q6ciUkI4MhpsCNuTHw1LfPph1Re5orKdQjvzsvQtZ3-uYH0lSJ-4B3YeXWlA6L4l2lOYBpWwfL1hSKn12UjGzleiEHl9RKw" />
 <div className="absolute inset-0 bg-on-surface/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
 <span className="material-symbols-outlined text-on-primary">photo_camera</span>
 </div>
 </div>
 <div>
 <h3 className="font-title-md text-title-md text-on-surface mb-2">Profile Photo</h3>
 <div className="flex gap-4">
 <button className="bg-primary text-on-primary font-label-sm text-label-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity" type="button">Upload New</button>
 <button className="text-error hover:bg-error-container font-label-sm text-label-sm px-4 py-2 rounded-lg transition-colors" type="button">Remove</button>
 </div>
 <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 text-xs">JPG, GIF or PNG. Max size of 2MB.</p>
 </div>
 </div>

 {/* Bento Grid for Form Sections */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Personal Details */}
 <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 space-y-4">
 <div className="flex items-center gap-2 mb-2 border-b border-surface-variant pb-2">
 <span className="material-symbols-outlined text-primary text-xl">person</span>
 <h3 className="font-title-md text-title-md text-on-surface">Personal Details</h3>
 </div>
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Full Name</label>
 <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none" type="text" defaultValue="Eleanor Shellstrop" />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Date of Birth</label>
 <div className="relative">
 <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none appearance-none" type="date" defaultValue="1990-10-14" />
 </div>
 </div>
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Nationality</label>
 <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none">
 <option>American</option>
 <option>Canadian</option>
 <option>British</option>
 </select>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Gender</label>
 <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none">
 <option>Female</option>
 <option>Male</option>
 <option>Non-binary</option>
 <option>Prefer not to say</option>
 </select>
 </div>
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Marital Status</label>
 <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none">
 <option>Single</option>
 <option>Married</option>
 <option>Divorced</option>
 </select>
 </div>
 </div>
 </div>

 {/* Contact Details */}
 <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 space-y-4">
 <div className="flex items-center gap-2 mb-2 border-b border-surface-variant pb-2">
 <span className="material-symbols-outlined text-primary text-xl">contact_mail</span>
 <h3 className="font-title-md text-title-md text-on-surface">Contact Details</h3>
 </div>
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1 flex justify-between">Work Email <span className="text-xs text-outline">(Read Only)</span></label>
 <input className="w-full bg-surface-variant/30 border border-outline-variant/50 rounded-lg px-4 py-2 text-on-surface-variant font-body-sm text-body-sm cursor-not-allowed" disabled type="email" defaultValue="eleanor.s@dayflow.com" />
 </div>
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Personal Email</label>
 <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none" type="email" defaultValue="eshellstrop89@gmail.com" />
 </div>
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Phone Number</label>
 <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none" type="tel" defaultValue="+1 (555) 019-2834" />
 </div>
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Current Address</label>
 <textarea className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none resize-none" rows="2" defaultValue="123 Fake Street, Apt 4B\nPhoenix, AZ 85001"></textarea>
 </div>
 </div>

 {/* Professional Info */}
 <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 space-y-4 md:col-span-2">
 <div className="flex items-center gap-2 mb-2 border-b border-surface-variant pb-2">
 <span className="material-symbols-outlined text-primary text-xl">work</span>
 <h3 className="font-title-md text-title-md text-on-surface">Professional Information</h3>
 <span className="ml-auto font-accent-marker text-accent-marker text-primary-container marker-highlight hidden sm:inline-block">Admin approval required</span>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Job Title</label>
 <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none" type="text" defaultValue="Senior Sales Representative" />
 </div>
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Department</label>
 <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none">
 <option>Sales</option>
 <option>Marketing</option>
 <option>Engineering</option>
 <option>HR</option>
 </select>
 </div>
 <div>
 <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Location</label>
 <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2 text-on-surface font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-container focus:outline-none">
 <option>Phoenix Office</option>
 <option>Remote</option>
 <option>New York HQ</option>
 </select>
 </div>
 </div>
 </div>
 </div>
 </form>
 </div>
 
 {/* Footer Actions */}
 <footer className="bg-surface border-t border-outline-variant px-4 md:px-8 py-6 flex justify-end gap-4 shrink-0">
 <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 rounded-lg font-label-sm text-label-sm text-primary hover:bg-surface-variant/50 transition-colors" type="button">
 Cancel
 </button>
 <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 rounded-lg font-label-sm text-label-sm bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors shadow-sm flex items-center gap-2" type="button">
 <span className="material-symbols-outlined text-[18px]">save</span>
 Save Changes
 </button>
 </footer>
 </div>
 </div>
 )}
 </>
 );
}

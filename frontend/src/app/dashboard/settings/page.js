'use client';

import Link from 'next/link';
import DashboardShell from '@/components/DashboardShell';

export default function SettingsPage() {
 return (
 <DashboardShell variant="hr">
{/* Page Canvas */}
 <main className="flex-1 p-4 md:p-gutter">
 <div className="max-w-max-width mx-auto w-full pb-24">
 {/* Page Header */}
 <div className="mb-10">
 <h2 className="text-headline-lg font-headline-lg text-primary mb-2">System <span className="font-accent-marker text-accent-marker text-secondary marker-highlight relative z-10 inline-block after:content-[''] after:absolute after:left-[-5%] after:bottom-[2px] after:w-[110%] after:h-[40%] after:bg-primary-fixed-dim after:opacity-40 after:-z-10 after:-rotate-1 after:rounded-sm">Configuration</span></h2>
 <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl">Manage your organization's core preferences, security protocols, and platform defaults.</p>
 </div>
 {/* Bento Grid Layout */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
 {/* Left Column (Wider for primary settings) */}
 <div className="lg:col-span-8 flex flex-col gap-6">
 {/* Organization Profile */}
 <section className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] hover:border-outline-variant transition-all relative overflow-hidden group">
 {/* Decorative top bar */}
 <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
 <div className="flex items-center gap-3 mb-6">
 <span className="material-symbols-outlined text-primary">domain</span>
 <h3 className="text-title-md font-title-md text-on-surface">Organization Profile</h3>
 </div>
 <div className="flex flex-col sm:flex-row gap-6 mb-8">
 <div className="flex-shrink-0">
 <div className="w-24 h-24 rounded-lg bg-surface-container-low border border-outline-variant border-dashed flex flex-col items-center justify-center text-outline cursor-pointer hover:bg-surface-container hover:text-primary transition-colors group-hover:border-primary">
 <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">add_photo_alternate</span>
 <span className="text-label-sm font-label-sm">Upload Logo</span>
 </div>
 </div>
 <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="space-y-1.5 sm:col-span-2">
 <label className="text-label-sm font-label-sm text-on-surface-variant uppercase">Legal Company Name</label>
 <input className="w-full bg-surface border border-outline-variant rounded-[10px] px-3 py-2 text-body-md font-body-md text-on-surface placeholder:text-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none transition-all" type="text" defaultValue="Dayflow Technologies Inc." />
 </div>
 <div className="space-y-1.5">
 <label className="text-label-sm font-label-sm text-on-surface-variant uppercase">Industry</label>
 <select className="w-full bg-surface border border-outline-variant rounded-[10px] px-3 py-2 text-body-md font-body-md text-on-surface appearance-none bg-no-repeat bg-[right_12px_center] focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none transition-all" style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2380747a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')" }}>
 <option>Software & Technology</option>
 <option>Healthcare</option>
 <option>Finance</option>
 </select>
 </div>
 <div className="space-y-1.5">
 <label className="text-label-sm font-label-sm text-on-surface-variant uppercase">Registration Number</label>
 <input className="w-full bg-surface border border-outline-variant rounded-[10px] px-3 py-2 text-body-md font-body-md text-on-surface placeholder:text-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none transition-all" type="text" defaultValue="DF-8992-B" />
 </div>
 </div>
 </div>
 <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
 <button className="px-4 py-2 rounded-lg text-body-sm font-body-sm font-medium text-primary hover:bg-surface-container-low transition-colors">Discard Changes</button>
 <button className="px-4 py-2 rounded-lg text-body-sm font-body-sm font-medium bg-primary text-on-primary hover:bg-tertiary-container transition-colors shadow-sm">Save Profile</button>
 </div>
 </section>
 {/* Security & Access */}
 <section className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
 <div className="flex items-center justify-between mb-6">
 <div className="flex items-center gap-3">
 <span className="material-symbols-outlined text-secondary">shield_lock</span>
 <h3 className="text-title-md font-title-md text-on-surface">Security & Access</h3>
 </div>
 <span className="bg-surface-container-high text-primary px-2 py-1 rounded text-label-sm font-label-sm">High Security</span>
 </div>
 <div className="space-y-6">
 {/* Password Change */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-outline-variant bg-surface">
 <div>
 <h4 className="text-body-md font-body-md font-medium text-on-surface mb-1">Administrator Password</h4>
 <p className="text-body-sm font-body-sm text-on-surface-variant">Last changed 45 days ago. We recommend changing it every 90 days.</p>
 </div>
 <button className="px-4 py-2 rounded-lg text-body-sm font-body-sm font-medium border border-outline-variant text-on-surface hover:bg-surface-container-lowest transition-colors whitespace-nowrap">Update Password</button>
 </div>
 {/* 2FA */}
 <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-4 rounded-lg border border-outline-variant bg-surface-bright">
 <div>
 <div className="flex items-center gap-2 mb-1">
 <h4 className="text-body-md font-body-md font-medium text-on-surface">Two-Factor Authentication (2FA)</h4>
 <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Active</span>
 </div>
 <p className="text-body-sm font-body-sm text-on-surface-variant max-w-md">Require a security key or authenticator code in addition to passwords for all administrative accounts.</p>
 </div>
 <label className="relative inline-flex items-center cursor-pointer mt-1">
 <input className="sr-only peer" type="checkbox" defaultChecked />
 <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-container rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
 </label>
 </div>
 </div>
 </section>
 </div>
 {/* Right Column (Narrower for preferences and notifications) */}
 <div className="lg:col-span-4 flex flex-col gap-6">
 {/* User Preferences */}
 <section className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow">
 <div className="flex items-center gap-3 mb-6">
 <span className="material-symbols-outlined text-primary-container">tune</span>
 <h3 className="text-title-md font-title-md text-on-surface">Localization</h3>
 </div>
 <div className="space-y-4">
 <div className="space-y-1.5">
 <label className="text-label-sm font-label-sm text-on-surface-variant uppercase">System Language</label>
 <select className="w-full bg-surface border border-outline-variant rounded-[10px] px-3 py-2 text-body-md font-body-md text-on-surface appearance-none bg-no-repeat bg-[right_12px_center] focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none transition-all" style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2380747a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')" }}>
 <option>English (United States)</option>
 <option>French (Canada)</option>
 <option>Spanish (Latin America)</option>
 </select>
 </div>
 <div className="space-y-1.5">
 <label className="text-label-sm font-label-sm text-on-surface-variant uppercase">Default Timezone</label>
 <select className="w-full bg-surface border border-outline-variant rounded-[10px] px-3 py-2 text-body-md font-body-md text-on-surface appearance-none bg-no-repeat bg-[right_12px_center] focus:border-primary focus:ring-2 focus:ring-primary-fixed focus:outline-none transition-all" style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2380747a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')" }}>
 <option>(GMT-05:00) Eastern Time</option>
 <option>(GMT-08:00) Pacific Time</option>
 <option>(GMT+00:00) UTC</option>
 </select>
 </div>
 <div className="space-y-1.5 pt-2">
 <label className="text-label-sm font-label-sm text-on-surface-variant uppercase block mb-2">Interface Theme</label>
 <div className="grid grid-cols-2 gap-2">
 <button className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-primary bg-surface-container-lowest text-primary">
 <span className="material-symbols-outlined mb-1">light_mode</span>
 <span className="text-label-sm font-label-sm">Light</span>
 </button>
 <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-outline-variant bg-surface text-on-surface-variant hover:bg-surface-container transition-colors">
 <span className="material-symbols-outlined mb-1">dark_mode</span>
 <span className="text-label-sm font-label-sm">Dark</span>
 </button>
 </div>
 </div>
 </div>
 </section>
 {/* Notifications */}
 <section className="bg-surface-container-lowest border border-outline-variant rounded-[10px] p-6 hover:shadow-[0_4px_12px_rgba(87,52,79,0.05)] transition-shadow flex-1">
 <div className="flex items-center gap-3 mb-6">
 <span className="material-symbols-outlined text-secondary">notifications_active</span>
 <h3 className="text-title-md font-title-md text-on-surface">Alerts</h3>
 </div>
 <div className="space-y-4">
 {/* Alert Item */}
 <div className="flex items-center justify-between pb-4 border-b border-outline-variant/50">
 <div className="pr-4">
 <h4 className="text-body-sm font-body-sm font-medium text-on-surface">Payroll Approvals</h4>
 <p className="text-label-sm font-label-sm text-on-surface-variant">Notify when payroll runs require sign-off.</p>
 </div>
 <label className="relative inline-flex items-center cursor-pointer shrink-0">
 <input className="sr-only peer" type="checkbox" defaultChecked />
 <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
 </label>
 </div>
 {/* Alert Item */}
 <div className="flex items-center justify-between pb-4 border-b border-outline-variant/50">
 <div className="pr-4">
 <h4 className="text-body-sm font-body-sm font-medium text-on-surface">Time Off Requests</h4>
 <p className="text-label-sm font-label-sm text-on-surface-variant">Daily digest of pending leave requests.</p>
 </div>
 <label className="relative inline-flex items-center cursor-pointer shrink-0">
 <input className="sr-only peer" type="checkbox" defaultChecked />
 <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
 </label>
 </div>
 {/* Alert Item */}
 <div className="flex items-center justify-between">
 <div className="pr-4">
 <h4 className="text-body-sm font-body-sm font-medium text-on-surface">System Updates</h4>
 <p className="text-label-sm font-label-sm text-on-surface-variant">Platform maintenance and feature releases.</p>
 </div>
 <label className="relative inline-flex items-center cursor-pointer shrink-0">
 <input className="sr-only peer" type="checkbox" />
 <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
 </label>
 </div>
 </div>
 </section>
 </div>
 </div>
 </div>
 </main>
 </DashboardShell>
 );
}

'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
 approveEmployeeRequest,
 listEmployeeRequests,
 rejectEmployeeRequest,
} from '@/services/employeeRequests';

const TABS = [
 { key: 'pending', label: 'Pending' },
 { key: 'approved', label: 'Approved' },
 { key: 'rejected', label: 'Rejected' },
];

const STATUS_STYLES = {
 pending: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
 approved: 'bg-secondary-container text-on-secondary-container',
 rejected: 'bg-error-container text-on-error-container',
};

const formatDate = (value) => {
 if (!value) return '—';
 const date = new Date(value);
 if (Number.isNaN(date.getTime())) return '—';
 return date.toLocaleString(undefined, {
 day: 'numeric',
 month: 'short',
 year: 'numeric',
 hour: '2-digit',
 minute: '2-digit',
 });
};

export default function NewEmployeeVerificationPage() {
 const { user } = useAuth();

 const [tab, setTab] = useState('pending');
 const [requests, setRequests] = useState([]);
 const [pendingCount, setPendingCount] = useState(0);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');
 const [notice, setNotice] = useState('');
 // id of the row currently being approved/rejected, so only that row's
 // buttons spin rather than the whole table.
 const [actingOn, setActingOn] = useState(null);

 const isHr = user?.role === 'hr';

 const load = useCallback(
 async (status, { quiet = false } = {}) => {
 if (!quiet) setLoading(true);
 setError('');

 const response = await listEmployeeRequests(status);

 if (!response.success) {
 setError(response.message || 'Could not load registration requests.');
 setRequests([]);
 } else {
 setRequests(response.data?.requests || []);
 setPendingCount(response.data?.pendingCount ?? 0);
 }

 setLoading(false);
 },
 []
 );

 useEffect(() => {
 if (isHr) load(tab);
 }, [tab, isHr, load]);

 const act = async (request, action) => {
 setActingOn(request._id);
 setError('');
 setNotice('');

 const response =
 action === 'approve'
 ? await approveEmployeeRequest(request._id)
 : await rejectEmployeeRequest(request._id);

 setActingOn(null);

 if (!response.success) {
 setError(response.message || 'Could not update that request.');
 // A 409 means someone else already decided it — refresh so the
 // table stops showing a stale row.
 if (response.status === 409) load(tab, { quiet: true });
 return;
 }

 setNotice(response.message || 'Request updated.');
 load(tab, { quiet: true });
 };

 // Only HR has this queue; anyone else gets told rather than shown an
 // empty table (the API would refuse them anyway).
 if (user && !isHr) {
 return (
 <div className="bg-surface text-on-surface font-body-md h-screen flex items-center justify-center p-gutter">
 <div className="max-w-md text-center">
 <span className="material-symbols-outlined text-[40px] text-outline">lock</span>
 <h1 className="font-headline-lg text-headline-lg text-on-surface mt-2 mb-1">
 HR access only
 </h1>
 <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
 New employee verification is available to HR accounts.
 </p>
 <Link
 className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-body-sm text-body-sm hover:opacity-90 transition-opacity"
 href="/dashboard"
 >
 Back to your dashboard
 </Link>
 </div>
 </div>
 );
 }

 return (
 <div className="bg-surface text-on-surface font-body-md h-screen flex overflow-hidden">
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
 <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="/dashboard/hr">
 <span className="material-symbols-outlined">dashboard</span>
 <span>Dashboard</span>
 </Link>
 </li>
 <li>
 <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="/dashboard/employee">
 <span className="material-symbols-outlined">groups</span>
 <span>Employees</span>
 </Link>
 </li>
 {/* Active Nav Item */}
 <li>
 <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-secondary-container bg-secondary-container font-bold scale-[0.98] transition-transform duration-150" href="/dashboard/verification">
 <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
 <span className="flex-grow">New Employee Verification</span>
 {pendingCount > 0 && (
 <span className="min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-error text-on-error font-label-sm text-label-sm">
 {pendingCount}
 </span>
 )}
 </Link>
 </li>
 <li>
 <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="/dashboard/attendance">
 <span className="material-symbols-outlined">pending_actions</span>
 <span>Attendance</span>
 </Link>
 </li>
 <li>
 <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="/dashboard/time-off">
 <span className="material-symbols-outlined">calendar_today</span>
 <span>Time Off</span>
 </Link>
 </li>
 <li>
 <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="/dashboard/payroll">
 <span className="material-symbols-outlined">payments</span>
 <span>Payroll</span>
 </Link>
 </li>
 <li>
 <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="/dashboard/reports">
 <span className="material-symbols-outlined">assessment</span>
 <span>Reports</span>
 </Link>
 </li>
 </ul>

 <div className="mt-auto border-t border-outline-variant pt-4">
 <ul className="flex flex-col gap-1">
 <li>
 <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="/dashboard/profile">
 <span className="material-symbols-outlined">person</span>
 <span>Profile</span>
 </Link>
 </li>
 <li>
 <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="#">
 <span className="material-symbols-outlined">help_outline</span>
 <span>Help</span>
 </a>
 </li>
 </ul>
 </div>
 </nav>

 {/* Main Content Wrapper */}
 <div className="flex-grow flex flex-col md: w-full h-screen overflow-hidden">
 {/* TopAppBar */}
 <header className="bg-surface flex justify-between items-center h-16 px-gutter border-b border-outline-variant sticky top-0 z-40">
 <h1 className="font-title-md text-title-md text-on-surface md:hidden">Verification</h1>
 <div className="flex items-center gap-4 ml-auto">
 <span className="font-body-sm text-body-sm text-on-surface-variant hidden sm:inline">
 {user?.company?.name}
 </span>
 <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
 {user?.name?.charAt(0)?.toUpperCase() || '?'}
 </div>
 </div>
 </header>

 {/* Main Canvas */}
 <main className="flex-grow p-gutter bg-surface">
 <div className="max-w-[1120px] mx-auto">
 {/* Header */}
 <div className="mb-6">
 <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">
 New Employee Verification
 </h2>
 <p className="font-body-sm text-body-sm text-on-surface-variant">
 People who have verified their email and asked to join
 {user?.company?.name ? ` ${user.company.name}` : ' your company'}.
 Accepting a request creates their account and lets them sign in.
 </p>
 </div>

 {/* Tabs */}
 <div className="flex items-center gap-1 mb-5 border-b border-outline-variant">
 {TABS.map((item) => (
 <button
 key={item.key}
 type="button"
 onClick={() => setTab(item.key)}
 className={`px-4 py-2 -mb-px border-b-2 font-body-sm text-body-sm transition-colors ${
 tab === item.key
 ? 'border-primary text-primary font-bold'
 : 'border-transparent text-on-surface-variant hover:text-on-surface'
 }`}
 >
 {item.label}
 {item.key === 'pending' && pendingCount > 0 && (
 <span className="ml-2 px-1.5 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm">
 {pendingCount}
 </span>
 )}
 </button>
 ))}
 <button
 type="button"
 onClick={() => load(tab)}
 className="ml-auto mb-1 px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-colors flex items-center gap-1.5 font-body-sm text-body-sm"
 >
 <span className="material-symbols-outlined text-[18px]">refresh</span>
 Refresh
 </button>
 </div>

 {error && (
 <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm" role="alert">
 <span className="material-symbols-outlined text-[18px]">error</span>
 <span>{error}</span>
 </div>
 )}
 {notice && (
 <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-secondary-container text-on-secondary-container font-body-sm text-body-sm" role="status">
 <span className="material-symbols-outlined text-[18px]">check_circle</span>
 <span>{notice}</span>
 </div>
 )}

 {/* Table */}
 <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
 {loading ? (
 <div className="p-10 text-center text-on-surface-variant font-body-sm text-body-sm" role="status">
 Loading requests...
 </div>
 ) : requests.length === 0 ? (
 <div className="p-12 text-center">
 <span className="material-symbols-outlined text-[40px] text-outline">
 {tab === 'pending' ? 'inbox' : 'history'}
 </span>
 <p className="font-title-md text-title-md text-on-surface mt-2 mb-1">
 No {tab} requests
 </p>
 <p className="font-body-sm text-body-sm text-on-surface-variant">
 {tab === 'pending'
 ? 'New sign-ups from your company will show up here.'
 : `Nothing has been ${tab} yet.`}
 </p>
 </div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-surface-container-low border-b border-outline-variant">
 <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant">Name</th>
 <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant">Contact</th>
 <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant">Role</th>
 <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant">Requested</th>
 <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant">Status</th>
 <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant text-right">
 {tab === 'pending' ? 'Decision' : 'Reviewed'}
 </th>
 </tr>
 </thead>
 <tbody>
 {requests.map((request) => {
 const busy = actingOn === request._id;

 return (
 <tr
 key={request._id}
 className="border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors"
 >
 <td className="px-4 py-3">
 <div className="flex items-center gap-3">
 <span className="w-9 h-9 flex-shrink-0 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
 {request.name?.charAt(0)?.toUpperCase() || '?'}
 </span>
 <span className="font-body-md text-body-md text-on-surface">
 {request.name}
 </span>
 </div>
 </td>
 <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant">
 <div>{request.email}</div>
 {request.phone && <div>{request.phone}</div>}
 </td>
 <td className="px-4 py-3">
 <span className="font-body-sm text-body-sm text-on-surface">
 {request.role === 'hr' ? 'HR' : 'Employee'}
 </span>
 </td>
 <td className="px-4 py-3 font-body-sm text-body-sm text-on-surface-variant whitespace-nowrap">
 {formatDate(request.createdAt)}
 </td>
 <td className="px-4 py-3">
 <span
 className={`inline-block px-2.5 py-1 rounded-full font-label-sm text-label-sm ${
 STATUS_STYLES[request.status] || ''
 }`}
 >
 {request.status}
 </span>
 </td>
 <td className="px-4 py-3">
 {request.status === 'pending' ? (
 <div className="flex items-center justify-end gap-2">
 <button
 type="button"
 disabled={busy}
 onClick={() => act(request, 'approve')}
 title={`Accept ${request.name}`}
 aria-label={`Accept ${request.name}'s request`}
 className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
 >
 <span className="material-symbols-outlined text-[20px]">
 {busy ? 'hourglass_top' : 'check'}
 </span>
 </button>
 <button
 type="button"
 disabled={busy}
 onClick={() => act(request, 'reject')}
 title={`Reject ${request.name}`}
 aria-label={`Reject ${request.name}'s request`}
 className="w-9 h-9 rounded-full bg-error-container text-on-error-container flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
 >
 <span className="material-symbols-outlined text-[20px]">close</span>
 </button>
 </div>
 ) : (
 <div className="text-right font-body-sm text-body-sm text-on-surface-variant">
 <div>{formatDate(request.reviewedAt)}</div>
 {request.reviewedBy?.name && (
 <div>by {request.reviewedBy.name}</div>
 )}
 </div>
 )}
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 )}
 </div>
 </div>
 </main>
 </div>
 </div>
 );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RequireAuth from '@/components/RequireAuth';
import { useAuth } from '@/context/AuthContext';

export default function HRDashboardLayout({ children }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const getItemClasses = (path) => {
    // Exact match for dashboard, prefix match for others
    const isActive = path === '/dashboard/hr' 
      ? pathname === path 
      : pathname.startsWith(path);
      
    if (isActive) {
      return "flex items-center gap-3 px-3 py-2 rounded-lg text-on-secondary-container bg-secondary-container font-bold scale-[0.98] transition-transform duration-150";
    }
    return "flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all";
  };

  const getIconStyleString = (path) => {
    const isActive = path === '/dashboard/hr' 
      ? pathname === path 
      : pathname.startsWith(path);
      
    if (isActive) {
      return { fontVariationSettings: "'FILL' 1" };
    }
    return {};
  };

  const shell = (
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
            <Link className={getItemClasses('/dashboard/hr')} href="/dashboard/hr">
              <span className="material-symbols-outlined" style={getIconStyleString('/dashboard/hr')}>dashboard</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className={getItemClasses('/dashboard/employee')} href="/dashboard/employee">
              <span className="material-symbols-outlined" style={getIconStyleString('/dashboard/employee')}>groups</span>
              <span>Employees</span>
            </Link>
          </li>
          {user?.role === 'hr' && (
            <li>
              <Link className={getItemClasses('/dashboard/verification')} href="/dashboard/verification">
                <span className="material-symbols-outlined" style={getIconStyleString('/dashboard/verification')}>how_to_reg</span>
                <span>New Employee Verification</span>
              </Link>
            </li>
          )}
          <li>
            <Link className={getItemClasses('/dashboard/attendance')} href="/dashboard/attendance">
              <span className="material-symbols-outlined" style={getIconStyleString('/dashboard/attendance')}>pending_actions</span>
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link className={getItemClasses('/dashboard/time-off')} href="/dashboard/time-off">
              <span className="material-symbols-outlined" style={getIconStyleString('/dashboard/time-off')}>calendar_today</span>
              <span>Time Off</span>
            </Link>
          </li>
          <li>
            <Link className={getItemClasses('/dashboard/payroll')} href="/dashboard/payroll">
              <span className="material-symbols-outlined" style={getIconStyleString('/dashboard/payroll')}>payments</span>
              <span>Payroll</span>
            </Link>
          </li>
          <li>
            <Link className={getItemClasses('/dashboard/reports')} href="/dashboard/reports">
              <span className="material-symbols-outlined" style={getIconStyleString('/dashboard/reports')}>assessment</span>
              <span>Reports</span>
            </Link>
          </li>
        </ul>

        <div className="mt-auto border-t border-outline-variant pt-4">
          <ul className="flex flex-col gap-1">
            <li>
              <Link className={getItemClasses('/dashboard/settings')} href="/dashboard/settings">
                <span className="material-symbols-outlined" style={getIconStyleString('/dashboard/settings')}>settings</span>
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link className={getItemClasses('/dashboard/help')} href="/dashboard/help">
                <span className="material-symbols-outlined" style={getIconStyleString('/dashboard/help')}>help_outline</span>
                <span>Help</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-grow flex flex-col md:ml-64 h-screen overflow-hidden">
        {/* TopAppBar */}
        <header className="bg-surface flex justify-between items-center h-16 px-gutter border-b border-outline-variant sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-4 flex-grow max-w-md">
            <button className="md:hidden text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="relative w-full hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-[10px] focus:ring-2 focus:ring-primary-container focus:border-primary focus:outline-none transition-colors text-body-sm font-body-sm shadow-sm"
                placeholder="Search employees, documents..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <span className="font-accent-marker text-accent-marker text-secondary hidden lg:block">Welcome back, Admin!</span>
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant hidden sm:flex">
              <span className="material-symbols-outlined">apps</span>
            </button>
            <Link href="/dashboard/profile" className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant ml-2 block cursor-pointer">
              <img
                alt="Administrator Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrJ1l9JGS0deg42HpVQSStp3WuLg6cFZW2FeG26-gaOuYdb6ndlwrx2AuaA27pg_mwg-16BH0vLFVhbSYT_mV6myPlpU4qy2NJ_opECPnYffJnHomg15Xs2ms4GmmLi3nl8qphGPoWWcyhhYNSJTjr42ac6VRMY6AFBrSr5ALG3Pt2PH4hMFAMsCFMQTOCwpWDb_wcsXAldmDawt7V86kvLeq6kxCD7Yttk5p3P4saztOMOfhirc7mSQ"
              />
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto relative">
          {children}
        </div>
      </div>
    </div>
  );

  return <RequireAuth>{shell}</RequireAuth>;
}

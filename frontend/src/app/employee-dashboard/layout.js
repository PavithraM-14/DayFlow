'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function EmployeeDashboardLayout({ children }) {
  const pathname = usePathname();

  const getItemClasses = (path) => {
    // Exact match for dashboard, prefix match for others if needed
    const isActive = path === '/employee-dashboard' 
      ? pathname === path 
      : pathname.startsWith(path);
      
    if (isActive) {
      return "flex items-center gap-3 px-3 py-2 rounded-lg text-on-secondary-container bg-secondary-container font-bold scale-[0.98] transition-transform duration-150";
    }
    return "flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all";
  };

  const getIconStyleString = (path) => {
    const isActive = path === '/employee-dashboard' 
      ? pathname === path 
      : pathname.startsWith(path);
      
    if (isActive) {
      return { fontVariationSettings: "'FILL' 1" };
    }
    return {};
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col bg-surface-container-lowest border-r border-outline-variant h-screen w-64 fixed left-0 py-6 px-4 z-50">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
            <span className="material-symbols-outlined">domain</span>
          </div>
          <div>
            <h1 className="text-title-md font-title-md font-black text-primary">Dayflow</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">HR Management</p>
          </div>
        </div>

        <ul className="flex flex-col gap-1 flex-grow">
          <li>
            <Link className={getItemClasses('/employee-dashboard')} href="/employee-dashboard">
              <span className="material-symbols-outlined" style={getIconStyleString('/employee-dashboard')}>dashboard</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link className={getItemClasses('/employee-dashboard/employees')} href="#">
              <span className="material-symbols-outlined" style={getIconStyleString('/employee-dashboard/employees')}>groups</span>
              <span>Employees</span>
            </Link>
          </li>
          <li>
            <Link className={getItemClasses('/employee-dashboard/attendance')} href="/employee-dashboard/attendance">
              <span className="material-symbols-outlined" style={getIconStyleString('/employee-dashboard/attendance')}>timer</span>
              <span>Attendance</span>
            </Link>
          </li>
          <li>
            <Link className={getItemClasses('/employee-dashboard/time-off')} href="/employee-dashboard/time-off">
              <span className="material-symbols-outlined" style={getIconStyleString('/employee-dashboard/time-off')}>event_available</span>
              <span>Time Off</span>
            </Link>
          </li>
          <li>
            <Link className={getItemClasses('/employee-dashboard/payroll')} href="/employee-dashboard/payroll">
              <span className="material-symbols-outlined" style={getIconStyleString('/employee-dashboard/payroll')}>payments</span>
              <span>Payroll</span>
            </Link>
          </li>
          <li>
            <Link className={getItemClasses('/employee-dashboard/reports')} href="#">
              <span className="material-symbols-outlined" style={getIconStyleString('/employee-dashboard/reports')}>bar_chart</span>
              <span>Reports</span>
            </Link>
          </li>
        </ul>

        <div className="mt-auto pt-4 flex flex-col gap-4 border-t border-outline-variant">
          <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[20px]">login</span>
            Check In
          </button>
          
          <ul className="flex flex-col gap-1">
            <li>
              <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="#">
                <span className="material-symbols-outlined">settings</span>
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all" href="/">
                <span className="material-symbols-outlined">logout</span>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative overflow-hidden">
        {/* TopNavBar (Mobile) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-outline-variant sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">menu</span>
            <h1 className="font-title-md text-primary">Dayflow</h1>
          </div>
          <Link href="/employee-dashboard/profile">
            <img alt="Profile photo" className="w-8 h-8 rounded-full border border-outline-variant bg-surface-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrJ1l9JGS0deg42HpVQSStp3WuLg6cFZW2FeG26-gaOuYdb6ndlwrx2AuaA27pg_mwg-16BH0vLFVhbSYT_mV6myPlpU4qy2NJ_opECPnYffJnHomg15Xs2ms4GmmLi3nl8qphGPoWWcyhhYNSJTjr42ac6VRMY6AFBrSr5ALG3Pt2PH4hMFAMsCFMQTOCwpWDb_wcsXAldmDawt7V86kvLeq6kxCD7Yttk5p3P4saztOMOfhirc7mSQ" />
          </Link>
        </header>

        {/* TopNavBar (Desktop) */}
        <header className="bg-surface flex justify-between items-center h-16 px-gutter border-b border-outline-variant sticky top-0 z-40 hidden md:flex shrink-0">
          <div className="flex items-center gap-4 flex-grow max-w-md">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-[10px] focus:ring-2 focus:ring-primary-container focus:border-primary focus:outline-none transition-colors text-body-sm font-body-sm" placeholder="Search employees, documents..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined">apps</span>
            </button>
            <Link href="/employee-dashboard/profile" className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant block cursor-pointer">
              <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrJ1l9JGS0deg42HpVQSStp3WuLg6cFZW2FeG26-gaOuYdb6ndlwrx2AuaA27pg_mwg-16BH0vLFVhbSYT_mV6myPlpU4qy2NJ_opECPnYffJnHomg15Xs2ms4GmmLi3nl8qphGPoWWcyhhYNSJTjr42ac6VRMY6AFBrSr5ALG3Pt2PH4hMFAMsCFMQTOCwpWDb_wcsXAldmDawt7V86kvLeq6kxCD7Yttk5p3P4saztOMOfhirc7mSQ" />
            </Link>
          </div>
        </header>

        {children}

        {/* BottomNavBar (Mobile Only) */}
        <nav className="md:hidden fixed bottom-0 w-full bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline z-50 px-2 py-2 flex justify-between items-center shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          <Link href="/employee-dashboard" className={`flex flex-col items-center p-2 rounded-lg transition-colors w-1/4 ${pathname === '/employee-dashboard' ? 'text-primary dark:text-primary-fixed bg-primary-container bg-opacity-20' : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest'}`}>
            <span className="material-symbols-outlined" style={getIconStyleString('/employee-dashboard')}>dashboard</span>
            <span className="text-[10px] mt-1 font-bold">Dashboard</span>
          </Link>
          <Link href="/employee-dashboard/attendance" className={`flex flex-col items-center p-2 rounded-lg transition-colors w-1/4 ${pathname.startsWith('/employee-dashboard/attendance') ? 'text-primary dark:text-primary-fixed bg-primary-container bg-opacity-20' : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest'}`}>
            <span className="material-symbols-outlined" style={getIconStyleString('/employee-dashboard/attendance')}>timer</span>
            <span className="text-[10px] mt-1 font-medium">Attendance</span>
          </Link>
          <Link href="/employee-dashboard/time-off" className={`flex flex-col items-center p-2 rounded-lg transition-colors w-1/4 ${pathname.startsWith('/employee-dashboard/time-off') ? 'text-primary dark:text-primary-fixed bg-primary-container bg-opacity-20' : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest'}`}>
            <span className="material-symbols-outlined" style={getIconStyleString('/employee-dashboard/time-off')}>event_available</span>
            <span className="text-[10px] mt-1 font-medium">Time Off</span>
          </Link>
          <Link href="/employee-dashboard/profile" className={`flex flex-col items-center p-2 rounded-lg transition-colors w-1/4 ${pathname.startsWith('/employee-dashboard/profile') ? 'text-primary dark:text-primary-fixed bg-primary-container bg-opacity-20' : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-variant dark:hover:bg-surface-container-highest'}`}>
            <span className="material-symbols-outlined" style={getIconStyleString('/employee-dashboard/profile')}>person</span>
            <span className="text-[10px] mt-1 font-medium">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

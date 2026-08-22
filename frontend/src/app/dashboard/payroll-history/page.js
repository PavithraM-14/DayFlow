'use client';

import Link from 'next/link';

export default function PayrollHistoryPage() {
  return (
    <>
{/* Main Canvas */}
        <main className="flex-1 overflow-y-auto p-4 md:p-gutter bg-surface">
          <div className="max-w-[1200px] mx-auto pb-12">
            {/* Header & Actions */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <nav className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant mb-2">
                  <Link href="/dashboard/payroll" className="hover:text-primary transition-colors">Payroll</Link>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  <span className="text-on-surface font-medium">History</span>
                </nav>
                <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-3">
                  Payroll Runs <span className="text-outline font-light">|</span> <span className="font-title-lg text-primary">2023</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">calendar_month</span>
                  <select className="pl-10 pr-8 py-2 bg-surface border border-outline-variant rounded-lg font-body-sm text-on-surface appearance-none focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                    <option>Year: 2023</option>
                    <option>Year: 2022</option>
                    <option>Year: 2021</option>
                  </select>
                </div>
                <button className="px-4 py-2 border border-outline-variant rounded-lg font-body-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">download</span> Export Annual Report
                </button>
              </div>
            </div>

            {/* Annual Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 card-hover">
                <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Total Processed (YTD)</p>
                <p className="font-display-md text-on-surface">$1.24M</p>
                <div className="mt-2 flex items-center gap-1 text-secondary font-label-sm">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +4.2% vs last year
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 card-hover">
                <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Total Taxes (YTD)</p>
                <p className="font-display-md text-on-surface">$342K</p>
                <div className="mt-2 flex items-center gap-1 text-outline font-label-sm">
                  Federal & State
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 card-hover">
                <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Total Benefits (YTD)</p>
                <p className="font-display-md text-on-surface">$128K</p>
                <div className="mt-2 flex items-center gap-1 text-outline font-label-sm">
                  Company Contributions
                </div>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col justify-center">
                <p className="font-body-sm font-medium text-primary mb-2">Next Scheduled Run</p>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">event_upcoming</span>
                  <span className="font-title-md text-on-surface">Oct 31, 2023</span>
                </div>
              </div>
            </div>

            {/* History Table */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-[#FAF8FA]">
                <h3 className="font-title-md text-on-surface">Past Payroll Runs</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                    <input type="text" placeholder="Search runs..." className="pl-9 pr-4 py-1.5 bg-surface border border-outline-variant rounded-md text-body-sm focus:border-primary outline-none" />
                  </div>
                  <button className="p-1.5 border border-outline-variant rounded-md text-on-surface hover:bg-surface-container-low transition-colors">
                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#FAF8FA] border-b border-outline-variant font-label-sm text-on-surface-variant uppercase tracking-wider">
                      <th className="px-4 py-3 font-medium w-12"></th>
                      <th className="px-4 py-3 font-medium">Run Date</th>
                      <th className="px-4 py-3 font-medium">Period</th>
                      <th className="px-4 py-3 font-medium">Employees</th>
                      <th className="px-4 py-3 font-medium text-right">Total Net Pay</th>
                      <th className="px-4 py-3 font-medium text-right">Total Cost</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-sm divide-y divide-outline-variant/50">
                    
                    {/* Row 1 (Expanded State Demo) */}
                    <tr className="bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors group">
                      <td className="px-4 py-3 text-center">
                        <button className="text-outline hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px] transition-transform rotate-90">chevron_right</span>
                        </button>
                      </td>
                      <td className="px-4 py-3 font-medium text-on-surface">Sep 30, 2023</td>
                      <td className="px-4 py-3 text-on-surface-variant">Sep 16 - Sep 30</td>
                      <td className="px-4 py-3 text-on-surface-variant">142</td>
                      <td className="px-4 py-3 text-right font-medium text-on-surface">$124,500.00</td>
                      <td className="px-4 py-3 text-right text-on-surface-variant">$162,340.50</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-secondary-fixed text-on-secondary-fixed">Paid</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-primary hover:bg-primary-container p-1 rounded transition-colors" title="Download Reports">
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                      </td>
                    </tr>
                    {/* Expanded Details Row */}
                    <tr className="bg-[#FAF8FA]">
                      <td colSpan="8" className="p-0 border-b-2 border-primary/20">
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-title-sm text-on-surface mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px] text-primary">analytics</span> Breakdown
                            </h4>
                            <div className="space-y-2 text-body-sm">
                              <div className="flex justify-between"><span className="text-on-surface-variant">Gross Pay:</span><span className="text-on-surface">$145,000.00</span></div>
                              <div className="flex justify-between"><span className="text-on-surface-variant">Taxes (Employee):</span><span className="text-on-surface">-$15,200.00</span></div>
                              <div className="flex justify-between"><span className="text-on-surface-variant">Benefits (Employee):</span><span className="text-on-surface">-$5,300.00</span></div>
                              <div className="w-full h-px bg-outline-variant my-1"></div>
                              <div className="flex justify-between font-medium"><span className="text-on-surface">Net Pay:</span><span className="text-on-surface">$124,500.00</span></div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-title-sm text-on-surface mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px] text-secondary">account_balance</span> Employer Costs
                            </h4>
                            <div className="space-y-2 text-body-sm">
                              <div className="flex justify-between"><span className="text-on-surface-variant">Employer Taxes:</span><span className="text-on-surface">$11,500.00</span></div>
                              <div className="flex justify-between"><span className="text-on-surface-variant">Employer Benefits:</span><span className="text-on-surface">$5,840.50</span></div>
                              <div className="w-full h-px bg-outline-variant my-1"></div>
                              <div className="flex justify-between font-medium"><span className="text-on-surface">Total Liability:</span><span className="text-on-surface">$17,340.50</span></div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-title-sm text-on-surface mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px] text-outline">description</span> Documents
                            </h4>
                            <div className="space-y-2">
                              <a href="#" className="flex items-center gap-2 text-body-sm text-primary hover:underline">
                                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span> Payroll Register
                              </a>
                              <a href="#" className="flex items-center gap-2 text-body-sm text-primary hover:underline">
                                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span> Tax Liability Report
                              </a>
                              <a href="#" className="flex items-center gap-2 text-body-sm text-primary hover:underline">
                                <span className="material-symbols-outlined text-[16px]">table_view</span> General Ledger Export (.csv)
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors group">
                      <td className="px-4 py-3 text-center">
                        <button className="text-outline hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px] transition-transform">chevron_right</span>
                        </button>
                      </td>
                      <td className="px-4 py-3 font-medium text-on-surface">Sep 15, 2023</td>
                      <td className="px-4 py-3 text-on-surface-variant">Sep 1 - Sep 15</td>
                      <td className="px-4 py-3 text-on-surface-variant">142</td>
                      <td className="px-4 py-3 text-right font-medium text-on-surface">$124,100.00</td>
                      <td className="px-4 py-3 text-right text-on-surface-variant">$161,900.25</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-secondary-fixed text-on-secondary-fixed">Paid</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-primary hover:bg-primary-container p-1 rounded transition-colors" title="Download Reports">
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors group">
                      <td className="px-4 py-3 text-center">
                        <button className="text-outline hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px] transition-transform">chevron_right</span>
                        </button>
                      </td>
                      <td className="px-4 py-3 font-medium text-on-surface">Aug 31, 2023</td>
                      <td className="px-4 py-3 text-on-surface-variant">Aug 16 - Aug 31</td>
                      <td className="px-4 py-3 text-on-surface-variant">140</td>
                      <td className="px-4 py-3 text-right font-medium text-on-surface">$122,800.00</td>
                      <td className="px-4 py-3 text-right text-on-surface-variant">$160,100.00</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-secondary-fixed text-on-secondary-fixed">Paid</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-primary hover:bg-primary-container p-1 rounded transition-colors" title="Download Reports">
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
              
              <div className="p-4 border-t border-outline-variant flex items-center justify-between text-body-sm text-on-surface-variant bg-surface-container-lowest">
                <span>Showing 1 to 3 of 18 entries (2023)</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled>Prev</button>
                  <button className="px-3 py-1 bg-primary text-on-primary rounded font-medium">1</button>
                  <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors">2</button>
                  <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors">...</button>
                  <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors">Next</button>
                </div>
              </div>
            </div>

          </div>
        </main>
    </>
  );
}

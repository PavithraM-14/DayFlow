'use client';

import Link from 'next/link';

export default function HelpSupportPage() {
  return (
    <>
{/* Main Canvas */}
        <main className="flex-1 overflow-y-auto p-4 md:p-gutter">
          <div className="max-w-[1000px] mx-auto pb-12">
            {/* Header Section */}
            <div className="mb-10 text-center relative max-w-2xl mx-auto pt-8">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-secondary-fixed-dim/20 rounded-full blur-3xl -z-10"></div>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-3">How can we help you today?</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">Search our knowledge base or browse categories below to find answers to your questions.</p>
              
              <div className="relative max-w-xl mx-auto shadow-sm">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-[24px]">search</span>
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary-container focus:outline-none transition-all text-body-md font-body-md shadow-sm" 
                  placeholder="E.g., How to process payroll..." 
                  type="text" 
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-on-primary px-4 py-2 rounded-xl font-body-sm font-medium hover:bg-primary/90 transition-colors">
                  Search
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Support Cards */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition-all card-hover group cursor-pointer text-center">
                <div className="w-16 h-16 mx-auto bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">menu_book</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface mb-2">Knowledge Base</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Browse articles, tutorials, and user guides.</p>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 hover:shadow-md hover:border-secondary/30 transition-all card-hover group cursor-pointer text-center">
                <div className="w-16 h-16 mx-auto bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">forum</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface mb-2">Community Forum</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Connect with other HR professionals.</p>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 hover:shadow-md hover:border-tertiary/30 transition-all card-hover group cursor-pointer text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-tertiary-container rounded-bl-[100px] -z-10 opacity-50"></div>
                <div className="w-16 h-16 mx-auto bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">support_agent</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface mb-2">Contact Support</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Get help directly from our support team.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Popular Articles */}
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">trending_up</span> Popular Articles
                </h3>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden">
                  <ul className="divide-y divide-outline-variant">
                    <li>
                      <a className="flex items-center justify-between p-4 hover:bg-surface-container-lowest/50 transition-colors group" href="#">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">article</span>
                          <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">How to run a standard payroll cycle</span>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center justify-between p-4 hover:bg-surface-container-lowest/50 transition-colors group" href="#">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">article</span>
                          <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Setting up new employee onboarding</span>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center justify-between p-4 hover:bg-surface-container-lowest/50 transition-colors group" href="#">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">article</span>
                          <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Managing time-off accrual policies</span>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
                      </a>
                    </li>
                    <li>
                      <a className="flex items-center justify-between p-4 hover:bg-surface-container-lowest/50 transition-colors group" href="#">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">article</span>
                          <span className="font-body-md text-on-surface group-hover:text-primary transition-colors">Generating compliance reports</span>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
                      </a>
                    </li>
                  </ul>
                  <div className="p-4 bg-surface-container-lowest border-t border-outline-variant text-center">
                    <button className="text-primary font-body-sm font-medium hover:underline">View all articles</button>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion Placeholder (Simplified for demo) */}
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">quiz</span> Frequently Asked
                </h3>
                <div className="space-y-3">
                  <details className="bg-surface-container-lowest border border-outline-variant rounded-xl group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-4 font-body-md font-medium text-on-surface cursor-pointer select-none">
                      How do I reset an employee's password?
                      <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-outline">expand_more</span>
                    </summary>
                    <div className="px-4 pb-4 pt-0 font-body-sm text-on-surface-variant border-t border-outline-variant/50 mt-2">
                      <p className="pt-3">Navigate to the Employee Directory, select the employee profile, click on 'Security Settings', and select 'Send Password Reset Link'. The employee will receive an email with instructions.</p>
                    </div>
                  </details>

                  <details className="bg-surface-container-lowest border border-outline-variant rounded-xl group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-4 font-body-md font-medium text-on-surface cursor-pointer select-none">
                      Can I customize the dashboard layout?
                      <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-outline">expand_more</span>
                    </summary>
                    <div className="px-4 pb-4 pt-0 font-body-sm text-on-surface-variant border-t border-outline-variant/50 mt-2">
                      <p className="pt-3">Currently, the dashboard layout is fixed for consistency, but you can customize which widgets appear by going to Settings &gt; Preferences &gt; Dashboard Widgets.</p>
                    </div>
                  </details>

                  <details className="bg-surface-container-lowest border border-outline-variant rounded-xl group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-4 font-body-md font-medium text-on-surface cursor-pointer select-none">
                      What happens if a payroll run fails?
                      <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-outline">expand_more</span>
                    </summary>
                    <div className="px-4 pb-4 pt-0 font-body-sm text-on-surface-variant border-t border-outline-variant/50 mt-2">
                      <p className="pt-3">If a payroll run fails due to validation errors (e.g., missing bank details), the system will halt the run and highlight the specific errors. You can correct these on the respective employee profiles and resume the run.</p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </main>
    </>
  );
}

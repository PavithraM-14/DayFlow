import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoleCard from "@/components/RoleCard";
import MarkerHighlight from "@/components/MarkerHighlight";
import styles from "./page.module.css";

export const metadata = {
  title: "Get Started — Dayflow",
};

const EMPLOYEE_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const HR_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <path d="M9 9h.01M9 13h.01M15 9h.01M15 13h.01" />
  </svg>
);

export default function GetStartedPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.content}>
        <div className="container">
          <section className={styles.section}>
            <div className={styles.eyebrow}>
              <MarkerHighlight>Let&apos;s get you set up</MarkerHighlight>
            </div>
            <h1 className={styles.heading}>How will you use Dayflow?</h1>
            <p className={styles.subheading}>
              Choose the option that fits you — you can always switch later.
            </p>

            <div className={styles.grid}>
              <RoleCard
                href="/signup/employee"
                icon={EMPLOYEE_ICON}
                title="Employee"
                description="Join already registered company"
              />
              <RoleCard
                href="/signup/hr"
                icon={HR_ICON}
                title="HR Officer"
                description="Register your company to use Dayflow"
              />
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

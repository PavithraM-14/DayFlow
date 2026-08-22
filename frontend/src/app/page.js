import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import styles from "./page.module.css";

const FEATURES = [
  {
    title: "Employee Profiles",
    description: "Personal details, job info, and documents in one record.",
  },
  {
    title: "Attendance Tracking",
    description: "Daily and weekly check-in/check-out at a glance.",
  },
  {
    title: "Leave Management",
    description: "Request, review, and approve time-off in a few clicks.",
  },
  {
    title: "Approval Workflows",
    description: "Admins and HR officers act on requests without delay.",
  },
  {
    title: "Payroll Visibility",
    description: "Employees view salary details; admins keep control.",
  },
  {
    title: "Role-Based Access",
    description: "Employee and Admin/HR roles see exactly what they need.",
  },
];

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.content}>
        <section className={styles.hero}>
          <div className="container">
            <span className={styles.badge}>HR Management System</span>
            <h1 className={styles.headline}>Every workday, perfectly aligned.</h1>
            <p className={styles.subhead}>
              Dayflow brings employee profiles, attendance, leave, and
              payroll visibility together in one simple system — built for
              HR teams and the people they support.
            </p>
            <div className={styles.actions}>
              <Link href="/get-started" className={styles.primaryButton}>
                Get Started
              </Link>
              <a href="#features" className={styles.secondaryLink}>
                Learn more
              </a>
            </div>
          </div>
        </section>

        <section id="features" className={styles.features}>
          <div className="container">
            <h2 className={styles.featuresHeading}>Everything HR needs, nothing it doesn&apos;t</h2>
            <p className={styles.featuresSubheading}>
              A focused set of tools for employees and HR admins alike.
            </p>
            <div className={styles.grid}>
              {FEATURES.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

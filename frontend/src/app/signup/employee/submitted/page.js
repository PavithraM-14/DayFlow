"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import AlertMessage from "@/components/AlertMessage";
import { getEmployeeSignupResult } from "@/utils/signupSession";
import styles from "./page.module.css";

/**
 * End of the employee sign-up flow. Nothing is actionable here on
 * purpose — the whole point is that the account does not exist yet and
 * the applicant has to wait on their company's HR.
 */
export default function EmployeeSignupSubmittedPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const stored = getEmployeeSignupResult();
    if (!stored?.request) {
      router.replace("/signup/employee");
      return;
    }
    setResult(stored);
  }, [router]);

  if (!result) return null;

  const { request } = result;
  const companyName = result.company?.name || result.companyName || "your company";

  return (
    <AuthCard
      heading="Request submitted"
      subheading={`Your registration request for ${companyName} has been submitted.`}
      maxWidth="520px"
      footer={
        <>
          Already approved? <Link href="/login">Go to Sign In</Link>
        </>
      }
    >
      <AlertMessage tone="success">
        Your email address has been verified.
      </AlertMessage>

      <p className={styles.stepBody}>
        You will be able to sign in once {companyName}&apos;s HR accepts your
        request. We&apos;ll keep your details on file until they do — there is
        nothing else for you to fill in.
      </p>

      <ol className={styles.steps}>
        <li className={styles.step}>
          <span className={`${styles.marker} ${styles.done}`} aria-hidden="true">
            ✓
          </span>
          <span className={styles.stepBody}>
            <span className={styles.stepTitle}>Email verified</span>
            <span className={styles.stepNote}>
              You confirmed {request.email}.
            </span>
          </span>
        </li>
        <li className={styles.step}>
          <span
            className={`${styles.marker} ${styles.current}`}
            aria-hidden="true"
          >
            2
          </span>
          <span className={styles.stepBody}>
            <span className={styles.stepTitle}>
              Waiting for HR approval <span className={styles.badge}>pending</span>
            </span>
            <span className={styles.stepNote}>
              {companyName}&apos;s HR can see your request on their New Employee
              Verification page.
            </span>
          </span>
        </li>
        <li className={styles.step}>
          <span
            className={`${styles.marker} ${styles.upcoming}`}
            aria-hidden="true"
          >
            3
          </span>
          <span className={styles.stepBody}>
            <span className={styles.stepTitle}>Sign in</span>
            <span className={styles.stepNote}>
              Once accepted, sign in with this email and the password you just
              chose.
            </span>
          </span>
        </li>
      </ol>

      <div className={styles.summary}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Company</span>
          <span className={styles.rowValue}>{companyName}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Name</span>
          <span className={styles.rowValue}>{request.name}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Email</span>
          <span className={styles.rowValue}>{request.email}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Requested role</span>
          <span className={styles.rowValue}>
            {request.role === "hr" ? "HR" : "Employee"}
          </span>
        </div>
      </div>
    </AuthCard>
  );
}

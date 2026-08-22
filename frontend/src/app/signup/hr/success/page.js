"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import AlertMessage from "@/components/AlertMessage";
import { API_BASE_URL } from "@/config";
import { clearSignupResult, getSignupResult } from "@/utils/signupSession";
import styles from "./page.module.css";

// Long enough to read the confirmation, short enough not to feel stuck.
const REDIRECT_SECONDS = 5;

/**
 * Confirms the company and its first HR account were created, then hands
 * the new officer straight to sign in — the only thing left to do.
 *
 * Shows who was created and where, and nothing more: this used to print
 * the raw documents (ids, collection names, timestamps) as proof the OTP
 * round-trip had persisted them, which was scaffolding for building the
 * flow rather than anything the person signing up needs.
 */
export default function HrSignupSuccessPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const stored = getSignupResult();
    if (!stored?.user) {
      router.replace("/signup/hr");
      return;
    }
    setResult(stored);
  }, [router]);

  /**
   * Drives both the countdown and the button, so the two cannot disagree
   * or double-navigate.
   */
  const goToSignIn = useCallback(() => {
    // Otherwise a Back press lands on a stale confirmation for an
    // already-created account.
    clearSignupResult();
    router.replace("/login");
  }, [router]);

  useEffect(() => {
    // Wait until the stored result has been read: starting the clock
    // before that could redirect someone who is about to be bounced to
    // the form instead.
    if (!result) return undefined;

    if (secondsLeft <= 0) {
      goToSignIn();
      return undefined;
    }

    const timer = setTimeout(() => setSecondsLeft((n) => n - 1), 1000);
    return () => clearTimeout(timer);
  }, [result, secondsLeft, goToSignIn]);

  if (!result) return null;

  const { company, user } = result;
  const logoUrl =
    company?.hasLogo || company?.logo?.contentType
      ? `${API_BASE_URL}/companies/${company._id}/logo`
      : null;

  return (
    <AuthCard
      heading="You're all set"
      subheading="Your email is verified and your company is registered."
      maxWidth="480px"
      footer={
        <>
          Not redirected? <Link href="/login">Go to Sign In</Link>
        </>
      }
    >
      <AlertMessage tone="success">
        Your company and HR account have been created.
      </AlertMessage>

      <div className={styles.redirectRow} role="status">
        <span>
          Taking you to sign in in <strong>{secondsLeft}s</strong>...
        </span>
        <button type="button" className={styles.redirectBtn} onClick={goToSignIn}>
          Sign in now
        </button>
      </div>

      <div className={styles.companyRow}>
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoUrl} alt={`${company.name} logo`} className={styles.logo} />
        ) : (
          <div className={styles.logoFallback} aria-hidden="true">
            {company?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
        <div>
          <div className={styles.companyName}>{company?.name}</div>
          <div className={styles.muted}>Registered company</div>
        </div>
      </div>

      <div className={styles.summary}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Name</span>
          <span className={styles.rowValue}>{user?.name}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Sign in with</span>
          <span className={styles.rowValue}>{user?.email}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Role</span>
          <span className={styles.rowValue}>
            <span className={styles.role}>HR</span>
          </span>
        </div>
      </div>
    </AuthCard>
  );
}

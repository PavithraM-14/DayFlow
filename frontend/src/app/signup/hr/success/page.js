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
 * Placeholder confirmation for the auth flow: it exists to prove the OTP
 * round-trip actually persisted a Company and an HR User, so it prints
 * the two documents the API returned. Replace with the real HR dashboard
 * once that exists.
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
   * The account exists at this point, so sign-in is the only thing left to
   * do — go there on the user's behalf instead of leaving them on a page
   * with nothing actionable. `goToSignIn` also drives the button, so both
   * paths clear the stored result and cannot double-navigate.
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
      subheading="Your email was verified and both records were created in MongoDB."
      maxWidth="560px"
      footer={
        <>
          Not redirected? <Link href="/login">Go to Sign In</Link>
        </>
      }
    >
      <AlertMessage tone="success">
        Company and HR user created successfully.
      </AlertMessage>

      <div className={styles.redirectRow} role="status">
        <span>
          Taking you to sign in in <strong>{secondsLeft}s</strong>...
        </span>
        <button type="button" className={styles.redirectBtn} onClick={goToSignIn}>
          Sign in now
        </button>
      </div>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Company</h2>
          <span className={styles.badge}>collection: companies</span>
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
            <div className={styles.muted}>
              {logoUrl ? "Logo stored in MongoDB" : "No logo uploaded"}
            </div>
          </div>
        </div>
        <dl className={styles.fields}>
          <div className={styles.field}>
            <dt>_id</dt>
            <dd className={styles.mono}>{company?._id}</dd>
          </div>
          <div className={styles.field}>
            <dt>createdAt</dt>
            <dd className={styles.mono}>{company?.createdAt}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>User</h2>
          <span className={styles.badge}>collection: users</span>
        </div>
        <dl className={styles.fields}>
          <div className={styles.field}>
            <dt>_id</dt>
            <dd className={styles.mono}>{user?._id}</dd>
          </div>
          <div className={styles.field}>
            <dt>name</dt>
            <dd>{user?.name}</dd>
          </div>
          <div className={styles.field}>
            <dt>email</dt>
            <dd>{user?.email}</dd>
          </div>
          <div className={styles.field}>
            <dt>phone</dt>
            <dd>{user?.phone || <span className={styles.muted}>—</span>}</dd>
          </div>
          <div className={styles.field}>
            <dt>role</dt>
            <dd>
              <span className={styles.role}>{user?.role}</span>
            </dd>
          </div>
          <div className={styles.field}>
            <dt>company</dt>
            <dd className={styles.mono}>{user?.company}</dd>
          </div>
          <div className={styles.field}>
            <dt>passwordHash</dt>
            <dd className={styles.muted}>
              stored, never returned by the API
            </dd>
          </div>
          <div className={styles.field}>
            <dt>emailVerifiedAt</dt>
            <dd className={styles.mono}>{user?.emailVerifiedAt}</dd>
          </div>
        </dl>
      </section>
    </AuthCard>
  );
}

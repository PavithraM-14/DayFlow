"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import OtpField from "@/components/OtpField";
import SubmitButton from "@/components/SubmitButton";
import AlertMessage from "@/components/AlertMessage";
import {
  resendEmployeeSignupOtp,
  verifyEmployeeSignupOtp,
} from "@/services/auth";
import {
  clearEmployeePendingSignup,
  getEmployeePendingSignup,
  saveEmployeePendingSignup,
  saveEmployeeSignupResult,
} from "@/utils/signupSession";
import styles from "./page.module.css";

const RESEND_COOLDOWN_SECONDS = 30;

/**
 * Same shape as the HR verify page, with one important difference: a
 * valid code here files a join request instead of creating an account, so
 * the button says "Submit request" and the next page is a "waiting on HR"
 * confirmation rather than a success screen.
 */
export default function EmployeeSignupVerifyPage() {
  const router = useRouter();

  const [pending, setPending] = useState(null);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  // Landing here directly (new tab, bookmark) means there is nothing
  // staged to verify, so go back to the form.
  useEffect(() => {
    const stored = getEmployeePendingSignup();
    if (!stored?.email) {
      router.replace("/signup/employee");
      return;
    }
    setPending(stored);
  }, [router]);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setInterval(() => setCooldown((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (otp.length !== 6) {
      setError("Enter the 6-digit code from your email");
      return;
    }

    setVerifying(true);

    const response = await verifyEmployeeSignupOtp({
      email: pending.email,
      otp,
    });

    setVerifying(false);

    if (!response.success) {
      setError(response.message || "Could not verify that code.");
      setOtp("");

      // Staged sign-up is gone server-side — the form has to be redone.
      if (response.status === 404) {
        clearEmployeePendingSignup();
        setTimeout(() => router.replace("/signup/employee"), 1800);
      }
      return;
    }

    saveEmployeeSignupResult({
      request: response.data?.request,
      company: response.data?.company,
      // Kept so the confirmation page can still name the company even if
      // the API response ever stops carrying it.
      companyName: response.data?.company?.name || pending.companyName || "",
    });
    clearEmployeePendingSignup();
    router.push("/signup/employee/submitted");
  };

  const handleResend = async () => {
    setError("");
    setNotice("");
    setResending(true);

    const response = await resendEmployeeSignupOtp(pending.email);

    setResending(false);

    if (!response.success) {
      setError(response.message || "Could not resend the code.");
      return;
    }

    setOtp("");
    setCooldown(RESEND_COOLDOWN_SECONDS);
    setNotice("A new code has been sent.");

    const updated = {
      ...pending,
      emailDelivered: response.data?.emailDelivered ?? true,
      devOtp: response.data?.devOtp || null,
    };
    setPending(updated);
    saveEmployeePendingSignup(updated);
  };

  if (!pending) return null;

  return (
    <AuthCard
      heading="Verify your email"
      subheading={`We sent a 6-digit code to ${pending.email}.`}
      maxWidth="440px"
      footer={
        <>
          Wrong details?{" "}
          <Link href="/signup/employee">Go back to the form</Link>
        </>
      }
    >
      <form onSubmit={handleVerify}>
        <AlertMessage tone="error">{error}</AlertMessage>
        <AlertMessage tone="success">{notice}</AlertMessage>

        {/* Local development without SMTP credentials: the backend returns
            the code instead of emailing it, so the flow stays testable. */}
        {pending.emailDelivered === false && pending.devOtp && (
          <AlertMessage tone="info">
            Email delivery is not configured on the server, so here is the code
            for local testing: <strong>{pending.devOtp}</strong>
          </AlertMessage>
        )}

        <OtpField
          id="otp"
          label="Verification code"
          value={otp}
          onChange={setOtp}
          disabled={verifying}
        />

        <SubmitButton loading={verifying} loadingLabel="Submitting...">
          Verify &amp; Submit Request
        </SubmitButton>
      </form>

      <div className={styles.resendRow}>
        {cooldown > 0 ? (
          <span className={styles.muted}>
            Resend code in <strong>{cooldown}s</strong>
          </span>
        ) : (
          <button
            type="button"
            className={styles.resendBtn}
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? "Sending..." : "Didn't get it? Resend code"}
          </button>
        )}
      </div>
    </AuthCard>
  );
}

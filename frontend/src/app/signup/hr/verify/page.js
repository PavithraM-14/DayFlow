"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import OtpField from "@/components/OtpField";
import SubmitButton from "@/components/SubmitButton";
import AlertMessage from "@/components/AlertMessage";
import { resendHrSignupOtp, verifyHrSignupOtp } from "@/services/auth";
import {
  clearPendingSignup,
  getPendingSignup,
  savePendingSignup,
  saveSignupResult,
} from "@/utils/signupSession";
import styles from "./page.module.css";

const RESEND_COOLDOWN_SECONDS = 30;

export default function HrSignupVerifyPage() {
  const router = useRouter();

  const [pending, setPending] = useState(null);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  // The email lives in sessionStorage, written by /signup/hr. Landing here
  // directly (refresh in a new tab, bookmark) means there is nothing to
  // verify, so send the user back to the form.
  useEffect(() => {
    const stored = getPendingSignup();
    if (!stored?.email) {
      router.replace("/signup/hr");
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

    // Step 2: a valid code is what actually creates the Company and the
    // HR User — the response carries both documents back.
    const response = await verifyHrSignupOtp({ email: pending.email, otp });

    setVerifying(false);

    if (!response.success) {
      setError(response.message || "Could not verify that code.");
      setOtp("");

      // The staged sign-up is gone server-side; the form has to be redone.
      if (response.status === 404) {
        clearPendingSignup();
        setTimeout(() => router.replace("/signup/hr"), 1800);
      }
      return;
    }

    saveSignupResult(response.data);
    clearPendingSignup();
    router.push("/signup/hr/success");
  };

  const handleResend = async () => {
    setError("");
    setNotice("");
    setResending(true);

    const response = await resendHrSignupOtp(pending.email);

    setResending(false);

    if (!response.success) {
      setError(response.message || "Could not resend the code.");
      return;
    }

    setOtp("");
    setCooldown(RESEND_COOLDOWN_SECONDS);
    setNotice("A new code has been sent.");

    // Keep the dev-mode code shown below in sync with the latest send.
    const updated = {
      ...pending,
      emailDelivered: response.data?.emailDelivered ?? true,
      devOtp: response.data?.devOtp || null,
    };
    setPending(updated);
    savePendingSignup(updated);
  };

  if (!pending) return null;

  return (
    <AuthCard
      heading="Verify your email"
      subheading={`We sent a 6-digit code to ${pending.email}. It expires in ${pending.expiresInMinutes} minutes.`}
      maxWidth="440px"
      footer={
        <>
          Wrong email? <Link href="/signup/hr">Go back to the form</Link>
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

        <SubmitButton loading={verifying} loadingLabel="Verifying...">
          Verify & Create Account
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

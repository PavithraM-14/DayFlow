"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";
import AlertMessage from "@/components/AlertMessage";
import { resetPassword } from "@/services/auth";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("This reset link is missing its token. Please request a new one.");
      return;
    }
    if (!password) {
      setError("Enter a new password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const response = await resetPassword(token, password);
    setSubmitting(false);

    if (!response.success) {
      setError(response.message || "Could not reset your password.");
      return;
    }

    setDone(true);
  };

  return (
    <AuthCard
      heading="Choose a new password"
      subheading={
        done
          ? "Your password has been reset."
          : "Enter a new password for your account."
      }
      footer={<Link href="/login">Back to Sign In</Link>}
    >
      {!done && (
        <form onSubmit={handleSubmit}>
          <AlertMessage tone="error">{error}</AlertMessage>
          {!token && (
            <AlertMessage tone="info">
              This link is missing its reset token — make sure you opened it
              directly from the email.
            </AlertMessage>
          )}

          <PasswordField
            id="password"
            label="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your new password"
            autoComplete="new-password"
            required
          />
          <PasswordField
            id="confirmPassword"
            label="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your new password"
            autoComplete="new-password"
            required
          />

          <SubmitButton loading={submitting} loadingLabel="Resetting...">
            Reset Password
          </SubmitButton>
        </form>
      )}

      {done && (
        <div>
          <AlertMessage tone="success">
            You can now sign in with your new password.
          </AlertMessage>
        </div>
      )}
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import TextField from "@/components/TextField";
import SubmitButton from "@/components/SubmitButton";
import AlertMessage from "@/components/AlertMessage";
import { forgotPassword } from "@/services/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Enter your account email.");
      return;
    }

    setSubmitting(true);
    const response = await forgotPassword(trimmedEmail);
    setSubmitting(false);

    if (!response.success) {
      setError(response.message || "Could not send the reset link.");
      return;
    }

    // The backend always returns the same generic message whether or not
    // the email is registered, so there is nothing else to branch on here.
    setSent(true);
  };

  return (
    <AuthCard
      heading="Reset your password"
      subheading={
        sent
          ? "If an account exists for that email, we've sent a reset link."
          : "Enter your account email and we'll send you a reset link."
      }
      footer={<Link href="/login">Back to Sign In</Link>}
    >
      {!sent && (
        <form onSubmit={handleSubmit}>
          <AlertMessage tone="error">{error}</AlertMessage>

          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
          <SubmitButton loading={submitting} loadingLabel="Sending...">
            Send Reset Link
          </SubmitButton>
        </form>
      )}
    </AuthCard>
  );
}

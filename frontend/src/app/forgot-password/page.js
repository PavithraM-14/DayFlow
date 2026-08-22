"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import TextField from "@/components/TextField";
import SubmitButton from "@/components/SubmitButton";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to POST /api/auth/forgot-password once the backend endpoint exists.
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
          <SubmitButton>Send Reset Link</SubmitButton>
        </form>
      )}
    </AuthCard>
  );
}

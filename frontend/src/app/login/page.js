"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import TextField from "@/components/TextField";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";
import styles from "./page.module.css";

const INITIAL_FORM = { loginId: "", password: "" };

export default function LoginPage() {
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to POST /api/auth/login once the backend endpoint exists.
  };

  return (
    <AuthCard
      heading="Welcome back"
      subheading="Sign in to your Dayflow account."
      footer={
        <>
          Don&apos;t have an account? <Link href="/get-started">Sign Up</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <TextField
          id="loginId"
          label="Login ID / Email"
          value={form.loginId}
          onChange={handleChange("loginId")}
          placeholder="e.g. OIJODO20260001 or you@company.com"
          autoComplete="username"
          required
        />
        <PasswordField
          id="password"
          label="Password"
          value={form.password}
          onChange={handleChange("password")}
          placeholder="Your password"
          autoComplete="current-password"
          required
        />

        <div className={styles.forgotRow}>
          <Link href="/forgot-password" className={styles.forgotLink}>
            Forgot password?
          </Link>
        </div>

        <SubmitButton>Sign In</SubmitButton>
      </form>
    </AuthCard>
  );
}

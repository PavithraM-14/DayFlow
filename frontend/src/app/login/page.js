"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import TextField from "@/components/TextField";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";
import AlertMessage from "@/components/AlertMessage";
import { useAuth } from "@/context/AuthContext";
import { dashboardPathFor } from "@/utils/authSession";
import styles from "./page.module.css";

const INITIAL_FORM = { identifier: "", password: "" };

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  // A join request that is still pending is not a failed sign-in — it is
  // news. Shown in the info tone so it does not read as a typo.
  const [status, setStatus] = useState(null); // { tone, message }
  const [signingIn, setSigningIn] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus(null);

    const identifier = form.identifier.trim();

    if (!identifier || !form.password) {
      setError("Enter your Login ID or email and password.");
      return;
    }

    setSigningIn(true);

    const response = await signIn({ identifier, password: form.password });

    if (!response.success) {
      // Stays mounted on failure — only the password is cleared, so a
      // typo does not cost the user their email too.
      setSigningIn(false);
      setForm((prev) => ({ ...prev, password: "" }));

      // The password was right, but there is no account yet: the join
      // request is still queued, or it was turned down.
      if (response.code === "REQUEST_PENDING") {
        setStatus({ tone: "info", message: response.message });
        return;
      }
      if (response.code === "REQUEST_REJECTED") {
        setStatus({ tone: "error", message: response.message });
        return;
      }

      setError(response.message || "Could not sign you in.");
      return;
    }

    // hr -> /dashboard/hr, employee -> /dashboard/employee.
    // `replace` so Back does not land on the login form while signed in.
    // Left in the signing-in state: the button stays disabled until the
    // new route paints, instead of flicking back to "Sign In".
    router.replace(dashboardPathFor(response.data.user));
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
        <AlertMessage tone="error">{error}</AlertMessage>
        {status && (
          <AlertMessage tone={status.tone}>{status.message}</AlertMessage>
        )}

        <TextField
          id="identifier"
          label="Login ID or Email"
          type="text"
          value={form.identifier}
          onChange={handleChange("identifier")}
          placeholder="0510042023000 or you@company.com"
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

        <SubmitButton loading={signingIn} loadingLabel="Signing in...">
          Sign In
        </SubmitButton>
      </form>
    </AuthCard>
  );
}

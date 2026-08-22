"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import TextField from "@/components/TextField";
import CompanyLogoField from "@/components/CompanyLogoField";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";
import AlertMessage from "@/components/AlertMessage";
import PasswordRequirements from "@/components/PasswordRequirements";
import { sendHrSignupOtp } from "@/services/auth";
import { savePendingSignup } from "@/utils/signupSession";
import { MIN_PASSWORD_LENGTH, validatePassword } from "@/utils/passwordPolicy";

const INITIAL_FORM = {
  companyName: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function HrSignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [logoFile, setLogoFile] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Same policy the API enforces; checked here so the whole form is not
    // round-tripped just to be told the password is too weak.
    const passwordCheck = validatePassword(form.password);
    if (!passwordCheck.isValid) {
      setError(passwordCheck.message);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Those passwords do not match");
      return;
    }

    setSubmitting(true);

    // Step 1 of the flow: nothing is created yet — the backend stages the
    // form and emails a 6-digit code. The Company and HR User documents
    // are only written once that code is verified on the next page.
    const response = await sendHrSignupOtp({ ...form, logoFile });

    setSubmitting(false);

    if (!response.success) {
      setError(response.message || "Could not start sign-up. Please try again.");
      return;
    }

    savePendingSignup({
      email: response.data?.email || form.email.trim().toLowerCase(),
      name: form.name,
      companyName: form.companyName,
      emailDelivered: response.data?.emailDelivered ?? true,
      devOtp: response.data?.devOtp || null,
      expiresInMinutes: response.data?.expiresInMinutes || 10,
    });

    router.push("/signup/hr/verify");
  };

  return (
    <AuthCard
      heading="Register your company"
      subheading="Set up Dayflow for your organization as its HR officer."
      maxWidth="460px"
      footer={
        <>
          Already have an account? <Link href="/login">Sign In</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <AlertMessage tone="error">{error}</AlertMessage>

        <CompanyLogoField
          id="companyName"
          label="Company Name"
          value={form.companyName}
          onChange={handleChange("companyName")}
          onFileChange={setLogoFile}
          placeholder="Your company's name"
          disabled={submitting}
          required
        />
        <TextField
          id="name"
          label="Name"
          value={form.name}
          onChange={handleChange("name")}
          placeholder="Your full name"
          autoComplete="name"
          required
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={handleChange("phone")}
          placeholder="Your phone number"
          autoComplete="tel"
        />
        <PasswordField
          id="password"
          label="Password"
          value={form.password}
          onChange={handleChange("password")}
          placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
          required
        />
        <PasswordRequirements password={form.password} />
        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          placeholder="Re-enter your password"
          required
        />

        <SubmitButton loading={submitting} loadingLabel="Sending code...">
          Sign Up
        </SubmitButton>
      </form>
    </AuthCard>
  );
}

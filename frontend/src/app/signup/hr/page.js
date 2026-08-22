"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import TextField from "@/components/TextField";
import CompanyLogoField from "@/components/CompanyLogoField";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";
import InfoNote from "@/components/InfoNote";

const INITIAL_FORM = {
  companyName: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function HrSignUpPage() {
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to POST /api/auth/signup once the backend endpoint exists.
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
      <form onSubmit={handleSubmit}>
        <CompanyLogoField
          id="companyName"
          label="Company Name"
          value={form.companyName}
          onChange={handleChange("companyName")}
          placeholder="Your company's name"
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
          placeholder="Create a password"
          required
        />
        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          placeholder="Re-enter your password"
          required
        />

        <InfoNote>
          Your <strong>Login ID</strong> is generated automatically after
          sign up — company and name initials plus year and serial number
          (e.g. <strong>OIJODO20260001</strong>).
        </InfoNote>

        <SubmitButton>Sign Up</SubmitButton>
      </form>
    </AuthCard>
  );
}

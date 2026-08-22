"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import TextField from "@/components/TextField";
import SelectField from "@/components/SelectField";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";
import InfoNote from "@/components/InfoNote";
import { REGISTERED_COMPANIES } from "@/services/companies";

const ROLES = ["Employee", "HR"];

const INITIAL_FORM = {
  company: "",
  role: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function EmployeeSignUpPage() {
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to POST /api/auth/signup once the backend endpoint exists.
  };

  return (
    <AuthCard
      heading="Join your company"
      subheading="Sign up as an employee of an already registered company."
      footer={
        <>
          Already have an account? <Link href="/login">Sign In</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <SelectField
          id="company"
          label="Company Name"
          value={form.company}
          onChange={handleChange("company")}
          options={REGISTERED_COMPANIES}
          placeholder="Select your company"
          required
        />
        <SelectField
          id="role"
          label="Role"
          value={form.role}
          onChange={handleChange("role")}
          options={ROLES}
          placeholder="Select your role"
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

        

        <SubmitButton>Sign Up</SubmitButton>
      </form>
    </AuthCard>
  );
}

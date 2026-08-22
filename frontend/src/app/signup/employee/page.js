"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import TextField from "@/components/TextField";
import SelectField from "@/components/SelectField";
import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";
import AlertMessage from "@/components/AlertMessage";
import InfoNote from "@/components/InfoNote";
import CompanyCombobox from "@/components/CompanyCombobox";
import PasswordRequirements from "@/components/PasswordRequirements";
import { listCompanies } from "@/services/companies";
import { sendEmployeeSignupOtp } from "@/services/auth";
import { saveEmployeePendingSignup } from "@/utils/signupSession";
import { MIN_PASSWORD_LENGTH, validatePassword } from "@/utils/passwordPolicy";

// Shown capitalised, submitted lowercase — the API's roles are "employee"
// and "hr".
const ROLE_OPTIONS = ["Employee", "HR"];

const INITIAL_FORM = {
  companyId: "",
  role: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function EmployeeSignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState(INITIAL_FORM);
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [companiesError, setCompaniesError] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // The dropdown is filled from MongoDB — whoever has signed up so far.
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const response = await listCompanies();
      if (cancelled) return;

      if (response.success && Array.isArray(response.data)) {
        setCompanies(response.data);
      } else {
        setCompaniesError(
          response.message || "Could not load the list of companies."
        );
      }
      setLoadingCompanies(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim();

    if (!form.companyId) {
      setError("Select your company from the list.");
      return;
    }
    if (!form.role) {
      setError("Select the role you are joining as.");
      return;
    }
    // Same policy the API enforces; checked here so the whole form is not
    // round-tripped just to be told the password is too weak.
    const passwordCheck = validatePassword(form.password);
    if (!passwordCheck.isValid) {
      setError(passwordCheck.message);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Those passwords do not match.");
      return;
    }

    setSubmitting(true);

    const response = await sendEmployeeSignupOtp({
      companyId: form.companyId,
      role: form.role.toLowerCase(),
      name,
      email,
      phone: form.phone.trim(),
      password: form.password,
    });

    setSubmitting(false);

    if (!response.success) {
      setError(response.message || "Could not start your sign-up.");
      return;
    }

    // The verify page needs the email to confirm against; the company name
    // is carried so it can say which company is being joined. The password
    // is never stored client-side.
    saveEmployeePendingSignup({
      email,
      name,
      role: form.role.toLowerCase(),
      companyId: form.companyId,
      companyName: response.data?.companyName || "",
      emailDelivered: response.data?.emailDelivered ?? true,
      devOtp: response.data?.devOtp || null,
    });

    router.push("/signup/employee/verify");
  };

  const selectedCompany = companies.find((c) => c._id === form.companyId);

  return (
    <AuthCard
      heading="Join your company"
      subheading="Sign up as a member of an already registered company."
      footer={
        <>
          Already have an account? <Link href="/login">Sign In</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <AlertMessage tone="error">{error}</AlertMessage>

        <CompanyCombobox
          id="company"
          companies={companies}
          value={form.companyId}
          onChange={(companyId) =>
            setForm((prev) => ({ ...prev, companyId }))
          }
          loading={loadingCompanies}
          error={companiesError}
          required
        />
        <SelectField
          id="role"
          label="Role"
          value={form.role}
          onChange={handleChange("role")}
          options={ROLE_OPTIONS}
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

        <InfoNote>
          We&apos;ll email you a 6-digit code to confirm your address. After
          that, {selectedCompany ? `${selectedCompany.name}'s` : "your company's"}{" "}
          HR has to approve your request before you can sign in.
        </InfoNote>

        <SubmitButton loading={submitting} loadingLabel="Sending code...">
          Sign Up
        </SubmitButton>
      </form>
    </AuthCard>
  );
}

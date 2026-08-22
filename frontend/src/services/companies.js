import apiClient from "./apiClient";

/**
 * The registered companies an employee can ask to join.
 *
 * Public on purpose: the employee sign-up form needs it before anyone is
 * signed in. It returns names and ids only — no member counts or contact
 * details — so it is safe to expose.
 */
export const listCompanies = () => apiClient.get("/companies", { auth: false });

export const companiesService = { listCompanies };

export default companiesService;

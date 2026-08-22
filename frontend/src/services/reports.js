import apiClient from "./apiClient";

/** HR-only. */
export const reportsOverview = () => apiClient.get("/reports/overview");

export const reportsService = { reportsOverview };

export default reportsService;

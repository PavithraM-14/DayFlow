import apiClient from "./apiClient";

/** Role-aware — HR and employee sessions get different response shapes. See dashboard.controller.js. */
export const dashboardSummary = () => apiClient.get("/dashboard/summary");

export const dashboardService = { dashboardSummary };

export default dashboardService;

import apiClient from "./apiClient";

const BASE = "/time-off";

/** { type: "paid"|"sick"|"unpaid", startDate, endDate, remarks } */
export const applyForLeave = (payload) => apiClient.post(BASE, payload);

/** The signed-in employee's own requests plus current balances. */
export const myLeaves = () => apiClient.get(`${BASE}/me`);

/** HR-only queue. `status` accepts "pending" (default), "approved", "rejected", or "all". */
export const listCompanyLeaves = (status = "pending") =>
  apiClient.get(`${BASE}?status=${encodeURIComponent(status)}`);

export const approveLeave = (id, comments) =>
  apiClient.patch(`${BASE}/${id}/approve`, comments ? { comments } : undefined);

export const rejectLeave = (id, comments) =>
  apiClient.patch(`${BASE}/${id}/reject`, comments ? { comments } : undefined);

export const timeOffService = { applyForLeave, myLeaves, listCompanyLeaves, approveLeave, rejectLeave };

export default timeOffService;

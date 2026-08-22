import apiClient from "./apiClient";

const BASE = "/employee-requests";

/**
 * The HR-only queue of people asking to join the company.
 *
 * Every call is scoped server-side to the company on the caller's token,
 * so there is no company parameter to pass — or to get wrong.
 */

/** `status` accepts "pending" (default), "approved", "rejected", or "all". */
export const listEmployeeRequests = (status = "pending") =>
  apiClient.get(`${BASE}?status=${encodeURIComponent(status)}`);

/** Creates the user account. This is the step that lets them sign in. */
export const approveEmployeeRequest = (id) =>
  apiClient.patch(`${BASE}/${id}/approve`);

export const rejectEmployeeRequest = (id) =>
  apiClient.patch(`${BASE}/${id}/reject`);

export const employeeRequestsService = {
  listEmployeeRequests,
  approveEmployeeRequest,
  rejectEmployeeRequest,
};

export default employeeRequestsService;

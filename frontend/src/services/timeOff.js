import apiClient from "./apiClient";
import { API_BASE_URL } from "@/config";
import { getAuthToken } from "@/utils/authSession";

const BASE = "/time-off";

/**
 * { type: "paid"|"sick"|"unpaid", startDate, endDate, remarks, attachment? }
 *
 * When an `attachment` File is present (e.g. a sick-leave certificate) the
 * request is sent as multipart/form-data so the file rides along; otherwise
 * it's a plain JSON post. apiClient handles both body shapes.
 */
export const applyForLeave = (payload) => {
  const file = payload?.attachment;
  const hasFile = typeof File !== "undefined" && file instanceof File;

  if (!hasFile) {
    const { attachment, ...rest } = payload || {};
    return apiClient.post(BASE, rest);
  }

  const formData = new FormData();
  ["type", "startDate", "endDate", "remarks"].forEach((key) => {
    if (payload[key] !== undefined && payload[key] !== null) {
      formData.append(key, payload[key]);
    }
  });
  formData.append("attachment", file);
  return apiClient.post(BASE, formData);
};

/**
 * Opens a request's attachment in a new tab. The endpoint is behind auth,
 * so we can't just point an <a href> at it (the browser sends no token on a
 * plain navigation) — instead we fetch it with the Authorization header and
 * open the result as a short-lived object URL.
 */
export const openAttachment = async (id) => {
  const token = getAuthToken();
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${BASE}/${id}/attachment`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  } catch {
    return { success: false, message: "Could not reach the server." };
  }
  if (!response.ok) {
    return { success: false, message: "Could not load the attachment." };
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener");
  // Give the new tab time to load before releasing the URL.
  setTimeout(() => URL.revokeObjectURL(url), 60000);
  return { success: true };
};

/** The signed-in employee's own requests plus current balances. */
export const myLeaves = () => apiClient.get(`${BASE}/me`);

/** HR-only queue. `status` accepts "pending" (default), "approved", "rejected", or "all". */
export const listCompanyLeaves = (status = "pending") =>
  apiClient.get(`${BASE}?status=${encodeURIComponent(status)}`);

export const approveLeave = (id, comments) =>
  apiClient.patch(`${BASE}/${id}/approve`, comments ? { comments } : undefined);

export const rejectLeave = (id, comments) =>
  apiClient.patch(`${BASE}/${id}/reject`, comments ? { comments } : undefined);

export const timeOffService = {
  applyForLeave,
  openAttachment,
  myLeaves,
  listCompanyLeaves,
  approveLeave,
  rejectLeave,
};

export default timeOffService;

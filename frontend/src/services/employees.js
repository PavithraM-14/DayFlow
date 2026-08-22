import apiClient from "./apiClient";
import { API_BASE_URL } from "@/config";
import { getAuthToken } from "@/utils/authSession";

const BASE = "/employees";

/** HR-only: the company directory, each row carrying today's live status. */
export const listEmployees = () => apiClient.get(BASE);

/** View-only detail: HR can open anyone at their company, an employee only themself. */
export const getEmployee = (id) => apiClient.get(`${BASE}/${id}`);

/** Self edits a few fields; HR can edit the rest — the API enforces which. */
export const updateEmployee = (id, updates) => apiClient.patch(`${BASE}/${id}`, updates);

/** HR creating an employee directly — a temp password is emailed, never returned. */
export const createEmployee = (payload) => apiClient.post(BASE, payload);

export const avatarUrlFor = (id) => {
  // Not run through apiClient — this is used directly as an <img src>,
  // and the browser attaches no Authorization header to a plain image
  // request. Fine here: avatars aren't sensitive, and there's nothing to
  // gate beyond "you're signed in", which this endpoint doesn't enforce
  // per-image anyway.
  const base =
    (typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) || "";
  return `${base}${BASE}/${id}/avatar`;
};

/** Uploads a new profile photo (multipart, field "avatar"). Self or HR. */
export const updateAvatar = (id, file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  return apiClient.patch(`${BASE}/${id}/avatar`, formData);
};

/**
 * The avatar endpoint is behind auth, so a plain <img src> gets a 401 —
 * fetch it with the token and hand back an object URL (or null when the
 * employee has no photo). Callers must revoke the URL when done.
 */
export const fetchAvatarBlobUrl = async (id) => {
  if (!id) return null;
  const token = getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}${BASE}/${id}/avatar`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!response.ok) return null;
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
};

export const employeesService = {
  listEmployees,
  getEmployee,
  updateEmployee,
  createEmployee,
  updateAvatar,
  fetchAvatarBlobUrl,
};

export default employeesService;

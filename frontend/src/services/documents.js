import apiClient from "./apiClient";
import { API_BASE_URL } from "@/config";
import { getAuthToken } from "@/utils/authSession";

const BASE = "/documents";

/** Metadata only — self, or HR for anyone at their company. */
export const listDocuments = (employeeId) =>
  apiClient.get(`${BASE}?employeeId=${employeeId}`);

/** Multipart upload; `employeeId` lets HR upload on behalf of someone else. */
export const uploadDocument = (employeeId, file) => {
  const body = new FormData();
  body.append("document", file);
  body.append("employeeId", employeeId);
  return apiClient.post(BASE, body);
};

// apiClient doesn't expose a DELETE verb (nothing needed one until now), so
// this goes straight through fetch with the same auth header convention.
export async function deleteDocument(id) {
  const token = getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}${BASE}/${id}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const payload = await response.json().catch(() => ({}));
    return {
      ok: response.ok,
      status: response.status,
      success: Boolean(payload.success),
      message: payload.message || (response.ok ? "" : "Something went wrong"),
      ...payload,
    };
  } catch {
    return {
      ok: false,
      status: 0,
      success: false,
      message: "Could not reach the server.",
    };
  }
}

/**
 * Downloads a document as a real browser download. This can't be a plain
 * <a href> like avatars are — document downloads require the same auth
 * header as everything else — so it fetches the blob itself and drives a
 * throwaway link to save it, then revokes the object URL immediately.
 */
export const downloadDocument = async (id, fileName) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}${BASE}/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    return { success: false, message: payload.message || "Could not download that file." };
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName || "document";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);

  return { success: true };
};

export const documentsService = { listDocuments, uploadDocument, deleteDocument, downloadDocument };

export default documentsService;

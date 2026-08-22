import { API_BASE_URL } from "@/config";

/**
 * Thin fetch wrapper for the Dayflow API.
 *
 * Always resolves with the parsed body plus `ok`/`status`, and throws only
 * when the request never reached the server — so callers can branch on
 * validation errors without a try/catch around every call.
 */
const request = async (path, { method = "GET", body, headers } = {}) => {
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      // Let the browser set the multipart boundary itself.
      headers: {
        ...(isFormData || !body ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    return {
      ok: false,
      status: 0,
      success: false,
      message:
        "Could not reach the server. Check that the backend is running on " +
        API_BASE_URL,
    };
  }

  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  return {
    ok: response.ok,
    status: response.status,
    success: Boolean(payload.success),
    message: payload.message || (response.ok ? "" : "Something went wrong"),
    data: payload.data,
    ...payload,
  };
};

export const apiClient = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
};

export default apiClient;

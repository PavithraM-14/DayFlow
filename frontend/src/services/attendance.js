import apiClient from "./apiClient";

const BASE = "/attendance";

export const checkIn = () => apiClient.post(`${BASE}/check-in`);
export const checkOut = () => apiClient.post(`${BASE}/check-out`);

/** The signed-in employee's own day-wise records for a month (defaults to current). */
export const myAttendance = (month, year) =>
  apiClient.get(`${BASE}/me${month ? `?month=${month}&year=${year}` : ""}`);

/** Role-aware summary: HR gets company-wide today's numbers, an employee gets month-to-date hours. */
export const attendanceSummary = () => apiClient.get(`${BASE}/summary`);

/** HR-only: everyone's status for one day (defaults to today). */
export const companyAttendanceForDay = (date) =>
  apiClient.get(`${BASE}${date ? `?date=${date}` : ""}`);

/** HR-only: one employee's history for a month. */
export const employeeAttendanceHistory = (employeeId, month, year) =>
  apiClient.get(`${BASE}?employeeId=${employeeId}&month=${month}&year=${year}`);

/**
 * A tiny cross-component signal so the header check-in widget and the
 * attendance / dashboard pages stay in sync: whoever changes attendance
 * (checks in or out) fires this, and the others re-fetch. Avoids threading
 * shared state through the layout for what is a single, simple event.
 */
export const ATTENDANCE_CHANGED_EVENT = "dayflow:attendance-changed";

export const emitAttendanceChanged = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(ATTENDANCE_CHANGED_EVENT));
  }
};

export const onAttendanceChanged = (handler) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(ATTENDANCE_CHANGED_EVENT, handler);
  return () => window.removeEventListener(ATTENDANCE_CHANGED_EVENT, handler);
};

export const attendanceService = {
  checkIn,
  checkOut,
  myAttendance,
  attendanceSummary,
  companyAttendanceForDay,
  employeeAttendanceHistory,
};

export default attendanceService;

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

export const attendanceService = {
  checkIn,
  checkOut,
  myAttendance,
  attendanceSummary,
  companyAttendanceForDay,
  employeeAttendanceHistory,
};

export default attendanceService;

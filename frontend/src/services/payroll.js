import apiClient from "./apiClient";

const BASE = "/payroll";

/** The signed-in employee's own structure — always read-only from this endpoint. */
export const mySalary = () => apiClient.get(`${BASE}/me`);

/** "Self or HR" — the API enforces which; an employee gets their own back either way. */
export const getSalary = (employeeId) => apiClient.get(`${BASE}/${employeeId}`);

/** HR-only. */
export const updateSalary = (employeeId, updates) => apiClient.patch(`${BASE}/${employeeId}`, updates);

export const getPayslip = (employeeId, month, year) =>
  apiClient.get(`${BASE}/${employeeId}/payslip?month=${month}&year=${year}`);

/** HR-only dashboard card. */
export const payrollSummary = () => apiClient.get(`${BASE}/summary`);

export const payrollService = { mySalary, getSalary, updateSalary, getPayslip, payrollSummary };

export default payrollService;

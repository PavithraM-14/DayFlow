const mongoose = require("mongoose");

const User = require("../models/user.model");
const Attendance = require("../models/attendance.model");
const { computeSalaryBreakdown, proratePay } = require("../utils/payroll");

const fail = (res, status, message, extra = {}) =>
  res.status(status).json({ success: false, message, ...extra });

const breakdownFor = (employee) =>
  computeSalaryBreakdown(employee.salary?.wage || 0, employee.salary?.components || {});

/** Loads the target employee, enforcing "self or HR" like the rest of the module. */
const loadTarget = async (req, res, id) => {
  if (!mongoose.isValidObjectId(id)) {
    fail(res, 400, "Invalid employee id");
    return null;
  }
  if (req.auth.role !== "hr" && String(req.auth.sub) !== id) {
    fail(res, 403, "You can only view your own payroll");
    return null;
  }

  const employee = await User.findOne({ _id: id, company: req.auth.company });
  if (!employee) {
    fail(res, 404, "Employee not found");
    return null;
  }
  return employee;
};

/** GET /api/payroll/me — employee's own structure, read-only. */
const mySalary = async (req, res, next) => {
  try {
    const employee = await User.findById(req.auth.sub);
    return res.status(200).json({
      success: true,
      data: {
        wage: employee.salary?.wage || 0,
        workingDaysPerWeek: employee.salary?.workingDaysPerWeek || 5,
        breakdown: breakdownFor(employee),
      },
    });
  } catch (error) {
    return next(error);
  }
};

/** GET /api/payroll/:id — HR viewing anyone, or an employee viewing themself. */
const getSalary = async (req, res, next) => {
  try {
    const employee = await loadTarget(req, res, req.params.id);
    if (!employee) return undefined;

    return res.status(200).json({
      success: true,
      data: {
        wage: employee.salary?.wage || 0,
        workingDaysPerWeek: employee.salary?.workingDaysPerWeek || 5,
        breakTimeMinutes: employee.salary?.breakTimeMinutes ?? 60,
        components: employee.salary?.components || {},
        breakdown: breakdownFor(employee),
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * PATCH /api/payroll/:id   { wage, workingDaysPerWeek, breakTimeMinutes, components }
 *
 * HR-only: "Admin can view payroll of all employees, update salary
 * structure, ensure payroll accuracy."
 */
const updateSalary = async (req, res, next) => {
  try {
    if (req.auth.role !== "hr") return fail(res, 403, "HR access only");

    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return fail(res, 400, "Invalid employee id");

    const employee = await User.findOne({ _id: id, company: req.auth.company });
    if (!employee) return fail(res, 404, "Employee not found");

    const { wage, workingDaysPerWeek, breakTimeMinutes, components } = req.body;

    if (wage !== undefined) {
      if (typeof wage !== "number" || wage < 0) return fail(res, 400, "Enter a valid wage");
      employee.salary.wage = wage;
    }
    if (workingDaysPerWeek !== undefined) employee.salary.workingDaysPerWeek = workingDaysPerWeek;
    if (breakTimeMinutes !== undefined) employee.salary.breakTimeMinutes = breakTimeMinutes;
    if (components && typeof components === "object") {
      employee.salary.components = { ...employee.salary.components, ...components };
    }

    await employee.save();

    return res.status(200).json({
      success: true,
      message: "Salary structure updated",
      data: {
        wage: employee.salary.wage,
        breakdown: breakdownFor(employee),
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/payroll/:id/payslip?month=&year=
 *
 * Turns Attendance into payable days, per the spec: "attendance data
 * serves as the basis for payslip generation ... unpaid leave or missing
 * attendance days should automatically reduce the number of payable
 * days." Weekends are excluded from both the denominator and the
 * numerator since nobody is expected to work them.
 */
const getPayslip = async (req, res, next) => {
  try {
    const employee = await loadTarget(req, res, req.params.id);
    if (!employee) return undefined;

    const now = new Date();
    const year = Number(req.query.year) || now.getUTCFullYear();
    const month = Number(req.query.month) || now.getUTCMonth() + 1;
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 1));

    const records = await Attendance.find({
      employee: employee._id,
      date: { $gte: start, $lt: end },
    }).lean();

    let totalWorkingDays = 0;
    const cursor = new Date(start);
    while (cursor < end) {
      const weekday = cursor.getUTCDay();
      if (weekday !== 0 && weekday !== 6) totalWorkingDays += 1;
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    const byDate = new Map(records.map((r) => [r.date.toISOString(), r]));
    let payableDays = 0;
    const cursor2 = new Date(start);
    while (cursor2 < end) {
      const weekday = cursor2.getUTCDay();
      if (weekday !== 0 && weekday !== 6) {
        const record = byDate.get(Attendance.dayKey(cursor2).toISOString());
        // Present, half-day (counted as half), or paid/sick leave all pay
        // out; unpaid leave and unmarked days (absent) do not.
        if (!record) {
          // no attendance logged — unpaid
        } else if (record.status === "present") {
          payableDays += 1;
        } else if (record.status === "half-day") {
          payableDays += 0.5;
        } else if (record.status === "leave") {
          payableDays += 1; // approved paid/sick leave still pays
        }
      }
      cursor2.setUTCDate(cursor2.getUTCDate() + 1);
    }

    const breakdown = breakdownFor(employee);
    const payslip = proratePay(breakdown, payableDays, totalWorkingDays);

    return res.status(200).json({
      success: true,
      data: { month, year, payableDays, totalWorkingDays, payslip },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/payroll/summary — HR dashboard's payroll card.
 */
const summary = async (req, res, next) => {
  try {
    if (req.auth.role !== "hr") return fail(res, 403, "HR access only");

    const employees = await User.find({ company: req.auth.company }).select("salary").lean();

    let totalGross = 0;
    let totalNet = 0;
    employees.forEach((emp) => {
      const b = computeSalaryBreakdown(emp.salary?.wage || 0, emp.salary?.components || {});
      totalGross += b.grossEarnings;
      totalNet += b.netPay;
    });

    return res.status(200).json({
      success: true,
      data: {
        employeeCount: employees.length,
        totalGross: Math.round(totalGross * 100) / 100,
        totalNet: Math.round(totalNet * 100) / 100,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { mySalary, getSalary, updateSalary, getPayslip, summary };

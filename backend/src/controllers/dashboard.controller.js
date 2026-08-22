const User = require("../models/user.model");
const Attendance = require("../models/attendance.model");
const TimeOff = require("../models/timeOff.model");
const EmployeeRequest = require("../models/employeeRequest.model");
const { getBalances } = require("./timeOff.controller");

/**
 * GET /api/dashboard/summary
 *
 * One call per dashboard load. HR and employees see different shapes —
 * this mirrors the spec's "3.2.1 Employee Dashboard" vs "3.2.2 Admin/HR
 * Dashboard" split rather than trying to force one response shape onto
 * both roles.
 */
const summary = async (req, res, next) => {
  try {
    if (req.auth.role === "hr") {
      const day = Attendance.dayKey();

      const [totalEmployees, todaysRecords, pendingLeave, pendingSignups] = await Promise.all([
        User.countDocuments({ company: req.auth.company }),
        Attendance.find({ company: req.auth.company, date: day }).lean(),
        TimeOff.countDocuments({ company: req.auth.company, status: "pending" }),
        EmployeeRequest.countDocuments({ company: req.auth.company, status: "pending" }),
      ]);

      const presentToday = todaysRecords.filter((r) =>
        ["present", "half-day"].includes(r.status)
      ).length;
      const onLeaveToday = todaysRecords.filter((r) => r.status === "leave").length;

      const recentLeave = await TimeOff.find({ company: req.auth.company })
        .sort({ updatedAt: -1 })
        .limit(5)
        .populate("employee", "name")
        .lean();

      return res.status(200).json({
        success: true,
        data: {
          role: "hr",
          totalEmployees,
          presentToday,
          onLeaveToday,
          pendingActions: pendingLeave + pendingSignups,
          pendingLeave,
          pendingSignups,
          recentActivity: recentLeave.map((r) => ({
            type: "time-off",
            status: r.status,
            employeeName: r.employee?.name,
            leaveType: r.type,
            at: r.updatedAt,
          })),
        },
      });
    }

    // Employee view
    const employee = await User.findById(req.auth.sub);
    const today = await Attendance.findOne({
      employee: req.auth.sub,
      date: Attendance.dayKey(),
    }).lean();

    const [balances, recentLeave] = await Promise.all([
      getBalances(employee),
      TimeOff.find({ employee: req.auth.sub }).sort({ updatedAt: -1 }).limit(5).lean(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        role: "employee",
        checkedInToday: Boolean(today?.checkIn),
        checkedOutToday: Boolean(today?.checkOut),
        today,
        balances,
        recentActivity: recentLeave.map((r) => ({
          type: "time-off",
          status: r.status,
          leaveType: r.type,
          at: r.updatedAt,
        })),
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { summary };

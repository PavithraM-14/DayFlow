const User = require("../models/user.model");
const Attendance = require("../models/attendance.model");
const TimeOff = require("../models/timeOff.model");
const { computeSalaryBreakdown } = require("../utils/payroll");

/**
 * GET /api/reports/overview
 *
 * HR-only (see reports.routes.js). The PDF spec lists analytics/reports
 * under "6. Future Enhancements", so this deliberately covers only the
 * summary numbers the Reports page's top cards need — headcount, average
 * attendance, on-leave count, and monthly payroll — rather than the full
 * charting suite mocked up in the page itself.
 */
const overview = async (req, res, next) => {
  try {
    const company = req.auth.company;

    const [totalHeadcount, employees] = await Promise.all([
      User.countDocuments({ company }),
      User.find({ company }).select("salary").lean(),
    ]);

    const monthlyPayroll = employees.reduce(
      (sum, emp) =>
        sum + computeSalaryBreakdown(emp.salary?.wage || 0, emp.salary?.components || {}).grossEarnings,
      0
    );

    // Average attendance over the trailing 30 days: present+half-day rows
    // out of (headcount x working days in the window).
    const windowEnd = Attendance.dayKey();
    const windowStart = new Date(windowEnd);
    windowStart.setUTCDate(windowStart.getUTCDate() - 29);

    const records = await Attendance.find({
      company,
      date: { $gte: windowStart, $lte: windowEnd },
    }).lean();

    let workingDaysInWindow = 0;
    const cursor = new Date(windowStart);
    while (cursor <= windowEnd) {
      const weekday = cursor.getUTCDay();
      if (weekday !== 0 && weekday !== 6) workingDaysInWindow += 1;
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    const presentCount = records.filter((r) => ["present", "half-day"].includes(r.status)).length;
    const expectedAttendanceSlots = Math.max(1, workingDaysInWindow * totalHeadcount);
    const avgAttendancePercent = Math.min(
      100,
      Math.round((presentCount / expectedAttendanceSlots) * 1000) / 10
    );

    const onLeaveToday = await Attendance.countDocuments({
      company,
      date: windowEnd,
      status: "leave",
    });

    const leaveUsageThisYear = await TimeOff.aggregate([
      {
        $match: {
          company: req.auth.company,
          status: "approved",
          startDate: { $gte: new Date(Date.UTC(new Date().getUTCFullYear(), 0, 1)) },
        },
      },
      { $group: { _id: "$type", totalDays: { $sum: "$days" } } },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalHeadcount,
        avgAttendancePercent,
        onLeaveToday,
        monthlyPayroll: Math.round(monthlyPayroll * 100) / 100,
        leaveUsageThisYear: leaveUsageThisYear.map((r) => ({ type: r._id, days: r.totalDays })),
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { overview };

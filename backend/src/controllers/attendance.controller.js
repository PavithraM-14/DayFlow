const mongoose = require("mongoose");

const Attendance = require("../models/attendance.model");
const User = require("../models/user.model");

const fail = (res, status, message, extra = {}) =>
  res.status(status).json({ success: false, message, ...extra });

const STANDARD_WORK_MINUTES = 8 * 60;

/** True for Mon–Fri. Good enough for "is this a working day" until per-company work-week schedules exist. */
const isWeekday = (date) => {
  const day = date.getUTCDay();
  return day !== 0 && day !== 6;
};

const minutesBetween = (a, b) => Math.max(0, Math.round((b.getTime() - a.getTime()) / 60000));

const formatMinutes = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
};

const serializeRecord = (doc) => {
  if (!doc) return null;
  const o = doc.toJSON ? doc.toJSON() : doc;
  return {
    ...o,
    workHoursLabel: formatMinutes(o.workMinutes || 0),
    extraHoursLabel: formatMinutes(o.extraMinutes || 0),
  };
};

/**
 * POST /api/attendance/check-in
 *
 * Creates (or reuses) today's row for the signed-in employee. Idempotent
 * against a double click — the unique {employee, date} index means a
 * second check-in on the same day updates the same row rather than ever
 * producing two.
 */
const checkIn = async (req, res, next) => {
  try {
    const today = Attendance.dayKey();

    let record = await Attendance.findOne({ employee: req.auth.sub, date: today });

    if (record && record.checkIn) {
      return fail(res, 409, "You're already checked in for today", {
        record: serializeRecord(record),
      });
    }

    if (!record) {
      record = new Attendance({
        employee: req.auth.sub,
        company: req.auth.company,
        date: today,
      });
    }

    record.checkIn = new Date();
    record.status = "present";
    await record.save();

    return res.status(200).json({
      success: true,
      message: "Checked in",
      data: { record: serializeRecord(record) },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/attendance/check-out
 *
 * Requires an open check-in for today. Computes worked minutes and
 * anything beyond the standard 8-hour day as "extra".
 */
const checkOut = async (req, res, next) => {
  try {
    const today = Attendance.dayKey();
    const record = await Attendance.findOne({ employee: req.auth.sub, date: today });

    if (!record || !record.checkIn) {
      return fail(res, 400, "You need to check in before you can check out");
    }
    if (record.checkOut) {
      return fail(res, 409, "You're already checked out for today", {
        record: serializeRecord(record),
      });
    }

    const now = new Date();
    const worked = minutesBetween(record.checkIn, now);

    record.checkOut = now;
    record.workMinutes = worked;
    record.extraMinutes = Math.max(0, worked - STANDARD_WORK_MINUTES);
    // Under half the standard day counts as a half-day, matching the
    // spec's status list (present/absent/half-day/leave).
    record.status = worked < STANDARD_WORK_MINUTES / 2 ? "half-day" : "present";
    await record.save();

    return res.status(200).json({
      success: true,
      message: "Checked out",
      data: { record: serializeRecord(record) },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/attendance/me?month=&year=
 *
 * Day-wise attendance for the signed-in employee over one calendar
 * month (defaults to the current one), plus today's row on its own so
 * the dashboard doesn't need a second call.
 */
const myAttendance = async (req, res, next) => {
  try {
    const now = new Date();
    const year = Number(req.query.year) || now.getUTCFullYear();
    const month = Number(req.query.month) || now.getUTCMonth() + 1; // 1-12

    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 1));

    const records = await Attendance.find({
      employee: req.auth.sub,
      date: { $gte: start, $lt: end },
    })
      .sort({ date: 1 })
      .lean();

    const today = await Attendance.findOne({
      employee: req.auth.sub,
      date: Attendance.dayKey(),
    }).lean();

    // Monthly summary tiles: days present, days on leave, and total
    // working (week)days in the month — the wireframe's "count of days
    // present / leaves count / total working days".
    let totalWorkingDays = 0;
    const cursor = new Date(start);
    while (cursor < end) {
      const weekday = cursor.getUTCDay();
      if (weekday !== 0 && weekday !== 6) totalWorkingDays += 1;
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    const daysPresent = records.reduce((sum, r) => {
      if (r.status === "present") return sum + 1;
      if (r.status === "half-day") return sum + 0.5;
      return sum;
    }, 0);
    const daysOnLeave = records.filter((r) => r.status === "leave").length;
    const totalWorkMinutes = records.reduce((sum, r) => sum + (r.workMinutes || 0), 0);

    return res.status(200).json({
      success: true,
      data: {
        records: records.map(serializeRecord),
        today: serializeRecord(today),
        summary: {
          daysPresent,
          daysOnLeave,
          totalWorkingDays,
          hoursLabel: formatMinutes(totalWorkMinutes),
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/attendance?date=YYYY-MM-DD                (company-wide, one day)
 * GET /api/attendance?employeeId=...&month=&year=    (one employee, one month)
 *
 * HR-only. Two modes because the HR pages need both: "who's in today"
 * (dashboard/attendance) and "this person's history" (viewing a single
 * employee's profile).
 */
const companyAttendance = async (req, res, next) => {
  try {
    const { employeeId } = req.query;

    if (employeeId) {
      if (!mongoose.isValidObjectId(employeeId)) {
        return fail(res, 400, "Invalid employee id");
      }
      const employee = await User.findOne({ _id: employeeId, company: req.auth.company });
      if (!employee) return fail(res, 404, "Employee not found");

      const now = new Date();
      const year = Number(req.query.year) || now.getUTCFullYear();
      const month = Number(req.query.month) || now.getUTCMonth() + 1;
      const start = new Date(Date.UTC(year, month - 1, 1));
      const end = new Date(Date.UTC(year, month, 1));

      const records = await Attendance.find({
        employee: employeeId,
        date: { $gte: start, $lt: end },
      })
        .sort({ date: 1 })
        .lean();

      return res.status(200).json({
        success: true,
        data: { records: records.map(serializeRecord) },
      });
    }

    const dateParam = req.query.date ? new Date(req.query.date) : new Date();
    const day = Attendance.dayKey(dateParam);

    const records = await Attendance.find({ company: req.auth.company, date: day })
      .populate("employee", "name email department jobPosition avatar")
      .lean();

    const employees = await User.find({ company: req.auth.company })
      .select("name email department jobPosition")
      .lean();

    const byEmployee = new Map(records.map((r) => [String(r.employee?._id || r.employee), r]));

    const rows = employees.map((emp) => {
      const record = byEmployee.get(String(emp._id));
      if (record) return serializeRecord(record);

      // No row for today: absent only if today is a working day at or
      // after this doesn't try to guess pre-joining absence — it simply
      // reflects "nothing logged yet" as absent for a live day view.
      return {
        employee: emp,
        date: day,
        checkIn: null,
        checkOut: null,
        workMinutes: 0,
        extraMinutes: 0,
        status: isWeekday(day) ? "absent" : "present",
        workHoursLabel: "0h 0m",
        extraHoursLabel: "0h 0m",
      };
    });

    return res.status(200).json({
      success: true,
      data: { date: day, rows },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/attendance/summary
 *
 * Powers both dashboards' attendance cards. HR sees company-wide today's
 * numbers; an employee sees their own month-to-date hours.
 */
const summary = async (req, res, next) => {
  try {
    if (req.auth.role === "hr") {
      const day = Attendance.dayKey();

      const [totalStaff, todaysRecords] = await Promise.all([
        User.countDocuments({ company: req.auth.company }),
        Attendance.find({ company: req.auth.company, date: day }).lean(),
      ]);

      const presentToday = todaysRecords.filter((r) =>
        ["present", "half-day"].includes(r.status)
      ).length;
      const onLeaveToday = todaysRecords.filter((r) => r.status === "leave").length;
      const absentToday = Math.max(0, totalStaff - presentToday - onLeaveToday);

      return res.status(200).json({
        success: true,
        data: { totalStaff, presentToday, onLeaveToday, absentToday, date: day },
      });
    }

    // Employee: month-to-date worked hours.
    const now = new Date();
    const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

    const records = await Attendance.find({
      employee: req.auth.sub,
      date: { $gte: start, $lte: Attendance.dayKey() },
    }).lean();

    const totalMinutes = records.reduce((sum, r) => sum + (r.workMinutes || 0), 0);
    const today = records.find(
      (r) => r.date.getTime() === Attendance.dayKey().getTime()
    );

    return res.status(200).json({
      success: true,
      data: {
        hoursLoggedLabel: formatMinutes(totalMinutes),
        daysLogged: records.filter((r) => r.checkIn).length,
        today: today ? serializeRecord(today) : null,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { checkIn, checkOut, myAttendance, companyAttendance, summary };

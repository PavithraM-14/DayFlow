const mongoose = require("mongoose");

const TimeOff = require("../models/timeOff.model");
const Attendance = require("../models/attendance.model");
const User = require("../models/user.model");

const fail = (res, status, message, extra = {}) =>
  res.status(status).json({ success: false, message, ...extra });

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Inclusive day count between two dates, ignoring time-of-day. */
const inclusiveDays = (start, end) => {
  const a = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const b = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
  return Math.round((b - a) / MS_PER_DAY) + 1;
};

/**
 * How many days of `type` an employee has used this year, counting only
 * approved requests — pending/rejected don't touch the balance.
 */
const usedDaysThisYear = async (employeeId, type) => {
  const yearStart = new Date(Date.UTC(new Date().getUTCFullYear(), 0, 1));
  const result = await TimeOff.aggregate([
    {
      $match: {
        employee: new mongoose.Types.ObjectId(employeeId),
        type,
        status: "approved",
        startDate: { $gte: yearStart },
      },
    },
    { $group: { _id: null, total: { $sum: "$days" } } },
  ]);
  return result[0]?.total || 0;
};

const getBalances = async (employee) => {
  const [paidUsed, sickUsed] = await Promise.all([
    usedDaysThisYear(employee._id, "paid"),
    usedDaysThisYear(employee._id, "sick"),
  ]);

  const allocation = employee.leaveAllocation || { paid: 24, sick: 7 };

  return {
    paid: { allocated: allocation.paid, used: paidUsed, available: Math.max(0, allocation.paid - paidUsed) },
    sick: { allocated: allocation.sick, used: sickUsed, available: Math.max(0, allocation.sick - sickUsed) },
  };
};

/**
 * POST /api/time-off   { type, startDate, endDate, remarks }
 */
const applyForLeave = async (req, res, next) => {
  try {
    const { type, remarks } = req.body;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    if (!TimeOff.TYPES.includes(type)) {
      return fail(res, 400, "Select a valid leave type");
    }
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return fail(res, 400, "Enter a valid date range");
    }
    if (endDate < startDate) {
      return fail(res, 400, "End date cannot be before the start date");
    }

    const days = inclusiveDays(startDate, endDate);

    // Overlap guard: two open requests covering the same day would double
    // book attendance once approved.
    const overlapping = await TimeOff.findOne({
      employee: req.auth.sub,
      status: { $in: ["pending", "approved"] },
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });
    if (overlapping) {
      return fail(res, 409, "You already have a request covering some of these dates");
    }

    if (type !== "unpaid") {
      const employee = await User.findById(req.auth.sub);
      const balances = await getBalances(employee);
      if (balances[type].available < days) {
        return fail(
          res,
          400,
          `You only have ${balances[type].available} ${type} day(s) available`
        );
      }
    }

    const request = await TimeOff.create({
      employee: req.auth.sub,
      company: req.auth.company,
      type,
      startDate,
      endDate,
      days,
      remarks: remarks || "",
    });

    return res.status(201).json({
      success: true,
      message: "Time off request submitted",
      data: { request: request.toJSON() },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/time-off/me
 *
 * The employee's own requests plus their current balances.
 */
const myLeaves = async (req, res, next) => {
  try {
    const employee = await User.findById(req.auth.sub);
    const [requests, balances] = await Promise.all([
      TimeOff.find({ employee: req.auth.sub }).sort({ createdAt: -1 }).limit(100).lean(),
      getBalances(employee),
    ]);

    return res.status(200).json({
      success: true,
      data: { requests, balances },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/time-off?status=pending
 *
 * HR's company-wide queue. Same status convention as employee-requests:
 * a recognised status filters to it, "all" returns everything, anything
 * else defaults to pending.
 */
const listCompanyLeaves = async (req, res, next) => {
  try {
    const requested = (req.query.status || "pending").toLowerCase();
    const status = TimeOff.STATUSES.includes(requested) ? requested : null;

    const filter = { company: req.auth.company };
    if (status) filter.status = status;
    else if (requested !== "all") filter.status = "pending";

    const requests = await TimeOff.find(filter)
      .populate("employee", "name email department")
      .populate("reviewedBy", "name")
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    const pendingCount = await TimeOff.countDocuments({
      company: req.auth.company,
      status: "pending",
    });

    return res.status(200).json({ success: true, data: { requests, pendingCount } });
  } catch (error) {
    return next(error);
  }
};

const loadOpenRequest = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    fail(res, 400, "Invalid request id");
    return null;
  }

  const request = await TimeOff.findOne({ _id: id, company: req.auth.company });
  if (!request) {
    fail(res, 404, "That request no longer exists");
    return null;
  }
  if (request.status !== "pending") {
    fail(res, 409, `This request has already been ${request.status}.`, {
      requestStatus: request.status,
    });
    return null;
  }
  return request;
};

/**
 * Fills in an Attendance row (status "leave") for every day the request
 * covers, so the day-wise attendance view and payslip payable-days
 * calculation both see the same picture as time-off. Weekends are
 * skipped — there's nothing to mark present or absent on a day nobody
 * was expected to work.
 */
const markAttendanceForLeave = async (request) => {
  const days = [];
  const cursor = new Date(request.startDate);
  while (cursor <= request.endDate) {
    const day = Attendance.dayKey(cursor);
    const weekday = day.getUTCDay();
    if (weekday !== 0 && weekday !== 6) days.push(day);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  await Promise.all(
    days.map((date) =>
      Attendance.findOneAndUpdate(
        { employee: request.employee, date },
        {
          $set: {
            company: request.company,
            status: "leave",
            leaveRequest: request._id,
          },
        },
        { upsert: true, setDefaultsOnInsert: true }
      )
    )
  );
};

/**
 * PATCH /api/time-off/:id/approve   { comments }
 */
const approveLeave = async (req, res, next) => {
  try {
    const request = await loadOpenRequest(req, res);
    if (!request) return undefined;

    request.status = "approved";
    request.reviewedBy = req.auth.sub;
    request.reviewedAt = new Date();
    request.reviewComments = req.body.comments || "";
    await request.save();

    await markAttendanceForLeave(request);

    return res.status(200).json({
      success: true,
      message: "Request approved",
      data: { request: request.toJSON() },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * PATCH /api/time-off/:id/reject   { comments }
 */
const rejectLeave = async (req, res, next) => {
  try {
    const request = await loadOpenRequest(req, res);
    if (!request) return undefined;

    request.status = "rejected";
    request.reviewedBy = req.auth.sub;
    request.reviewedAt = new Date();
    request.reviewComments = req.body.comments || "";
    await request.save();

    return res.status(200).json({
      success: true,
      message: "Request rejected",
      data: { request: request.toJSON() },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  applyForLeave,
  myLeaves,
  listCompanyLeaves,
  approveLeave,
  rejectLeave,
  getBalances,
};

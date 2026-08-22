const mongoose = require("mongoose");

const STATUSES = ["present", "absent", "half-day", "leave"];

/**
 * One row per employee per calendar day. `date` is stored as midnight UTC
 * for that day so `{ employee, date }` is a stable, indexable key — no
 * timezone drift from storing arbitrary check-in timestamps there.
 *
 * Created by checkIn() (attendance.controller.js) the first time someone
 * checks in on a given day; checkOut() fills in the rest of the same
 * document. A day with no document at all reads as "absent" for report
 * purposes rather than needing its own row (see attendance.controller's
 * summary helpers) — this keeps the collection from needing a row for
 * every employee on every calendar day, including weekends and days
 * before they joined.
 */
const attendanceSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },

    date: { type: Date, required: true },

    checkIn: { type: Date, default: null },
    checkOut: { type: Date, default: null },

    // Minutes, computed on checkout — stored rather than derived on every
    // read since check-in/out never change after the fact.
    workMinutes: { type: Number, default: 0 },
    extraMinutes: { type: Number, default: 0 },

    status: {
      type: String,
      enum: { values: STATUSES, message: "Unknown attendance status" },
      default: "present",
    },

    // Set when status is "leave" — links back to the approved request
    // that produced it, so attendance and time-off never disagree.
    leaveRequest: { type: mongoose.Schema.Types.ObjectId, ref: "TimeOff", default: null },
  },
  { timestamps: true }
);

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });
attendanceSchema.index({ company: 1, date: 1 });

attendanceSchema.set("toJSON", {
  transform: (doc, ret) => ret,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
Attendance.STATUSES = STATUSES;

/** Midnight UTC for whatever date is passed (defaults to now). */
Attendance.dayKey = (when = new Date()) => {
  const d = new Date(when);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
};

module.exports = Attendance;

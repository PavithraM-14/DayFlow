const mongoose = require("mongoose");

const TYPES = ["paid", "sick", "unpaid"];
const STATUSES = ["pending", "approved", "rejected"];

/**
 * A leave request. Employees create these against themselves; HR reviews
 * every request raised at their company.
 */
const timeOffSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },

    type: {
      type: String,
      enum: { values: TYPES, message: "Type must be one of: " + TYPES.join(", ") },
      required: true,
    },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    // Inclusive day count, computed at creation — kept as a plain number
    // rather than derived every read so a later timezone/DST edge case
    // can't silently change a decided request's duration.
    days: { type: Number, required: true, min: 0.5 },

    remarks: { type: String, trim: true, maxlength: 1000, default: "" },
    attachment: {
      data: Buffer,
      contentType: String,
      fileName: String,
    },

    status: {
      type: String,
      enum: { values: STATUSES, message: "Unknown status" },
      default: "pending",
      index: true,
    },

    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reviewedAt: { type: Date, default: null },
    reviewComments: { type: String, trim: true, maxlength: 1000, default: "" },
  },
  { timestamps: true }
);

timeOffSchema.index({ company: 1, status: 1, createdAt: -1 });
timeOffSchema.index({ employee: 1, createdAt: -1 });

timeOffSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.attachment) {
      ret.attachment = {
        contentType: ret.attachment.contentType,
        fileName: ret.attachment.fileName,
      };
    }
    return ret;
  },
});

const TimeOff = mongoose.model("TimeOff", timeOffSchema);
TimeOff.TYPES = TYPES;
TimeOff.STATUSES = STATUSES;

module.exports = TimeOff;

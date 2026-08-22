const mongoose = require("mongoose");

/**
 * Employee documents (resume, certificates, ID proof, etc.) — the
 * "Documents" bullet in the PDF's View Profile list (3.3.1) and the
 * wireframe's "Resume" tab. Kept as its own collection rather than an
 * embedded array on User: a profile can accumulate several sizeable
 * binaries over time, and User is loaded on almost every authenticated
 * request (req.auth.sub lookups) — embedding would drag that payload
 * along everywhere it isn't needed.
 */
const documentSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Sanitized display name only — never used to build a filesystem path,
    // and re-sanitized again at download time before it ever reaches an
    // HTTP header (see document.controller.js).
    fileName: { type: String, required: true, trim: true, maxlength: 200 },
    contentType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

// Binary payload is only ever fetched through the dedicated download route
// (document.controller.js's download), never as part of a listing — this
// keeps the metadata-only list endpoint cheap.
documentSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.data;
    return ret;
  },
});

module.exports = mongoose.model("Document", documentSchema);

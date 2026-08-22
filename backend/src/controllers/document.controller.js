const mongoose = require("mongoose");

const Document = require("../models/document.model");
const User = require("../models/user.model");

const fail = (res, status, message, extra = {}) =>
  res.status(status).json({ success: false, message, ...extra });

const MAX_FILENAME_LENGTH = 150;

/**
 * Strips anything that could break out of a Content-Disposition header
 * value (CR/LF header injection) or a path (traversal). This runs both on
 * the way in (what we store) and again on the way out (what we send) —
 * defense in depth is cheap here and the two call sites have different
 * inputs (user-supplied original name vs. whatever ended up in the DB).
 */
const sanitizeFileName = (name) => {
  const cleaned = String(name || "file")
    .replace(/[\r\n]/g, "")
    .replace(/[\\/]/g, "_")
    .replace(/["]/g, "'")
    .trim();
  return cleaned.slice(0, MAX_FILENAME_LENGTH) || "file";
};

const canAccess = (req, employeeId) =>
  req.auth.role === "hr" || String(req.auth.sub) === String(employeeId);

/**
 * GET /api/documents?employeeId=...
 *
 * Metadata only (no binary) — self, or HR for anyone at their company.
 */
const listDocuments = async (req, res, next) => {
  try {
    const employeeId = req.query.employeeId || req.auth.sub;
    if (!mongoose.isValidObjectId(employeeId)) {
      return fail(res, 400, "Invalid employee id");
    }
    if (!canAccess(req, employeeId)) {
      return fail(res, 403, "You can only view your own documents");
    }

    const employee = await User.findOne({ _id: employeeId, company: req.auth.company }).select("_id");
    if (!employee) return fail(res, 404, "Employee not found");

    const documents = await Document.find({ employee: employeeId, company: req.auth.company })
      .select("-data")
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ success: true, data: { documents } });
  } catch (error) {
    return next(error);
  }
};

/**
 * POST /api/documents   (multipart: field "document", body: employeeId)
 *
 * Self can upload their own resume/certificates; HR can upload on behalf
 * of anyone at their company (e.g. the wireframe's sick-leave certificate
 * attached alongside a leave request).
 */
const uploadDocument = async (req, res, next) => {
  try {
    const employeeId = req.body.employeeId || req.auth.sub;
    if (!mongoose.isValidObjectId(employeeId)) {
      return fail(res, 400, "Invalid employee id");
    }
    if (!canAccess(req, employeeId)) {
      return fail(res, 403, "You can only upload your own documents");
    }
    if (!req.file) return fail(res, 400, "No file uploaded");

    const employee = await User.findOne({ _id: employeeId, company: req.auth.company }).select("_id");
    if (!employee) return fail(res, 404, "Employee not found");

    const document = await Document.create({
      employee: employeeId,
      company: req.auth.company,
      uploadedBy: req.auth.sub,
      fileName: sanitizeFileName(req.file.originalname),
      contentType: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer,
    });

    return res.status(201).json({
      success: true,
      message: "Document uploaded",
      data: { document: document.toJSON() },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/documents/:id
 *
 * Streams the file back as a forced download (Content-Disposition:
 * attachment), never inline. Unlike avatars — which are always narrow,
 * browser-safe image types — this endpoint accepts PDFs and Office docs
 * too, and forcing a download rather than an inline render means a
 * cleverly-named or mis-typed upload can't be used to run script in the
 * app's own origin (stored-XSS-via-file). X-Content-Type-Options stops a
 * browser from second-guessing the declared type and sniffing it as HTML
 * anyway.
 */
const downloadDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return fail(res, 400, "Invalid document id");

    const document = await Document.findOne({ _id: id, company: req.auth.company });
    if (!document) return fail(res, 404, "Document not found");
    if (!canAccess(req, document.employee)) {
      return fail(res, 403, "You can only download your own documents");
    }

    const safeName = sanitizeFileName(document.fileName);
    res.set({
      "Content-Type": document.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, max-age=0, no-store",
    });
    return res.end(Buffer.from(document.data));
  } catch (error) {
    return next(error);
  }
};

/**
 * DELETE /api/documents/:id — self, or HR for anyone at their company.
 */
const deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return fail(res, 400, "Invalid document id");

    const document = await Document.findOne({ _id: id, company: req.auth.company });
    if (!document) return fail(res, 404, "Document not found");
    if (!canAccess(req, document.employee)) {
      return fail(res, 403, "You can only remove your own documents");
    }

    await document.deleteOne();

    return res.status(200).json({ success: true, message: "Document removed" });
  } catch (error) {
    return next(error);
  }
};

module.exports = { listDocuments, uploadDocument, downloadDocument, deleteDocument };

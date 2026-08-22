const multer = require("multer");

const MAX_LOGO_BYTES = Number(process.env.MAX_LOGO_BYTES || 2 * 1024 * 1024); // 2 MB

const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
];

/**
 * Company logos are small and stored straight into MongoDB, so the file
 * only ever needs to exist in memory — nothing is written to disk.
 */
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: MAX_LOGO_BYTES, files: 1 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(
        new Error("Logo must be a PNG, JPG, WEBP or SVG image")
      );
    }
    return cb(null, true);
  },
});

/**
 * Accepts an optional single `logo` file and turns multer's errors into
 * the same { success, message } shape the rest of the API returns.
 */
const uploadCompanyLogo = (req, res, next) => {
  upload.single("logo")(req, res, (err) => {
    if (!err) return next();

    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? `Logo must be smaller than ${Math.round(MAX_LOGO_BYTES / 1024 / 1024)} MB`
        : err.message || "Logo upload failed";

    return res.status(400).json({ success: false, message });
  });
};

const MAX_AVATAR_BYTES = Number(process.env.MAX_AVATAR_BYTES || 2 * 1024 * 1024); // 2 MB

const avatarUpload = multer({
  storage,
  limits: { fileSize: MAX_AVATAR_BYTES, files: 1 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error("Photo must be a PNG, JPG or WEBP image"));
    }
    return cb(null, true);
  },
});

/** Accepts a single "avatar" file for the employee profile photo endpoint. */
const uploadAvatar = (req, res, next) => {
  avatarUpload.single("avatar")(req, res, (err) => {
    if (!err) return next();

    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? `Photo must be smaller than ${Math.round(MAX_AVATAR_BYTES / 1024 / 1024)} MB`
        : err.message || "Photo upload failed";

    return res.status(400).json({ success: false, message });
  });
};

const MAX_DOCUMENT_BYTES = Number(process.env.MAX_DOCUMENT_BYTES || 10 * 1024 * 1024); // 10 MB

// Deliberately narrow: resumes, certificates, ID proof, and the wireframe's
// "sick leave certificate" attachment are all covered by this list. No
// executable, script, or markup type is accepted — see document.controller.js
// for why that matters at download time too (served as an attachment, not
// rendered inline).
const ALLOWED_DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const documentUpload = multer({
  storage,
  limits: { fileSize: MAX_DOCUMENT_BYTES, files: 1 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_DOCUMENT_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error("Only PDF, Word, PNG, JPG or WEBP files are accepted"));
    }
    return cb(null, true);
  },
});

const MAX_ATTACHMENT_BYTES = Number(
  process.env.MAX_ATTACHMENT_BYTES || 5 * 1024 * 1024
); // 5 MB

// Leave certificates are commonly scanned PDFs as well as photos, so this
// endpoint accepts PDF on top of the image types the others allow.
const ATTACHMENT_MIME_TYPES = [...ALLOWED_MIME_TYPES, "application/pdf"];

const attachmentUpload = multer({
  storage,
  limits: { fileSize: MAX_ATTACHMENT_BYTES, files: 1 },
  fileFilter: (req, file, cb) => {
    if (!ATTACHMENT_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error("Attachment must be a PDF or image (PNG, JPG, WEBP)"));
    }
    return cb(null, true);
  },
});

/** Accepts a single "document" file for the employee documents endpoint. */
const uploadDocument = (req, res, next) => {
  documentUpload.single("document")(req, res, (err) => {
    if (!err) return next();

    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? `Files must be smaller than ${Math.round(MAX_DOCUMENT_BYTES / 1024 / 1024)} MB`
        : err.message || "File upload failed";

    return res.status(400).json({ success: false, message });
  });
};

/**
 * Accepts an optional single "attachment" file for a leave request (the
 * wireframe's "sick leave certificate" upload). Optional: a request with
 * no file still goes through.
 */
const uploadLeaveAttachment = (req, res, next) => {
  attachmentUpload.single("attachment")(req, res, (err) => {
    if (!err) return next();

    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? `Attachment must be smaller than ${Math.round(
            MAX_ATTACHMENT_BYTES / 1024 / 1024
          )} MB`
        : err.message || "Attachment upload failed";

    return res.status(400).json({ success: false, message });
  });
};

module.exports = {
  uploadCompanyLogo,
  uploadAvatar,
  uploadDocument,
  uploadLeaveAttachment,
  MAX_LOGO_BYTES,
  MAX_AVATAR_BYTES,
  MAX_DOCUMENT_BYTES,
  MAX_ATTACHMENT_BYTES,
  ALLOWED_MIME_TYPES,
  ALLOWED_DOCUMENT_MIME_TYPES,
  ATTACHMENT_MIME_TYPES,
};

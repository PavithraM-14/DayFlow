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

module.exports = {
  uploadCompanyLogo,
  uploadAvatar,
  MAX_LOGO_BYTES,
  MAX_AVATAR_BYTES,
  ALLOWED_MIME_TYPES,
};

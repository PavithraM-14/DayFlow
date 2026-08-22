const mongoose = require("mongoose");

/**
 * A registered organization. Created during HR sign-up, once the HR
 * officer's email OTP has been verified.
 *
 * The logo is stored inline in MongoDB as a Buffer (small images only —
 * the upload middleware caps the size, see middlewares/upload.js) and is
 * served back through GET /api/companies/:id/logo. More company-level
 * fields (address, timezone, working hours, payroll settings...) get
 * added here as those features are built.
 */
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [120, "Company name cannot exceed 120 characters"],
    },
    logo: {
      data: Buffer,
      contentType: String,
      fileName: String,
    },
  },
  { timestamps: true }
);

// Company names are matched case-insensitively, so "Odoo India" and
// "odoo india" can't both be registered.
companySchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

companySchema.virtual("hasLogo").get(function () {
  return Boolean(this.logo && this.logo.data && this.logo.data.length);
});

// Never ship the raw image bytes inside a JSON payload — clients read the
// logo from /api/companies/:id/logo instead.
companySchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    if (ret.logo) {
      ret.logo = {
        contentType: ret.logo.contentType,
        fileName: ret.logo.fileName,
      };
    }
    return ret;
  },
});

module.exports = mongoose.model("Company", companySchema);

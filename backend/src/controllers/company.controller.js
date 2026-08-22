
const mongoose = require("mongoose");

const Company = require("../models/company.model");

/**
 * GET /api/companies
 *
 * Lightweight list used by the employee sign-up "Company" dropdown
 * (which still reads from mock data today — see
 * frontend/src/services/companies.js).
 */
const listCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find({})
      .select("name logo.contentType createdAt")
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: companies.map((company) => ({
        _id: company._id,
        name: company.name,
        hasLogo: Boolean(company.logo && company.logo.contentType),
        createdAt: company.createdAt,
      })),
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/companies/:id/logo
 *
 * Streams the logo bytes stored on the company document. Kept separate
 * from the JSON representation so image data never bloats API payloads.
 */
const getCompanyLogo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid company id" });
    }

    const company = await Company.findById(id).select("logo");

    if (!company || !company.logo || !company.logo.data) {
      return res.status(404).json({ success: false, message: "No logo found" });
    }

    // Buffer.from is not redundant: a lean/BSON read hands back a
    // mongodb Binary, which res.send would JSON-serialize to base64
    // instead of writing the raw image bytes.
    const bytes = Buffer.from(company.logo.data);

    res.type(company.logo.contentType || "application/octet-stream");
    res.set("Content-Length", bytes.length);
    res.set("Cache-Control", "public, max-age=86400");
    return res.end(bytes);
  } catch (error) {
    return next(error);
  }
};

module.exports = { listCompanies, getCompanyLogo };

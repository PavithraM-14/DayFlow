const express = require("express");

const companyController = require("../controllers/company.controller");

const router = express.Router();

router.get("/", companyController.listCompanies);
router.get("/:id/logo", companyController.getCompanyLogo);

module.exports = router;

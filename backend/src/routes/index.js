const express = require("express");

const router = express.Router();

// Feature routers
router.use("/auth", require("./auth.routes"));
router.use("/companies", require("./company.routes"));
router.use("/employee-requests", require("./employeeRequest.routes"));
router.use("/employees", require("./employee.routes"));
router.use("/attendance", require("./attendance.routes"));
router.use("/time-off", require("./timeOff.routes"));
router.use("/payroll", require("./payroll.routes"));
router.use("/dashboard", require("./dashboard.routes"));
router.use("/reports", require("./reports.routes"));
router.use("/documents", require("./document.routes"));

module.exports = router;

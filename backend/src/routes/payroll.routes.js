const express = require("express");

const controller = require("../controllers/payroll.controller");
const { requireAuth, requireRole } = require("../middlewares/auth");

const router = express.Router();

router.use(requireAuth);

router.get("/me", controller.mySalary);
router.get("/summary", requireRole("hr"), controller.summary);

// "Self or HR" — enforced inside the controller so it can compare the
// target id against req.auth.sub.
router.get("/:id", controller.getSalary);
router.patch("/:id", requireRole("hr"), controller.updateSalary);
router.get("/:id/payslip", controller.getPayslip);

module.exports = router;

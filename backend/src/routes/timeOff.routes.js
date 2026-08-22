const express = require("express");

const controller = require("../controllers/timeOff.controller");
const { requireAuth, requireRole } = require("../middlewares/auth");

const router = express.Router();

router.use(requireAuth);

router.post("/", controller.applyForLeave);
router.get("/me", controller.myLeaves);

// HR's company-wide queue and decisions.
router.get("/", requireRole("hr"), controller.listCompanyLeaves);
router.patch("/:id/approve", requireRole("hr"), controller.approveLeave);
router.patch("/:id/reject", requireRole("hr"), controller.rejectLeave);

module.exports = router;

const express = require("express");

const controller = require("../controllers/attendance.controller");
const { requireAuth, requireRole } = require("../middlewares/auth");

const router = express.Router();

router.use(requireAuth);

router.post("/check-in", controller.checkIn);
router.post("/check-out", controller.checkOut);
router.get("/me", controller.myAttendance);
router.get("/summary", controller.summary);

// Company-wide day view / one employee's history — HR only.
router.get("/", requireRole("hr"), controller.companyAttendance);

module.exports = router;

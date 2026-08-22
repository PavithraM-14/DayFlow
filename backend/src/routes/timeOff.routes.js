const express = require("express");

const controller = require("../controllers/timeOff.controller");
const { requireAuth, requireRole } = require("../middlewares/auth");
const { uploadLeaveAttachment } = require("../middlewares/upload");

const router = express.Router();

router.use(requireAuth);

// uploadLeaveAttachment parses an optional multipart "attachment" file and
// still lets JSON/urlencoded bodies through when no file is sent.
router.post("/", uploadLeaveAttachment, controller.applyForLeave);
router.get("/me", controller.myLeaves);

// Self or HR — enforced inside the controller.
router.get("/:id/attachment", controller.getAttachment);

// HR's company-wide queue and decisions.
router.get("/", requireRole("hr"), controller.listCompanyLeaves);
router.patch("/:id/approve", requireRole("hr"), controller.approveLeave);
router.patch("/:id/reject", requireRole("hr"), controller.rejectLeave);

module.exports = router;

const express = require("express");

const controller = require("../controllers/employeeRequest.controller");
const { requireAuth, requireRole } = require("../middlewares/auth");

const router = express.Router();

// The whole queue is HR-only, and every handler is additionally scoped to
// the company on the caller's token.
router.use(requireAuth, requireRole("hr"));

router.get("/", controller.listRequests);
router.patch("/:id/approve", controller.approveRequest);
router.patch("/:id/reject", controller.rejectRequest);

module.exports = router;

const express = require("express");

const controller = require("../controllers/employee.controller");
const { requireAuth, requireRole } = require("../middlewares/auth");
const { uploadAvatar } = require("../middlewares/upload");

const router = express.Router();

router.use(requireAuth);

// Directory + creation are HR-only; viewing/editing one record is
// "self or HR", enforced inside the controller since it needs to compare
// the target id against req.auth.sub.
router.get("/", requireRole("hr"), controller.listEmployees);
router.post("/", requireRole("hr"), controller.createEmployee);

router.get("/:id", controller.getEmployee);
router.patch("/:id", controller.updateEmployee);

router.patch("/:id/avatar", uploadAvatar, controller.updateAvatar);
router.get("/:id/avatar", controller.getAvatar);

module.exports = router;

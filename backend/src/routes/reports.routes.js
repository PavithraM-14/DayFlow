const express = require("express");

const controller = require("../controllers/reports.controller");
const { requireAuth, requireRole } = require("../middlewares/auth");

const router = express.Router();

router.use(requireAuth, requireRole("hr"));
router.get("/overview", controller.overview);

module.exports = router;

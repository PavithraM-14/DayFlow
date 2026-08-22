const express = require("express");

const controller = require("../controllers/dashboard.controller");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

router.use(requireAuth);
router.get("/summary", controller.summary);

module.exports = router;

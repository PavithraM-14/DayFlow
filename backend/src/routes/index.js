const express = require("express");

const router = express.Router();

// Feature routers
router.use("/auth", require("./auth.routes"));
router.use("/companies", require("./company.routes"));

module.exports = router;

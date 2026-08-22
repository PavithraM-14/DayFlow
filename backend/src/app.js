const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Feature routes are mounted here as they are built, e.g.:
// const exampleRoutes = require("./routes/example.routes");
const routes = require("./routes");
const { sanitizeInput } = require("./middlewares/sanitize");

const app = express();

if (process.env.NODE_ENV === "production" && !process.env.CLIENT_ORIGIN) {
  console.warn(
    "[APP] CLIENT_ORIGIN is not set in production — CORS is wide open (*). " +
      "Set it to your frontend's origin in .env."
  );
}

// Core middleware
app.use(
  // crossOriginResourcePolicy is relaxed to "cross-origin": avatars, logos,
  // and documents are legitimately fetched from the separate frontend
  // origin via <img>/fetch, and helmet's default would otherwise block
  // that as if this were an XSS mitigation for a same-origin app.
  helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } })
);
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput);

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API routes (feature routers get added inside src/routes/index.js)
app.use("/api", routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not found" });
});

// Central error handler — feature-specific errors can extend this.
// Errors thrown with a `status` (see controllers/auth.controller.js) keep
// their own message; anything else is reported generically so internals
// are never exposed to the client.
app.use((err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: status >= 500 ? "Internal Server Error" : err.message,
  });
});

module.exports = app;

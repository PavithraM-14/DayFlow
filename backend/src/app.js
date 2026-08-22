const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Feature routes are mounted here as they are built, e.g.:
// const exampleRoutes = require("./routes/example.routes");
const routes = require("./routes");

const app = express();

// Core middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  res.status(404).json({ message: "Not found" });
});

// Central error handler — feature-specific errors can extend this
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;

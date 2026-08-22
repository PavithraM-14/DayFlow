require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { assertJwtSecret } = require("./utils/token");
const { assertOtpDevExposureSafety } = require("./controllers/auth.controller");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  assertJwtSecret();
  assertOtpDevExposureSafety();
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

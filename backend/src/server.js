require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { assertJwtSecret } = require("./utils/token");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  assertJwtSecret();
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

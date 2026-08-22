const mongoose = require("mongoose");

/**
 * Establishes the connection to MongoDB using the URI in the environment
 * configuration. Feature-specific schemas/models live under src/models.
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment.");
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

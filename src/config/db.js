const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,  
    logging: false, // Disable SQL logging for cleaner output
  }
);

// Function to test and connect database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Stop server on DB failure
  }
};

module.exports = { sequelize, connectDB };

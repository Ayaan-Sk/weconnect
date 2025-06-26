require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { apiRateLimiter } = require("./middleware/rateLimiter");


const collegeRoutes = require("./routes/collegeRoutes");
const departmentRoutes = require("./routes/department.routes");
const facultRoutes = require("./routes/faculty.routes")
const alumniRoutes = require("./routes/alumni.routes")


const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());

// Apply global rate limiter
app.use(apiRateLimiter);

// Routes
app.use("/api/colleges", collegeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/faculty",facultRoutes)
app.use("/api/alumni",alumniRoutes)

// Default route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API is running!" });
});

module.exports = app;

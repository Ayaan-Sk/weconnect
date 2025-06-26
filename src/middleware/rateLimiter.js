const rateLimit = require("express-rate-limit");

// Define standard rate limit settings
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  headers: true,
});

// Export middleware
module.exports = { apiRateLimiter };

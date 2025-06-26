const express = require("express");
const { apiRateLimiter } = require("../middleware/rateLimiter");
const { getAllColleges, getCollegeById, createCollege, updateCollege, deleteCollege } = require("../controllers/college.controller");

const router = express.Router();

// Apply rate limiter to all routes
router.get("/", apiRateLimiter, getAllColleges);
router.get("/:id", apiRateLimiter, getCollegeById);
router.post("/", apiRateLimiter, createCollege);
router.put("/:id", apiRateLimiter, updateCollege);
router.delete("/:id", apiRateLimiter, deleteCollege);

module.exports = router;

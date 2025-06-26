const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  registerFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  loginFaculty,
} = require("../controllers/faculty.controller");

// Routes
router.post("/register", registerFaculty);
router.get("/", authenticate,getAllFaculties);
router.get("/:id", getFacultyById);
router.put("/:id", updateFaculty);
router.delete("/:id", deleteFaculty);

router.post("/login",loginFaculty)

module.exports = router;

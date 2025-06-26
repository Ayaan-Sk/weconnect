const express = require("express");
const router = express.Router();
const { registerAlumni, getAllAlumni, getAlumniById, updateAlumni, deleteAlumni, loginAlumni } = require("../controllers/alumni.controller");

// Routes
router.post("/register", registerAlumni);
router.get("/", getAllAlumni);
router.get("/:id", getAlumniById);
router.put("/:id", updateAlumni);
router.delete("/:id", deleteAlumni);

router.post("/login",loginAlumni)
module.exports = router;

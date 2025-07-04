const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");

// Create a new department
router.post("/", departmentController.createDepartment);

// Get all departments
router.get("/", departmentController.getAllDepartments);

// Get department by ID
router.get("/:id", departmentController.getDepartmentById);

// Update department by ID
router.put("/:id", departmentController.updateDepartment);

// Delete department by ID
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;

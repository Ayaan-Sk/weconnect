const { Department } = require("../models");

// Create a new department
const createDepartment = async (req, res) => {
  try {
    const { name, description, collegeId } = req.body;

    // Check if department name already exists
    const existingDepartment = await Department.findOne({ where: { name } });
    if (existingDepartment) {
      return res.status(400).json({ error: "Department name already exists." });
    }

    const department = await Department.create({ name, description, collegeId });
    res.status(201).json({ message: "Department created successfully", department });
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Get department by ID
const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Update department by ID
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, collegeId } = req.body;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    await department.update({ name, description, collegeId });

    res.status(200).json({ message: "Department updated successfully", department });
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Delete department by ID
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    await department.destroy();

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Export all functions
module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};

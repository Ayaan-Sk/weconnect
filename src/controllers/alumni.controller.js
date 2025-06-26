const bcrypt = require("bcryptjs");
// const College = require("../models/college.model")
// const Department = require("../models/department.model")
const { College } = require("../models"); 
const {Department}= require("../models")

const { Alumni} = require("../models");
// console.log("Loaded Models:", Object.keys(models));

const registerAlumni = async (req, res) => {
  try {
    const {
      name,
      email,
      phone_number,
      enrollment_number,
      branch,
      graduation_year,
      current_position,
      company,
      linkedin_profile,
      password,
    } = req.body;
    const collegeId = String(req.body.collegeId);
    const departmentId = String(req.body.departmentId);
    console.log("Received Data:+++++++++++++++++++++", req.body);

    // Ensure collegeId & departmentId are provided
    if (!collegeId || !departmentId) {
      return res.status(400).json({ message: "CollegeId and DepartmentId are required" });
    }
   
    
    // ✅ Check if College and Department exist
    const collegeExists = await College.findByPk(collegeId);
    const departmentExists = await Department.findByPk(departmentId);

    if (!collegeExists) {
      return res.status(400).json({ message: "Invalid CollegeId: No such college found" });
    }
    if (!departmentExists) {
      return res.status(400).json({ message: "Invalid DepartmentId: No such department found" });
    }

    // ✅ Check if Alumni already exists
    const existingAlumni = await Alumni.findOne({ where: { email } });
    if (existingAlumni) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create Alumni
    const alumni = await Alumni.create({
      name,
      email,
      phone_number,
      enrollment_number,
      branch,
      graduation_year,
      current_position: current_position || null,
      company: company || null,
      linkedin_profile: linkedin_profile || null,
      departmentId: departmentId || null,
      collegeId: collegeId || null,
      password: hashedPassword,
    });
    console.log("Received Data:", req.body);
    console.log("Type of collegeId:", typeof collegeId);
console.log("Type of departmentId:", typeof departmentId);

    res.status(201).json({ message: "Alumni registered successfully", alumni });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findAll();
    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAlumniById = async (req, res) => {
  try {
    const { id } = req.params;
    const alumni = await Alumni.findByPk(id);
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }
    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      phone_number,
      current_position,
      company,
      linkedin_profile,
      departmentId,
      collegeId,
    } = req.body;

    const alumni = await Alumni.findByPk(id);
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    await alumni.update({
      name,
      phone_number,
      current_position,
      company,
      linkedin_profile,
      departmentId,
      collegeId,
    });

    res.status(200).json({ message: "Alumni updated successfully", alumni });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const alumni = await Alumni.findByPk(id);
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    await alumni.destroy();
    res.status(200).json({ message: "Alumni deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginAlumni = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if alumni exists
    const alumni = await Alumni.findOne({ where: { email } });
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, alumni.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: alumni.id, role: alumni.role, name: alumni.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerAlumni,
  getAllAlumni,
  getAlumniById,
  updateAlumni,
  deleteAlumni,
  loginAlumni,
};

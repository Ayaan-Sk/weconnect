const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Faculty } = require("../models");
const { v4: uuidv4 } = require("uuid");

const registerFaculty = async (req, res) => {
    try {
      const { name, email, phone_number, departmentId, role, password, collegeId } = req.body;
  
      console.log("Received request body:", req.body);
  
      const existingFaculty = await Faculty.findOne({ where: { email } });
      if (existingFaculty) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newFaculty = {
        id: uuidv4(),
        name,
        email,
        phone_number,
        departmentId,
        role: role || "Faculty",
        password: hashedPassword,
        collegeId,
      };
  
      console.log("Faculty data to be inserted:", newFaculty);
  
      const faculty = await Faculty.create(newFaculty);
  
      console.log("Inserted Faculty:", faculty);
  
      res.status(201).json({ message: "Faculty registered successfully", faculty });
    } catch (error) {
      console.error("Error in registerFaculty:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.findAll();
    res.status(200).json(faculties);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findByPk(id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone_number, departmentId, role, collegeId } = req.body;

    const faculty = await Faculty.findByPk(id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    await faculty.update({
      name,
      phone_number,
      departmentId,
      role,
      collegeId,
    });

    res.status(200).json({ message: "Faculty updated successfully", faculty });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findByPk(id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    await faculty.destroy();
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginFaculty = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const faculty = await Faculty.findOne({ where: { email } });
      if (!faculty) {
        return res.status(404).json({ message: "Faculty not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, faculty.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        { id: faculty.id, email: faculty.email, role: faculty.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.status(200).json({ message: "Login successful", token, faculty });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = { registerFaculty, getAllFaculties, getFacultyById, updateFaculty, deleteFaculty, loginFaculty };

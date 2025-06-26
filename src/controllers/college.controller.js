// const {College}= require("../models/college.model");
const {College}= require("../models");

console.log("College model:", College);

// Get all colleges
const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.findAll();

    res.status(200).json({
      success: true,
      message: "Colleges retrieved successfully.",
      data: colleges
    });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      errorCode: "SERVER_ERROR",
      details: error.message
    });
  }
};


// Get a single college by ID
const getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await College.findByPk(id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
        errorCode: "NOT_FOUND",
        details: { id }
      });
    }

    res.status(200).json({
      success: true,
      message: "College retrieved successfully.",
      data: college
    });

  } catch (error) {
    console.error("Error fetching college by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      errorCode: "SERVER_ERROR",
      details: error.message
    });
  }
};


// Create a new college
const createCollege = async (req, res) => {
  try {
    const { name, address, city, state, country, pincode, email, phone_number, website_url, affiliated_university, established_year, type, branches_offered } = req.body;

    // Check if college already exists
    const existingCollege = await College.findOne({ where: { name } });
    if (existingCollege) {
      return res.status(400).json({
        success: false,
        message: "A college with this name already exists.",
        errorCode: "DUPLICATE_ENTRY",
        details: {
          field: "name",
          value: name
        }
      });
    }

    // Create new college
    const newCollege = await College.create({
      name,
      address,
      city,
      state,
      country,
      pincode,
      email,
      phone_number,
      website_url,
      affiliated_university,
      established_year,
      type,
      branches_offered
    });

    res.status(201).json({
      success: true,
      message: "College created successfully.",
      data: newCollege
    });

  } catch (error) {
    console.error("Error creating college:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error. Please check the input data.",
        errorCode: "VALIDATION_ERROR",
        errors: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    if (error.name === "SequelizeDatabaseError" && error.parent?.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry detected.",
        errorCode: "DUPLICATE_ENTRY",
        details: {
          field: "name",
          value: req.body.name
        }
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error.",
      errorCode: "SERVER_ERROR",
      details: error.message
    });
  }
};


// Update an existing college
const updateCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, state, country, pincode, email, phone_number, website_url, affiliated_university, established_year, type, branches_offered } = req.body;

    const college = await College.findByPk(id);
    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
        errorCode: "NOT_FOUND",
        details: { id }
      });
    }

    // Check if new name already exists
    if (name) {
      const existingCollege = await College.findOne({ where: { name } });
      if (existingCollege && existingCollege.id !== id) {
        return res.status(400).json({
          success: false,
          message: "A college with this name already exists.",
          errorCode: "DUPLICATE_ENTRY",
          details: { field: "name", value: name }
        });
      }
    }

    await college.update({
      name, address, city, state, country, pincode, email, phone_number, website_url, affiliated_university, established_year, type, branches_offered
    });

    res.status(200).json({
      success: true,
      message: "College updated successfully.",
      data: college
    });

  } catch (error) {
    console.error("Error updating college:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error. Please check the input data.",
        errorCode: "VALIDATION_ERROR",
        errors: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error.",
      errorCode: "SERVER_ERROR",
      details: error.message
    });
  }
};


// Delete a college
const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await College.findByPk(id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College not found.",
        errorCode: "NOT_FOUND",
        details: { id }
      });
    }

    await college.destroy();

    res.status(200).json({
      success: true,
      message: "College deleted successfully."
    });

  } catch (error) {
    console.error("Error deleting college:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      errorCode: "SERVER_ERROR",
      details: error.message
    });
  }
};


// Export all controllers at the end
module.exports = {
  getAllColleges,
  getCollegeById,
  createCollege,
  updateCollege,
  deleteCollege,
};

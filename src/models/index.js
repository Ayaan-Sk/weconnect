const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Import Models
const College = require("./college.model")(sequelize, DataTypes);
const Department = require("./department.model")(sequelize, DataTypes);
const Faculty = require("./faculty.model")(sequelize, DataTypes);
const Alumni = require("./alumni.model")(sequelize, DataTypes);
const Student =require("./student.model")(sequelize,DataTypes);
const User = require("./user.model")(sequelize, DataTypes);
const CollegeAdmin = require("./collegeAdmin.model")(sequelize, DataTypes);
const AlumniProfile = require("./alumniProfile.model")(sequelize, DataTypes);
const EmploymentDetail = require("./employmentDetails.model")(sequelize, DataTypes);
const HigherStudyDetail = require("./higherStudyDetails.model")(sequelize, DataTypes);
const BusinessDetail = require("./businessDetails.model")(sequelize, DataTypes);
const ExamPreparationDetail = require("./examPreparationDetails.model")(sequelize, DataTypes);
const Payment = require("./payments.model")(sequelize, DataTypes);
const BlogPost = require("./blogPosts.model")(sequelize, DataTypes);

// Associations

// One College has many Departments
College.hasMany(Department, { foreignKey: "collegeId" });
Department.belongsTo(College, { foreignKey: "collegeId" });

// One Department has many Faculties
Department.hasMany(Faculty, { foreignKey: "departmentId" });
Faculty.belongsTo(Department, { foreignKey: "departmentId" });

// One Department has many Alumni
Department.hasMany(Alumni, { foreignKey: "departmentId" });
Alumni.belongsTo(Department, { foreignKey: "departmentId" });


// Alumni Associations
Alumni.hasOne(AlumniProfile, { foreignKey: "alumniId" });
AlumniProfile.belongsTo(Alumni, { foreignKey: "alumniId" });

Alumni.hasMany(EmploymentDetail, { foreignKey: "alumniId" });
EmploymentDetail.belongsTo(Alumni, { foreignKey: "alumniId" });

Alumni.hasMany(HigherStudyDetail, { foreignKey: "alumniId" });
HigherStudyDetail.belongsTo(Alumni, { foreignKey: "alumniId" });

Alumni.hasMany(BusinessDetail, { foreignKey: "alumniId" });
BusinessDetail.belongsTo(Alumni, { foreignKey: "alumniId" });

Alumni.hasMany(ExamPreparationDetail, { foreignKey: "alumniId" });
ExamPreparationDetail.belongsTo(Alumni, { foreignKey: "alumniId" });

Alumni.hasMany(Payment, { foreignKey: "alumniId" });
Payment.belongsTo(Alumni, { foreignKey: "alumniId" });

Alumni.hasMany(BlogPost, { foreignKey: "alumniId" });
BlogPost.belongsTo(Alumni, { foreignKey: "alumniId" });

// User - Alumni relation
User.hasOne(Alumni, { foreignKey: "userId" });
Alumni.belongsTo(User, { foreignKey: "userId" });

// One College has many CollegeAdmins
College.hasMany(CollegeAdmin, { foreignKey: "collegeId" });
CollegeAdmin.belongsTo(College, { foreignKey: "collegeId" });



// Student.associate({ Department, College, Alumni,User });
// Faculty.associate({ Department, College,Alumni });


// Associations for Student, Faculty, and Alumni
Faculty.associate(sequelize.models);
Alumni.associate(sequelize.models);
Student.associate(sequelize.models);


Object.keys(sequelize.models).forEach((modelName) => {
  console.log(`Model: ${modelName}`);
  if (sequelize.models[modelName].associations) {
    console.log("Associations:");
    console.log(sequelize.models[modelName].associations);
  }
});


const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false }); // Auto-sync tables
    console.log("✅ All models synchronized.");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
};


module.exports = {
  sequelize,
  syncDatabase,
  College,
  Department,
  Faculty,
  Alumni,
  Student,
  User,
  CollegeAdmin,
  AlumniProfile,
  EmploymentDetail,
  BusinessDetail,
  BlogPost,
  ExamPreparationDetail,
  HigherStudyDetail,
  Payment,
};

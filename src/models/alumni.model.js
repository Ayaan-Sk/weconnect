module.exports = (sequelize, DataTypes) => {
  const Alumni = sequelize.define("Alumni", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enrollment_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    graduation_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    current_position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin_profile: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },
    role: {
      type: DataTypes.ENUM("alumni"), // Default role is "alumni"
      allowNull: false,
      defaultValue: "alumni",
    },
  });

  // Alumni.associate = (models) => {
  //   Alumni.belongsTo(models.College, {
  //     foreignKey: "collegeId",
  //     as: "college",
  //     onDelete: "CASCADE",
  //     onUpdate: "CASCADE",
  //   });
  // };
  Alumni.associate = (models) => {
    Alumni.belongsTo(models.Department, { foreignKey: "departmentId" });
    Alumni.belongsTo(models.College, { foreignKey: "collegeId" });
    Alumni.belongsTo(models.Faculty, { foreignKey: "facultyId" }); // Faculty association

    // If the models are defined properly, link Alumni to other models
    if (models.Student) {
      Alumni.hasMany(models.Student, {
        foreignKey: "alumniId",
        as: "students",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    } else {
      console.error("❌ ERROR: models.Student is undefined!");
    }

    if (models.User) {
      Alumni.belongsTo(models.User, { foreignKey: "userId" });
    }
  };

  return Alumni;
};


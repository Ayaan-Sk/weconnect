module.exports = (sequelize, DataTypes) => {
    const CollegeAdmin = sequelize.define("CollegeAdmin", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      role: {
        type: DataTypes.ENUM("Admin", "Faculty", "SuperAdmin"),
        allowNull: false,
        defaultValue: "Admin",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    CollegeAdmin.associate = (models) => {
      CollegeAdmin.belongsTo(models.College, {
        foreignKey: "collegeId",
        as: "college",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    };
  
    return CollegeAdmin;
  };
  
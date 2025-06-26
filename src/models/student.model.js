module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Keep unique
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      enrollment_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Keep unique
      },
      currentYear: {
        type: DataTypes.ENUM("1st Year", "2nd Year", "3rd Year", "4th Year"),
        allowNull: true,
      },
      semester: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      graduation_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
  
    Student.associate = (models) => {
      Student.belongsTo(models.Department, { foreignKey: 'departmentId' });
      Student.belongsTo(models.College, { foreignKey: 'collegeId' });
      Student.belongsTo(models.User, { foreignKey: 'userId' });
      Student.belongsTo(models.Alumni, { foreignKey: "alumniId" });
    };
  
    return Student;
  };
  
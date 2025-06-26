module.exports = (sequelize, DataTypes) => {
  const Faculty = sequelize.define("Faculty", {
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
    departmentId: {
      type: DataTypes.UUID, // Assuming department has UUID as primary key
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Faculty", "HOD"), // Higher permissions for HODs
      defaultValue: "Faculty",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Faculty.associate = (models) => {
    Faculty.belongsTo(models.College, {
      foreignKey: "collegeId",
      as: "college",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  
    // Ensure "models.Student" and "models.Alumni" are correctly named
    if (models.Student) {
      Faculty.hasMany(models.Student, {
        foreignKey: "facultyId",
        as: "students",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    } else {
      console.error("❌ ERROR: models.Student is undefined!");
    }
  
    if (models.Alumni) {
      Faculty.hasMany(models.Alumni, {
        foreignKey: "facultyId",
        as: "alumni",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    } else {
      console.error("❌ ERROR: models.Alumni is undefined!");
    }
  };

  return Faculty;
};

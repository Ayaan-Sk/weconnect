module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define("Department", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    collegeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Colleges",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  });

  Department.associate = (models) => {
    Department.belongsTo(models.College, {
      foreignKey: "collegeId",
      as: "college",
    });
  };

  return Department;
};

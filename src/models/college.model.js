module.exports = (sequelize, DataTypes) => {
  const College = sequelize.define("College", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    },
    affiliated_university: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    established_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("Government", "Private", "Autonomous"),
      allowNull: false,
    },
    branches_offered: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  });

  College.associate = (models) => {
    College.hasMany(models.CollegeAdmin, {
      foreignKey: "collegeId",
      as: "admins",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    College.hasMany(models.Alumni, {
      foreignKey: "collegeId",
      as: "alumni",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return College;
};

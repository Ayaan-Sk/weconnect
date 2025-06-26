module.exports = (sequelize, DataTypes) => {
    const AlumniProfile = sequelize.define("AlumniProfile", {
      id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
         },
      alumniId: { 
        type: DataTypes.INTEGER, // Ensure it's INTEGER
        allowNull: false,
        references: {
          model: 'Alumnis', // Table name must match exactly
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      firstName: {
         type: DataTypes.STRING(255),
          allowNull: false 
        },
      lastName: { 
        type: DataTypes.STRING(255),
         allowNull: false 
        },
      fatherName: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      },
      contactNumber: {
         type: DataTypes.STRING(20),
          allowNull: false 
        },
      address: { 
        type: DataTypes.TEXT,
         allowNull: true
         },
      branch: {
         type: DataTypes.STRING(255), 
         allowNull: false 
        },
      admissionYear: {
         type: DataTypes.INTEGER,
          allowNull: false 
        },
      passingYear: { 
        type: DataTypes.INTEGER,
         allowNull: false 
        },
      isHousewife: { 
        type: DataTypes.BOOLEAN,
         defaultValue: false 
        },
      marriageDate: {
         type: DataTypes.DATE,
          allowNull: true 
        },
    });
  
    return AlumniProfile;
  };
  
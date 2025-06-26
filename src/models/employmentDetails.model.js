module.exports = (sequelize, DataTypes) => {
    const EmploymentDetail = sequelize.define("EmploymentDetail", {
      id: {
         type: DataTypes.INTEGER, 
         autoIncrement: true,
          primaryKey: true
         },
      alumniId: { 
        type: DataTypes.INTEGER, 
        allowNull: false
       },
      company: { 
        type: DataTypes.STRING(255),
         allowNull: false 
        },
      position: {
         type: DataTypes.STRING(255),
          allowNull: false 
        },
      startDate: {
         type: DataTypes.DATE, 
         allowNull: false
         },
      endDate: { 
        type: DataTypes.DATE,
         allowNull: true
         },
      package: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
      },
      documentPath: {
         type: DataTypes.STRING(255), 
         allowNull: true 
        },
    });
  
    return EmploymentDetail;
  };
  
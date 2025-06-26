module.exports = (sequelize, DataTypes) => {
    const BusinessDetail = sequelize.define("BusinessDetail", {
      id: { 
        type: DataTypes.INTEGER,
         autoIncrement: true,
          primaryKey: true 
        },
      alumniId: { 
        type: DataTypes.INTEGER,
         allowNull: false 
        },
      businessName: {
         type: DataTypes.STRING(255),
          allowNull: false
         },
      industry: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      },
    });
  
    return BusinessDetail;
  };
  
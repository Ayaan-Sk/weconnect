module.exports = (sequelize, DataTypes) => {
    const HigherStudyDetail = sequelize.define("HigherStudyDetail", {
      id: { 
        type: DataTypes.INTEGER,
         autoIncrement: true,
          primaryKey: true
         },
      alumniId: { 
        type: DataTypes.INTEGER,
         allowNull: false
         },
      institution: {
         type: DataTypes.STRING(255), 
         allowNull: false 
        },
      degree: {
         type: DataTypes.STRING(255),
          allowNull: false 
        },
      startDate: {
         type: DataTypes.DATE,
          allowNull: false 
        },
    });
  
    return HigherStudyDetail;
  };
  
module.exports = (sequelize, DataTypes) => {
    const ExamPreparationDetail = sequelize.define("ExamPreparationDetail", {
      id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      alumniId: {
         type: DataTypes.INTEGER,
          allowNull: false
         },
      examName: {
         type: DataTypes.STRING(255),
          allowNull: false 
        },
      status: { 
        type: DataTypes.STRING(50),
         allowNull: false 
        },
    });
  
    return ExamPreparationDetail;
  };
  
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
      id: {
         type: DataTypes.INTEGER,
          autoIncrement: true,
           primaryKey: true 
          },
      alumniId: { 
        type: DataTypes.INTEGER, 
        allowNull: false
       },
      amount: { 
        type: DataTypes.DECIMAL(10, 2),
         allowNull: false 
        },
      paymentDate: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      razorpayId: {
         type: DataTypes.STRING(255),
          unique: true, 
          allowNull: false 
        },
      receiptPath: { 
        type: DataTypes.STRING(255), 
        allowNull: true
       },
      verified: {
         type: DataTypes.BOOLEAN, 
         defaultValue: false
         },
      verifiedBy: { 
        type: DataTypes.INTEGER, 
        allowNull: true
       },
    });
  
    return Payment;
  };
  
module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define("BlogPost", {
      id: { 
        type: DataTypes.INTEGER,
         autoIncrement: true,
          primaryKey: true
         },
      alumniId: { 
        type: DataTypes.INTEGER,
         allowNull: false 
        },
      title: {
         type: DataTypes.STRING(255),
          allowNull: false 
        },
      content: { 
        type: DataTypes.TEXT,
         allowNull: false 
        },
      status: {
         type: DataTypes.ENUM("draft", "published"), 
         allowNull: false
         },
    });
  
    return BlogPost;
  };
  
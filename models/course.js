"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      estimatedTime: {
        type: DataTypes.STRING,
        allowNull: true
      },
      materialsNeeded: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  Course.associate = function(models) {
    // associations can be defined here
    models.Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: "userId",
        allowNull: false
      }
    });

    Course.getCoursesWithUser = async function() {
      return await this.findAll({
        include: [
          {
            model: this.sequelize.import("./user"),
            attributes: ["id", "firstName", "lastName"]
          }
        ]
      });
    };
  };
  return Course;
};

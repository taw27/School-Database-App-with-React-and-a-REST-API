"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.import("./user");
  const Course = sequelize.define(
    "Course",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: "title is required"
          },
          notEmpty: {
            args: [true],
            msg: "title is required"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: "description is required"
          },
          notEmpty: {
            args: [true],
            msg: "description is required"
          }
        }
      },
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

    Course.getCoursesInfo = async function() {
      return await this.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName"]
          }
        ]
      });
    };

    Course.getCourseInfoById = async function(courseId) {
      return await this.findOne({
        include: [
          {
            model: User,
            attributes: ["id", "firstName", "lastName"]
          }
        ],
        where: {
          id: courseId
        }
      });
    };
  };
  Course.createNewCourse = async function({
    title,
    description,
    estimatedTime,
    materialsNeeded,
    userId
  }) {
    try {
      const [created] = await this.findOrCreate({
        where: {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          userId
        }
      });

      return created;
    } catch (err) {
      throw err;
    }
  };

  return Course;
};

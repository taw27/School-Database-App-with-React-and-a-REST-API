"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: "firstName is required"
          },
          notEmpty: {
            args: [true],
            msg: "firstname is required"
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: "lastName is required"
          },
          notEmpty: {
            args: [true],
            msg: "lastName is required"
          }
        }
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: "emailAddress is required"
          },
          notEmpty: {
            args: [true],
            msg: "emailAddress is required"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: "password is required"
          },
          notEmpty: {
            args: [true],
            msg: "password is required"
          }
        }
      }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Course, {
      foreignKey: {
        fieldName: "user_id",
        allowNull: false
      }
    });
  };

  User.getUserByEmail = async function(email) {
    try {
      const Op = Sequelize.Op;
      const user = await this.findOne({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: { emailAddress: { [Op.like]: email } }
      });
      return user;
    } catch (err) {
      throw err;
    }
  };

  User.userEmailExists = async function(email) {
    try {
      const user = await this.getUserByEmail(email);
      return user ? true : false;
    } catch (err) {
      throw err;
    }
  };

  User.createNewUser = async function(
    firstName,
    lastName,
    emailAddress,
    hashedPassword
  ) {
    try {
      const [created] = await this.findOrCreate({
        where: {
          firstName,
          lastName,
          emailAddress,
          password: hashedPassword
        }
      });

      return created;
    } catch (err) {
      throw err;
    }
  };

  return User;
};

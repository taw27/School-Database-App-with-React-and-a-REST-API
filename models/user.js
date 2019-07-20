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
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      emailAddress: DataTypes.STRING,
      password: DataTypes.STRING
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
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        where: { emailAddress: { [Op.like]: email } }
      });
      return user;
    } catch (err) {
      throw err;
    }
  };

  return User;
};

const { check, body } = require("express-validator");
const { User } = require("./models");

const userValidations = [
  check("firstName")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("firstName is required"),
  check("lastName")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("lastName is required"),
  check("emailAddress")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("emailAddress is required")
    .isEmail()
    .withMessage("emailAddress is not valid"),
  check("passWord")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("passWord is required"),
  body("emailAddress").custom(value => {
    return User.userEmailExists(value).then(exists => {
      if (exists) {
        return Promise.reject("User with Email already exists");
      }
    });
  })
];

module.exports = userValidations;

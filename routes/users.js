const express = require("express");
const router = express.Router();
const auth = require("basic-auth");
const bcryptjs = require("bcryptjs");
const {
  asyncErrorHandler,
  createErrorByStatus
} = require("../utilityFunctions");
const { User } = require("../models/index.js");
const { userValidations } = require("../validation");
const { validationResult } = require("express-validator");

const authenticateUser = asyncErrorHandler(async (req, res, next) => {
  const credentials = auth(req);
  let accessDenied = true;
  if (credentials) {
    console.log(credentials.name);
    const user = await User.getUserByEmail(credentials.name);
    if (user) {
      const authenticated = await bcryptjs.compare(
        credentials.pass,
        user.get("password")
      );
      if (authenticated) {
        accessDenied = false;
        req.currentUser = user;
      }
    }
  }
  return accessDenied ? next(createErrorByStatus(401)) : next();
});

router.get(
  "/",
  asyncErrorHandler(authenticateUser),
  asyncErrorHandler(async (req, res) => {
    return res.status(201).json({
      userId: req.currentUser.get("id"),
      firstName: req.currentUser.get("firstName"),
      lastName: req.currentUser.get("lastName"),
      emailAddress: req.currentUser.get("emailAddress")
    });
  })
);

router.post(
  "/",
  userValidations,
  asyncErrorHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({
        status: 400,
        mesage: errors.array().map(error => error.mesage)
      });
    }
  })
);

module.exports = router;

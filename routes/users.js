const express = require("express");
const router = express.Router();
const auth = require("basic-auth");
const bcryptjs = require("bcryptjs");
const asyncErrorHandler = require("../utilityFunctions").asyncErrorHandler;
const createErrorByStatus = require("../utilityFunctions").createErrorByStatus;
const User = require("../models/index.js").User;

const authenticateUser = asyncErrorHandler(async (req, res, next) => {
  const credentials = auth(req);
  let accessDenied = true;
  if (credentials) {
    console.log(credentials.name);
    const user = await User.getUserByEmail(credentials.name);
    console.log(await User.findAll());

    if (user) {
      console.log(user);
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

module.exports = router;

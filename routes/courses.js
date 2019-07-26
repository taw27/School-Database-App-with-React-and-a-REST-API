const express = require("express");
const router = express.Router();
const {
  asyncErrorHandler,
  createErrorByStatus
} = require("../utilityFunctions");
const { Course, User } = require("../models/index.js");
const { check, validationResult } = require("express-validator");

router.get(
  "/",
  asyncErrorHandler(async (req, res) => {
    return res.status(200).json({
      courses: await Course.getCoursesWithUser()
    });
  })
);

module.exports = router;

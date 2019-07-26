const express = require("express");
const router = express.Router();
const {
  asyncErrorHandler,
  createErrorByStatus,
  authenticateUser
} = require("../utilityFunctions");
const { Course } = require("../models/index.js");
const { check, validationResult } = require("express-validator");

const courseValidations = [
  check("title")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("title is required"),
  check("description")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("description is required")
];

router.get(
  "/",
  asyncErrorHandler(async (req, res) => {
    return res.status(200).json({
      courses: await Course.getCoursesInfo()
    });
  })
);

router.get(
  "/:courseId",
  asyncErrorHandler(async (req, res) => {
    const bookId = parseInt(req.params.courseId);
    return res.status(200).json({
      course: await Course.getCourseInfoById(bookId)
    });
  })
);

router.post(
  "/",
  courseValidations,
  authenticateUser,
  asyncErrorHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({
        status: 400,
        message: errors.array().map(error => error.msg)
      });
    } else {
      const { title, description, estimatedTime, materialsNeeded } = req.body;
      const userId = req.currentUser.get("id");
      const course = await Course.createCourse(
        title,
        description,
        estimatedTime ? estimatedTime : "",
        materialsNeeded ? materialsNeeded : "",
        userId
      );

      if (course) {
        res.header({ Location: `/courses/${course.get("id")}` });
        return res.status(201).json({});
      } else {
        const err = new Error("Course already exists");
        err.status = 400;
        return next(400);
      }
    }
  })
);

router.put(
  "/:courseId",
  courseValidations,
  asyncErrorHandler(authenticateUser),
  asyncErrorHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({
        status: 400,
        message: errors.array().map(error => error.msg)
      });
    } else {
      const { title, description, estimatedTime, materialsNeeded } = req.body;
      const userId = req.currentUser.get("id");
      const courseId = parseInt(req.params.courseId);
      const course = await Course.getCourseInfoById(courseId);
      if (course) {
        const courseUpdated = await Course.updateCourseById(
          courseId,
          title,
          description,
          estimatedTime,
          materialsNeeded,
          userId
        );
        return courseUpdated
          ? res.status(204).json({})
          : next(createErrorByStatus(401));
      } else {
        const err = new Error("Course does not exist");
        err.status = 400;
        return next(400);
      }
    }
  })
);

module.exports = router;

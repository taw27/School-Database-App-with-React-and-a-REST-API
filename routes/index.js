const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const coursesRouter = require("./courses");

router.use("/users", usersRouter);
router.use("/courses", ucoursesRouter);

module.exports = router;

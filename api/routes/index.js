//  Handles all routes for /api

// loads modules
const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const coursesRouter = require("./courses");

// routes to the /user and /courses route
router.use("/users", usersRouter);
router.use("/courses", coursesRouter);

// exports router
module.exports = router;

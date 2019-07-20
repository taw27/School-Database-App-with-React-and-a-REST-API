const express = require("express");
const router = express.Router();

// TODO setup your api routes here
router.use("/", router);
// setup a friendly greeting for the root route
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!"
  });
});

module.exports = router;

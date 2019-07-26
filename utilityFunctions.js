const auth = require("basic-auth");
const bcryptjs = require("bcryptjs");
const { User } = require("./models/index.js");

const asyncErrorHandler = cb => {
  return async (req, res, next) => {
    try {
      return await cb(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
};

const createErrorByStatus = statusCode => {
  let err;
  switch (statusCode) {
    case 401:
      err = new Error("Access Denied");
      break;
    case 403:
      err = new Error("Forbidden");
      break;
    default:
      statusCode = 500;
      err = new Error("Server Error");
  }

  err.status = statusCode;
  return err;
};

const authenticateUser = asyncErrorHandler(async (req, res, next) => {
  const credentials = auth(req);
  let accessDenied = true;
  if (credentials) {
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

module.exports = {
  asyncErrorHandler,
  createErrorByStatus,
  authenticateUser
};

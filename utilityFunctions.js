const asyncErrorHandler = cb => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
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
    default:
      statusCode = 500;
      err = new Error("Server Error");
  }

  err.status = statusCode;
  return err;
};

module.exports = {
  asyncErrorHandler
};

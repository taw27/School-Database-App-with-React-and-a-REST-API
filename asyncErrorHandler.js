const asyncErrorHandler = cb => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = asyncErrorHandler;

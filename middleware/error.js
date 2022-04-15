const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.log(err);

  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404);
  }

  if (err.name === "TokenExpiredError") {
    res.redirect("/admin/login");
  }

  if (err.name === "JsonWebTokenError") {
    res.redirect("/admin/login");
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error!",
  });
};

module.exports = errorHandler;

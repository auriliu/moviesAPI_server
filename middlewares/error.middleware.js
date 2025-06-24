// 4 parameters, express knows its error handling middleware

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // not all errors may have a status code.
  err.status = err.status || "error"; // 400 "fail", 500 "error"
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

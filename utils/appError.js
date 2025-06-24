// es6 classes
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
// explanation:
// class AppError extends Error creates a custom error type based on JavaScript's Error.
// constructor(message, statusCode) initializes with a message and HTTP status code.
// super(message) calls the base Error constructor to set the message.
// this.statusCode = statusCode stores the HTTP status code.
// this.status = statusCode.toString().startsWith("4") ? "fail" : "error" sets error type: "fail" for client errors (4xx), "error" for server errors (5xx).
// this.isOperational = true marks this error as expected/handled by app logic.
// Error.captureStackTrace(this, this.constructor) keeps clean stack trace, excluding constructor call.

export default AppError;

// you need the AppError class to create consistent, operational errors with status codes and messages in your app.
// the errorHandler middleware catches all errors, including those created by AppError, and sends a proper response to the client.
// without AppError, you’d have to manually create error objects everywhere.
// together, they help you standardize error handling and responses.

// with apperror:
// import AppError from "./AppError.js";

// app.get("/secret", (req, res, next) => {
//   if (!req.user) {
//     return next(new AppError("you must log in", 401));
//   }
//   res.send("secret data");
// });

// without apperror:
// app.get("/secret", (req, res, next) => {
//   if (!req.user) {
//     const err = new Error("you must log in");
//     err.statusCode = 401;
//     err.status = "fail";
//     return next(err);
//   }
//   res.send("secret data");
// });

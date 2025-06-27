import appError from "../utils/appError.js";

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // operational, trusted errors:send msg to the client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // programming or other unknown error: dont want to leak details to the client.
    // 1. log the error
    console.error("error 😤", err);
    // 2. send a generic message
    return res.status(500).json({
      status: "error",
      message: "something went very wrong.",
    });
  }
};

const handleCastErrorDB = (err) => {
  // transfering an error message into a readable one:
  const message = `invalid ${err.path}: ${err.value}`;
  return new appError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
  // regular expression, find text in between "":
  const msgSource = err.errmsg || err.message || "";
  const value = msgSource.match(/([""])(\\?.)*\1/)[0];
  const message = `duplicate field value: ${value}. use another value`;
  return new appError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `invalid input data: ${errors.join(". ")}`;
  return new appError(message, 400);
};

export const globalErrorHandler = (err, req, res, next) => {
  const env = process.env.NODE_ENV || "production"; // fallback to 'development' if not set
  // sets default values if the error obj doesnt have them.
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error"; // 400 "fail", 500 "error"

  if (env === "development") {
    return sendErrorDev(err, res);
  } else if (env === "production") {
    let error = { ...err };
    // let error = Object.create(err);
    // makes a copy, modifying err directly can cause side effects elsewhere.

    // invalid id
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    // duplicate fields
    if (error.code === 11000) {
      error = handleDuplicateErrorDB(error);
    }
    // validation error
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    // not sure about this isOperational part.
    if (!error.isOperational) {
      error.isOperational = false;
    }

    return sendErrorProd(error, res);
  }
};

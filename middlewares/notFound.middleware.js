import AppError from "../utils/appError.js";

export const notFound = (req, res, next) => {
  next(new AppError("undefined route", 404));
};

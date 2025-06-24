import AppError from "../utils/appError.js";

export const notFound = (req, res, next) => {
  next(
    new AppError(`can't find the ${req.originalUrl} route on this server`, 404)
  );
};

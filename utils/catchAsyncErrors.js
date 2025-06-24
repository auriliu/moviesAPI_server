// export const catchAsyncErrors = (fn) => (req, res, next) => {
//   return fn(req, res, next).catch((err) => next(err));
// };

export const catchAsyncErrors = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
    // promises have .catch method.
  };
};

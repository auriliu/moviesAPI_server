import { promisify } from "util";

export const protect = async (req, res, next) => {
  try {
    // 1. get the token, check if it exists.
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("token:", token);

    if (!token) {
      // instead an error, return a response.status(401).json({message: "access denied"})
      // do not continue with the request.
      return next(new Error("u r not logged in."));
    }
    // 2. token verification. [ LATER ]
    // without the promise part, do directly.
    // verify with the token and the secret: simplify.
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // decoded ll have access to user id to check who is making a request.
    // 3. check if user still exists. [ LATER ]
    // unnecessary step.
    // unnecessary step.
    // fix this part in some other way.
    // add the id in the request. if no id - no request.
    req.userId = decoded.id;
    // now u have id in ur request.
    //
    // const freshUser = await User.findById(decoded.id);
    // if (!freshUser) {
    //   return next(new Error("the user no longer exists"));
    // }
    // 4. check if user changed password after token was issued. [ LATER ]
    next();
  } catch (error) {
    next(error);
  }
};

// any controller can call it.

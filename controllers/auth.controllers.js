import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (id) => {
  // { id: newUser._id }, {id: id} = {id}
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// create new user:
export const signup = async (req, res, next) => {
  try {
    // creating a new user:
    const newUser = new User({
      // allowing only this data
      // with req.body, u d allow anything.
      // e.g. role is not stored here.
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmedPassword: req.body.confirmedPassword,
    });
    // after u signup, auto log in.

    const token = createToken(newUser._id);

    newUser.confirmedPassword = undefined;
    // removes the password from the output.
    await newUser.save();

    // to hide password in response, convert to object and delete it before sending:
    const userObj = newUser.toObject();
    delete userObj.password;
    // sending back the response: with the newly created user.
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: userObj,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 1. hash the password.
// 2. validate inputs.
// 3. remove confirmed password before saving.
// 4. handle errors properly.

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 1. check if email and password exist
    if (!email || !password) {
      return next(new Error("provide your credentials"));
    }
    // 2. check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");
    // if (!user || !(await user.correctPassword(password, user.password))) {
    //   return next(new Error("incorrect credentials"));
    // }
    // HASH THE PASSWORDS WITH BCRYPT MISSING.
    // HASH THE PASSWORDS WITH BCRYPT MISSING.

    // 3. if everything's ok, send the token to the client.
    const token = createToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

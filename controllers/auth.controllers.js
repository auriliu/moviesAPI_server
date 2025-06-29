import User from "../db/models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/config.js";

// signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "user already exists." });

    const newUser = new User({
      name,
      email,
      password, // plain password, will be hashed by schema pre-save hook
    });

    const freshUser = await newUser.save();

    // auto user login
    const token = jwt.sign({ id: newUser._id }, "process.env.JWT_SECRET", {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "user created.", token, freshUser });
    // end of auto user login
  } catch (err) {
    res.status(500).json({ message: "server error." });
    console.log(err);
  }
};

// log the new user in:
export const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if email exists: do i need to add: .select("+password") ??
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "invalid credentials." });

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "invalid credentials." });

    // issue the token
    const token = jwt.sign({ id: user._id }, "JWT_SECRET_PLACEHOLDER", {
      expiresIn: "1h",
    });

    // send it to the client.
    res
      .status(200)
      .json({ message: "login successful.", token, user: { name: user.name } });
  } catch (err) {
    res.status(500).json({ message: "server error." });
  }
};

// to log out: stop sending the token via postman.

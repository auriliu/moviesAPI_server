import User from "../db/models/userSchema.js";

export const createUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
  });

  const result = await newUser.save();
  res.json({ result, message: "new user created successfully" });
};

export const getAllUsers = async (req, res) => {
  // check here if that user id exists.
  // not all the routes ll check for the token, but this one.

  const users = await User.find();
  res.json({ users, message: "get all users" });
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({ user, message: "get a user" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.findOneAndDelete({ _id: id });
  // find the obj where _id === id.
  res.json({ message: "user deleted" });
};

export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.json({ updatedUser, message: "update successful" });
};

import User from "../models/userSchema.js";

export const createUser = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    id: req.body.id,
  });
  const result = await newUser.save();

  res.json(result);
};

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ id });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.deleteOne({ id });
  res.send("user deleted");
};

export const updateUser = async (req, res) => {
  const updatedUser = await User.updateOne(
    { id: req.params.id },
    { $set: req.body }
  );
  res.json({ updatedUser, message: "update successful" });
};

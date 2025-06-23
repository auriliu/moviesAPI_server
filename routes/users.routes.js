import express from "express";

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js";

import { signup, login } from "../controllers/auth.controllers.js";
import { protect } from "../controllers/auth.controllers.js";

export const usersRouter = express.Router();

usersRouter.post("/users/signup", signup);
usersRouter.post("/users/login", login);

// protect middleware:
usersRouter.get("/users", protect, getAllUsers);
// usersRouter.get("/users", getAllUsers);
usersRouter.post("/users", createUser);

usersRouter.get("/users/:id", getUser);
usersRouter.patch("/users/:id", updateUser);
usersRouter.delete("/users/:id", deleteUser);

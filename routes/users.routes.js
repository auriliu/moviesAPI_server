import express from "express";

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js";

export const usersRouter = express.Router();

usersRouter.get("/users", getAllUsers);
usersRouter.post("/users", createUser);

usersRouter.get("/users/:id", getUser);
usersRouter.patch("/users/:id", updateUser);
usersRouter.delete("/users/:id", deleteUser);

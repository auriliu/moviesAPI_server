import { Router } from "express";

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js";

import { protect } from "../middlewares/auth.middleware.js";

export const userRoutes = Router();

userRoutes.get("/", protect, getAllUsers);
userRoutes.post("/", createUser);

userRoutes.get("/:id", getUser);
userRoutes.patch("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

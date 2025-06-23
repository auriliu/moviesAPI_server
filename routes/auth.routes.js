import { Router } from "express";

import { signup, login } from "../controllers/auth.controllers.js";

export const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);

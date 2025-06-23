import { Router } from "express";

import {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movies.controllers.js";

export const movieRoutes = Router();

movieRoutes.get("/", getAllMovies);
movieRoutes.post("/", createMovie);

movieRoutes.get("/:id", getMovie);
movieRoutes.patch("/:id", updateMovie);
movieRoutes.delete("/:id", deleteMovie);

import express from "express";

import {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movies.controllers.js";

export const moviesRouter = express.Router();

moviesRouter.get("/movies", getAllMovies);
moviesRouter.post("/movies", createMovie);

moviesRouter.get("/movies/:id", getMovie);
moviesRouter.patch("/movies/:id", updateMovie);
moviesRouter.delete("/movies/:id", deleteMovie);

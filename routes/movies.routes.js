import express from "express";

import {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movies.controllers.js";

export const movieRouter = express.Router();

movieRouter.route("/movies").get(getAllMovies).post(createMovie);

movieRouter
  .route("/movies/:id")
  .get(getMovie)
  .patch(updateMovie)
  .delete(deleteMovie);

const express = require("express");

const {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieControllers");

const router = express.Router();

router.route("/movies").get(getAllMovies).post(createMovie);

router
  .route("/movies/:id")
  .get(getMovie)
  .patch(updateMovie)
  .delete(deleteMovie);

module.exports = router;

const getAllMovies = (req, res) => {
  res.send("get all movies");
};
const createMovie = (req, res) => {
  res.send("create a movie");
};

const getMovie = (req, res) => {
  const { id } = req.params;

  res.send(`get a movie, id: ${id}`);
};
const deleteMovie = (req, res) => {
  const { id } = req.params;

  res.send(`delete a movie, id: ${id}`);
};

const updateMovie = (req, res) => {
  const { id } = req.params;

  res.send(`update a movie, id: ${id}`);
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  deleteMovie,
  updateMovie,
};

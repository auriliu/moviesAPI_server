//

export const createMovie = (req, res) => {
  res.send("create a movie");
};

export const getAllMovies = (req, res) => {
  res.send("get all movies");
};

export const getMovie = (req, res) => {
  const { id } = req.params;

  res.send(`get a movie, id: ${id}`);
};
export const deleteMovie = (req, res) => {
  const { id } = req.params;

  res.send(`delete a movie, id: ${id}`);
};

export const updateMovie = (req, res) => {
  const { id } = req.params;

  res.send(`update a movie, id: ${id}`);
};

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

// GET: get all products:
// app.get("/products", async (req, res) => {
//   const products = await collection.find().toArray();
//   res.json(products);
// });

// GET: get one product:
// app.get("/products/:id", async (req, res) => {
//   const { id } = req.params;
//   const product = await collection.findOne({ _id: new ObjectId(id) });
//   res.json(product);
// });

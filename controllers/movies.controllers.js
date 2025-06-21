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

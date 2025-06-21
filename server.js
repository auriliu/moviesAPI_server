require("dotenv").config();

const express = require("express");
const cors = require("cors");

const movieRouter = require("./routes/movieRouter.js");

const PORT = process.env.PORT || 5000;
const connectDB = require("./mongoDB.js");

const app = express();
app.use(express.json()); // parses incoming json into a js object.
app.use(cors()); // enables requests from domains other than your server.

connectDB();

app.use("/api/v1", movieRouter);

app.listen(PORT, () => console.log(`the server is up at port ${PORT}`));

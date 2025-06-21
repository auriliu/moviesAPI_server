import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

import express from "express";
import cors from "cors";
import connectDB from "./mongoDB.js";

import { moviesRouter } from "./routes/movies.routes.js";
import { usersRouter } from "./routes/users.routes.js";

const app = express();
app.use(express.json()); // parses incoming json into a js object.
app.use(cors()); // enables requests from domains other than your server.

connectDB();

app.use("/api/v1", moviesRouter);
app.use("/api/v1", usersRouter);

app.listen(PORT, () => console.log(`the server is up at port ${PORT}`));

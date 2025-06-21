import dotenv from "dotenv";
dotenv.config();

import connectDB from "./mongoDB.js";

import express from "express";
import cors from "cors";

import { movieRouter } from "./routes/movies.routes.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json()); // parses incoming json into a js object.
app.use(cors()); // enables requests from domains other than your server.

connectDB();

app.use("/api/v1", movieRouter);

app.listen(PORT, () => console.log(`the server is up at port ${PORT}`));

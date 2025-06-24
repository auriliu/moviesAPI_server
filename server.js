import { PORT } from "./config/config.js";

import express from "express";
import cors from "cors";
import connectDB from "./db/mongoDB.js";

import { authRoutes } from "./routes/auth.routes.js";
import { movieRoutes } from "./routes/movies.routes.js";
import { userRoutes } from "./routes/users.routes.js";

import { notFound } from "./middlewares/notFound.middleware.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json()); // parses incoming json into a js object.
app.use(cors()); // enables requests from domains other than your server.

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/users", userRoutes);

app.all("/{*any}", notFound);

app.use(globalErrorHandler); 

app.listen(PORT, () => console.log(`the server is up at port ${PORT}`));

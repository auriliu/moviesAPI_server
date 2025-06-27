import { PORT } from "./config/config.js";

import express from "express";
import cors from "cors";
import connectDB from "./db/mongoDB.js";

import { authRoutes } from "./routes/auth.routes.js";
import { movieRoutes } from "./routes/movies.routes.js";
import { userRoutes } from "./routes/users.routes.js";

import { notFound } from "./middlewares/notFound.middleware.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";

// uncaught exceptions:
// process.on("uncaughtException", (err) => {
//   console.log("unhandled exception! 😲 shutting down...");
//   console.log(err.name, err.message);
//   process.exit(1);
// });

// console.log(x);

const app = express();
app.use(express.json()); // parses incoming json into a js object.
app.use(cors()); // enables requests from domains other than your server.

connectDB();

// a request is comming through and is looking for a match.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/users", userRoutes);
// app.use("*", notFound);

// testing
// testing
app.all("*", (req, res, next) => {
  // define the error obj (1)
  const err = new Error("accessing undefined route");
  // text inside new Error() becomes err.message value.
  // take err obj and add additional properties:
  err.status = "fail";
  err.statusCode = 404;
  // pass it along to the global err handling mw(2)
  next(err);
  // err obj inside the next() becomes the err obj inside the global err hd mw.
  // err passed to next() becomes err in global err-handling mw.
  // next() skips normal mws n goes to the 1st err-hd mw ((err, req, res, next)).
});

// GLOBAL ERR HANDLING MIDDLEWARE: 4 arguments.
app.use((err, req, res, next) => {
  // read properties from the err obj or default values
  err.status = err.status || "error";
  err.statusCode = err.statusCode || "500";

  // response to the err provided here (3)
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// testing
// testing

// app.use(globalErrorHandler);

// listens for unhandeld promise rejections:
// process.on("unhandledRejection", (err) => {
//   console.log("unhandled rejection! 😲 shutting down...");
//   console.log(err.name, err.message);
//   // giving the server time to finish pending tasks.
//   server.close(() => {
//     process.exit(1);
//   });
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json()); // parses incoming json into a js object.
app.use(cors());
// enables cross-origin requests
// requests from domains other than your server.

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`the server is up at port ${PORT}`));

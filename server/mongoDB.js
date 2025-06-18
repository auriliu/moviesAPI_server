const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;

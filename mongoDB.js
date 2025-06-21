import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER;

const url = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export default async function connectDB() {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
}

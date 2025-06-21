import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  likedMovies: [{ type: String }],
  //  this ll be an array of liked movies ids...
});

export default mongoose.model("User", userSchema);
// this ll create users collection on the db.

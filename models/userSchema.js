import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
});

export default mongoose.model("User", userSchema);
// this ll create users collection on the db.

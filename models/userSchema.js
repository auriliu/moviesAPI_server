import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "tell as your name"] },
  // 2nd value- error message
  email: {
    type: String,
    // required: [true, "provide your email"],
    unique: true,
    lowercase: true,
    // validate: [validate.isEmail, "provide a valid email"],
    // import validator from npm.
    // unique doesnt seem to work.
  },
  password: {
    type: String,
    required: [true, "provide a password"],
    // minlength: 8,
    select: false,
    // select: false, wont show password in any output.
    // select: false hides ONLY when quering.
  },
  confirmedPassword: {
    type: String,
    // required: [true, "confirm your password"],
  },

  photo: String,
});

// every User instance gets access to the .correctPassword() function.
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model("User", userSchema);
// this ll create users collection on the db.

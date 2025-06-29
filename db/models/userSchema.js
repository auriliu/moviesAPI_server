import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minlength: [2, "name must be at least 2 characters"],
      maxlength: [50, "name must be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [3, "password must be at least 3 characters"],
      select: false, // exclude password by default
    },
    // confirmedPassword is a virtual field, not saved in DB:
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // auto-manage createdAt and updatedAt
  }
);

// pre-save hook to hash password before saving:
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model("User", UserSchema);

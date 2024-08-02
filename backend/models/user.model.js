import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is reuired!"],
    },
    username: {
      type: String,
      required: [true, "user name is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required!"],
    },
    gender: {
      type: String,
      required: [true, "gender is required!"],
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);

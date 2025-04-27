import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    gender: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: "user",
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;

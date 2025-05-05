import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
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
      required: false,
    },
    address: {
      type: String,
      required: false,
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

const User = model("Users", userSchema);

export default User;

import mongoose from "mongoose";
import { generateRandomWord } from "../helper.js";
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  emailAddress: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  temporary: {
    type: String,
    default: generateRandomWord(),
  },
  progress: {
    type: [
      {
        recordedOn: {
          type: Date,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
        rate: {
          type: Number,
          default: 5,
        },
        journal: {
          type: String,
          default: "",
        },
      },
    ],
    default: [],
  },
});
const User = mongoose.model("User", userSchema);
export default User;

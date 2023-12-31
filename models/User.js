import mongoose from "mongoose";
import moment from "moment";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username Required"],
  },
  avatarUrl: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email Required"],
    unique: [true, "Email is not unique"],
  },
  password: {
    type: String,
    required: true,
  },
  securityQuestion: {
    type: String,
  },
  securityAnswer: {
    type: String,
  },
  registeredAt: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
});

export const User = mongoose.model("User", userSchema);

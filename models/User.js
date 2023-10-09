import mongoose from "mongoose";
import moment from "moment";

const userSchema = mongoose.Schema({
  name: {
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
  securityQuestion: {
    type: String,
  },
  securityAnswer: {
    type: String,
  },
  registeredAt: {
    type: Date,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
});

export const User = mongoose.model("User", userSchema);

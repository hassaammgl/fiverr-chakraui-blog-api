import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blogs",
  },
});

export const Like = mongoose.model("Like", likeSchema);

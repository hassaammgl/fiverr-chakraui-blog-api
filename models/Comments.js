import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Comment description required"],
  },
  user: {
    type: String,
    required: true,
  },
  blogs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blogs",
  },
});

export const Comment = mongoose.model("Comment", commentSchema);

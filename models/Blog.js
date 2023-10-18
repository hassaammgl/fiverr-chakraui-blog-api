import mongoose from "mongoose";
import moment from "moment";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title must be required"],
  },
  content: {
    type: String,
    required: [true, "Content must be required"],
  },
  imageLink: {
    type: String,
    required: [true, "Image must be required"],
  },
  author: {
    type: String,
    required: [true, "Author name must be required"],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
  updatedAt: {
    type: String,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);

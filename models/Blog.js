import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
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
      required: [true, "Image link must be required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      required: true,
    },
  },
  { timestamps: true }
);

export const Blogs = mongoose.model("Blogs", blogSchema);

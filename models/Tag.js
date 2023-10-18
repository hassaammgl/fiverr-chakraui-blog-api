import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
  tagName: {
    type: String,
    required: [true, "Tag name must be required"],
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

export const Tag = mongoose.model("Tag", tagSchema);

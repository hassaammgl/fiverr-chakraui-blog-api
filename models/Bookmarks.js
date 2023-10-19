import mongoose from "mongoose";

const bookmarkSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blogs",
  },
});
// check kerna ke liye hum user or blog dono ko find one me dale ge

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

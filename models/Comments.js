import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    blogs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs"
    }
});

export const Comment = mongoose.model("Comment",commentSchema);
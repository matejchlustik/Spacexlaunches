const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "National Politics",
        "Local Politics",
        "Sports",
        "Current Events",
        "Community",
        "Ideas",
      ],
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    approved: {
      type: Boolean,
      default: false,
    },
    reportCount: { type: Number, default: 0 },
    replyCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

postSchema.index({ title: "text", content: "text" });

exports.Post = mongoose.model("Post", postSchema);
exports.Reply = mongoose.model("Reply", replySchema);

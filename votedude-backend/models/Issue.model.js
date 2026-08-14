const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    proArguments: [{ type: String }],
    conArguments: [{ type: String }],
    followerCount: { type: Number, default: 0 },
    trend: {
      type: String,
      enum: ["hot", "rising", "steady"],
      default: "steady",
    },
    relatedNews: [{ type: mongoose.Schema.Types.ObjectId, ref: "News" }],
    relatedCandidates: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
    ],
    discussionPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Issue", schema);

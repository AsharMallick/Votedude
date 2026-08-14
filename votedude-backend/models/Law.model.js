const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    billNumber: { type: String, required: true },
    chamber: { type: String, enum: ["House", "Senate"], required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "Introduced",
        "In Committee",
        "Floor Vote",
        "Passed House",
        "Passed Senate",
        "Signed",
      ],
      default: "Introduced",
    },
    discussionPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    supportPercent: { type: Number, default: 0 },
  },

  { timestamps: true },
);

schema.index({ title: "text", billNumber: "text" });

module.exports = mongoose.model("Law", schema);

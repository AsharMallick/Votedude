const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [
      {
        text: { type: String, required: true },
        voteCount: { type: Number, default: 0 },
      },
    ],
    votedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poll", schema);

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    office: { type: String, required: true },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    district: { type: String, default: "" },
    party: { type: String, default: "" },
    photo: { type: String, default: "" },
    bio: { type: String, default: "" },
    website: { type: String, default: "" },
    positions: [{ type: String }],
    votingHistory: [{ type: String }],
  },
  { timestamps: true }
);

schema.index({ name: "text", office: "text", city: "text", district: "text" });

module.exports = mongoose.model("Candidate", schema);

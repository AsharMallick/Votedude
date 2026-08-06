const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "" },
    goal: { type: Number, required: true },
    signedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

schema.virtual("signatureCount").get(function () {
  return this.signedUsers.length;
});
schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Petition", schema);

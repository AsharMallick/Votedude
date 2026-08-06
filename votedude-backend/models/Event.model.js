const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Community", "Political", "Volunteer", "Fundraiser", "Networking", "Sports"],
      required: true,
    },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    lat: Number,
    lng: Number,
    image: { type: String, default: "" },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "approved"], default: "pending" },
    rsvpList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

schema.index({ title: "text", location: "text" });

module.exports = mongoose.model("Event", schema);

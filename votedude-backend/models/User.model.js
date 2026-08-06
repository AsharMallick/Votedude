const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // not required for Google users
      select: false,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      default: null,
    },
    photo: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin", "organization"],
      default: "user",
    },
    points: {
      type: Number,
      default: 0,
    },
    badges: [{ type: String }],
    favoriteCandidates: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
    ],
  },
  { timestamps: true }
);

schema.methods.generateToken = async function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

schema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.passwordCompare = async function (password) {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", schema);

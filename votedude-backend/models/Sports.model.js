const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String, default: "" },
  description: { type: String, default: "" },
});

const leagueSchema = new mongoose.Schema(
  {
    sport: { type: mongoose.Schema.Types.ObjectId, ref: "Sport", required: true },
    city: { type: String, required: true },
    season: { type: String, required: true },
  },
  { timestamps: true }
);

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    league: { type: mongoose.Schema.Types.ObjectId, ref: "League", required: true },
    captain: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    email: String,
    cityOrZip: String,
  },
  { timestamps: true }
);

const matchSchema = new mongoose.Schema(
  {
    league: { type: mongoose.Schema.Types.ObjectId, ref: "League", required: true },
    teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    date: { type: Date, required: true },
    scoreA: { type: Number, default: null },
    scoreB: { type: Number, default: null },
    played: { type: Boolean, default: false },
  },
  { timestamps: true }
);

exports.Sport = mongoose.model("Sport", sportSchema);
exports.League = mongoose.model("League", leagueSchema);
exports.Team = mongoose.model("Team", teamSchema);
exports.Match = mongoose.model("Match", matchSchema);

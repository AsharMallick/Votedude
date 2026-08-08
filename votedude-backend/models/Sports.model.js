const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const leagueSchema = new mongoose.Schema(
  {
    sport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sport",
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    season: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const tournamentSchema = new mongoose.Schema(
  {
    sport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sport",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    email: {
      type: String,
      default: "",
    },
    cityOrZip: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const matchSchema = new mongoose.Schema(
  {
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      default: null,
    },
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      default: null,
    },
    teamA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    teamB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    scoreA: {
      type: Number,
      default: null,
    },
    scoreB: {
      type: Number,
      default: null,
    },
    played: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

exports.Sport = mongoose.model("Sport", sportSchema);
exports.League = mongoose.model("League", leagueSchema);
exports.Tournament = mongoose.model("Tournament", tournamentSchema);
exports.Team = mongoose.model("Team", teamSchema);
exports.Match = mongoose.model("Match", matchSchema);

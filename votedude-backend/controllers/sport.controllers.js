const { Sport, League, Team, Match } = require("../models/Sports.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { awardPoints } = require("../utils/gamification");

exports.getSports = catchAsyncError(async (req, res, next) => {
  const sports = await Sport.find();
  res.status(200).json({ success: true, sports });
});

exports.getLeagues = catchAsyncError(async (req, res, next) => {
  const { sport, city } = req.body || {};
  const filter = {};
  if (sport) filter.sport = sport;
  if (city) filter.city = city;

  const leagues = await League.find(filter).populate("sport");
  res.status(200).json({ success: true, leagues });
});

exports.getTeamsByLeague = catchAsyncError(async (req, res, next) => {
  const teams = await Team.find({ league: req.params.id }).populate(
    "players",
    "name photo city"
  );
  res.status(200).json({ success: true, teams });
});

exports.registerTeam = catchAsyncError(async (req, res, next) => {
  const { name, league, email, cityOrZip } = req.body;

  if (!name || !league) {
    return next(new ErrorHandler("Team name and league are required", 400));
  }

  const team = await Team.create({
    name,
    league,
    captain: req.user._id,
    players: [req.user._id],
    email,
    cityOrZip,
  });

  await awardPoints(req.user, "JOIN_LEAGUE");

  res.status(201).json({ success: true, team });
});

exports.joinTeam = catchAsyncError(async (req, res, next) => {
  const team = await Team.findById(req.params.id);
  if (!team) return next(new ErrorHandler("Team not found", 404));

  const alreadyJoined = team.players.some(
    (p) => String(p) === String(req.user._id)
  );

  if (!alreadyJoined) {
    team.players.push(req.user._id);
    await team.save();
    await awardPoints(req.user, "JOIN_LEAGUE");
  }

  res.status(200).json({ success: true, team });
});

exports.getStandings = catchAsyncError(async (req, res, next) => {
  const teams = await Team.find({ league: req.params.id });
  const matches = await Match.find({ league: req.params.id, played: true });

  const standings = teams.map((team) => {
    let wins = 0;
    let losses = 0;
    let ties = 0;

    matches.forEach((m) => {
      const isTeamA = String(m.teamA) === String(team._id);
      const isTeamB = String(m.teamB) === String(team._id);
      if (!isTeamA && !isTeamB) return;

      const ourScore = isTeamA ? m.scoreA : m.scoreB;
      const theirScore = isTeamA ? m.scoreB : m.scoreA;

      if (ourScore > theirScore) wins++;
      else if (ourScore < theirScore) losses++;
      else ties++;
    });

    return { team: team.name, teamId: team._id, wins, losses, ties };
  });

  standings.sort((a, b) => b.wins - a.wins);

  res.status(200).json({ success: true, standings });
});

exports.getSchedule = catchAsyncError(async (req, res, next) => {
  const matches = await Match.find({ league: req.params.id })
    .populate("teamA", "name")
    .populate("teamB", "name")
    .sort({ date: 1 });

  res.status(200).json({ success: true, matches });
});

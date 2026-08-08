const {
  Sport,
  League,
  Tournament,
  Team,
  Match,
} = require("../models/Sports.model");

const User = require("../models/User.model");

const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { awardPoints } = require("../utils/gamification");

exports.getSports = catchAsyncError(async (req, res, next) => {
  const sports = await Sport.find().sort({ name: 1 });

  res.status(200).json({
    success: true,
    sports,
  });
});

exports.getLeagues = catchAsyncError(async (req, res, next) => {
  const { sport, city } = req.query;

  const filter = {};

  if (sport) {
    filter.sport = sport;
  }

  if (city) {
    filter.city = {
      $regex: city,
      $options: "i",
    };
  }

  const leagues = await League.find(filter)
    .populate("sport", "name icon description")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    leagues,
  });
});

exports.getTournaments = catchAsyncError(async (req, res, next) => {
  const { sport, city } = req.query;

  const filter = {};

  if (sport) {
    filter.sport = sport;
  }

  if (city) {
    filter.city = {
      $regex: city,
      $options: "i",
    };
  }

  const tournaments = await Tournament.find(filter)
    .populate("sport", "name icon description")
    .populate("teams", "name captain players cityOrZip")
    .sort({ startDate: 1 });

  res.status(200).json({
    success: true,
    tournaments,
  });
});

exports.getTournamentById = catchAsyncError(async (req, res, next) => {
  const tournament = await Tournament.findById(req.params.id)
    .populate("sport", "name icon description")
    .populate("teams", "name captain players cityOrZip");

  if (!tournament) {
    return next(new ErrorHandler("Tournament not found", 404));
  }

  res.status(200).json({
    success: true,
    tournament,
  });
});

exports.getTeamsByLeague = catchAsyncError(async (req, res, next) => {
  const league = await League.findById(req.params.id);

  if (!league) {
    return next(new ErrorHandler("League not found", 404));
  }

  const teams = await Team.find({
    league: req.params.id,
  })
    .populate("captain", "name photo city")
    .populate("players", "name photo city")
    .sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    teams,
  });
});

exports.getTeamById = catchAsyncError(async (req, res, next) => {
  const team = await Team.findById(req.params.id)
    .populate("captain", "name photo city")
    .populate("players", "name photo city")
    .populate({
      path: "league",
      populate: {
        path: "sport",
        select: "name icon description",
      },
    });

  if (!team) {
    return next(new ErrorHandler("Team not found", 404));
  }

  res.status(200).json({
    success: true,
    team,
  });
});

exports.registerTeam = catchAsyncError(async (req, res, next) => {
  const { name, league, email, cityOrZip } = req.body;

  if (!name || !league) {
    return next(new ErrorHandler("Team name and league are required", 400));
  }

  const selectedLeague = await League.findById(league);

  if (!selectedLeague) {
    return next(new ErrorHandler("League not found", 404));
  }
  const userAlreadyInATeam = await Team.findOne({
    players: req.user._id,
  });

  if (userAlreadyInATeam) {
    return next(
      new ErrorHandler("You are already a member of another team", 400),
    );
  }

  const existingCaptainTeam = await Team.findOne({
    captain: req.user._id,
  });

  if (existingCaptainTeam) {
    return next(new ErrorHandler("You are already a captain of a team", 400));
  }

  const team = await Team.create({
    name,
    league,
    captain: req.user._id,
    players: [req.user._id],
    email: email || "",
    cityOrZip: cityOrZip || "",
  });

  await awardPoints(req.user, "JOIN_LEAGUE");

  res.status(201).json({
    success: true,
    team,
  });
});

exports.joinTeam = catchAsyncError(async (req, res, next) => {
  const team = await Team.findById(req.params.id);
  const user = await User.findById(req.user._id);

  if (!team) {
    return next(new ErrorHandler("Team not found", 404));
  }

  const userAlreadyInThisTeam = team.players.some(
    (player) => String(player) === String(req.user._id),
  );

  if (userAlreadyInThisTeam) {
    return next(new ErrorHandler("You are already a member of this team", 400));
  }

  const userAlreadyInATeam = await Team.findOne({
    players: req.user._id,
  });

  if (userAlreadyInATeam) {
    return next(
      new ErrorHandler("You are already a member of another team", 400),
    );
  }
  team.players.push(req.user._id);

  await team.save();

  await awardPoints(req.user, "JOIN_LEAGUE");

  const updatedTeam = await Team.findById(team._id)
    .populate("captain", "name photo city")
    .populate("players", "name photo city");

  res.status(200).json({
    success: true,
    team: updatedTeam,
  });
});

exports.joinTournament = catchAsyncError(async (req, res, next) => {
  const tournament = await Tournament.findById(req.params.id).populate(
    "sport",
    "name",
  );

  if (!tournament) {
    return next(new ErrorHandler("Tournament not found", 404));
  }

  // Only a team captain can register a team for a tournament.
  const team = await Team.findOne({
    captain: req.user._id,
  }).populate({
    path: "league",
    populate: {
      path: "sport",
      select: "name",
    },
  });

  if (!team) {
    return next(
      new ErrorHandler(
        "You must be a team captain to register for a tournament",
        400,
      ),
    );
  }

  if (!team.league || !team.league.sport) {
    return next(
      new ErrorHandler("Your team does not have a valid sport assigned", 400),
    );
  }

  // Make sure the team's sport matches the tournament's sport.
  if (String(team.league.sport._id) !== String(tournament.sport._id)) {
    return next(
      new ErrorHandler(
        `Your team plays ${team.league.sport.name}, so it cannot join a ${tournament.sport.name} tournament`,
        400,
      ),
    );
  }

  // Prevent the same team from registering twice.
  const alreadyRegistered = tournament.teams.some(
    (teamId) => String(teamId) === String(team._id),
  );

  if (alreadyRegistered) {
    return next(
      new ErrorHandler(
        "Your team is already registered for this tournament",
        400,
      ),
    );
  }

  tournament.teams.push(team._id);

  await tournament.save();

  const updatedTournament = await Tournament.findById(tournament._id)
    .populate("sport", "name icon description")
    .populate("teams", "name captain players cityOrZip");

  res.status(200).json({
    success: true,
    message: "Your team has been registered for the tournament",
    tournament: updatedTournament,
  });
});

exports.getStandings = catchAsyncError(async (req, res, next) => {
  const league = await League.findById(req.params.id);

  if (!league) {
    return next(new ErrorHandler("League not found", 404));
  }

  const teams = await Team.find({
    league: req.params.id,
  });

  const matches = await Match.find({
    league: req.params.id,
    played: true,
  });

  const standings = teams.map((team) => {
    let wins = 0;
    let losses = 0;
    let ties = 0;

    matches.forEach((match) => {
      const isTeamA = String(match.teamA) === String(team._id);

      const isTeamB = String(match.teamB) === String(team._id);

      if (!isTeamA && !isTeamB) {
        return;
      }

      if (
        match.scoreA === null ||
        match.scoreA === undefined ||
        match.scoreB === null ||
        match.scoreB === undefined
      ) {
        return;
      }

      const ourScore = isTeamA ? match.scoreA : match.scoreB;

      const opponentScore = isTeamA ? match.scoreB : match.scoreA;

      if (ourScore > opponentScore) {
        wins++;
      } else if (ourScore < opponentScore) {
        losses++;
      } else {
        ties++;
      }
    });

    return {
      team: team.name,
      teamId: team._id,
      wins,
      losses,
      ties,
      gamesPlayed: wins + losses + ties,
    };
  });

  standings.sort((a, b) => {
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }

    if (a.losses !== b.losses) {
      return a.losses - b.losses;
    }

    return b.ties - a.ties;
  });

  res.status(200).json({
    success: true,
    standings,
  });
});

exports.getSchedule = catchAsyncError(async (req, res, next) => {
  const league = await League.findById(req.params.id);

  if (!league) {
    return next(new ErrorHandler("League not found", 404));
  }

  const matches = await Match.find({
    league: req.params.id,
  })
    .populate("teamA", "name")
    .populate("teamB", "name")
    .sort({ date: 1 });

  res.status(200).json({
    success: true,
    matches,
  });
});

exports.getTournamentSchedule = catchAsyncError(async (req, res, next) => {
  const tournament = await Tournament.findById(req.params.id);

  if (!tournament) {
    return next(new ErrorHandler("Tournament not found", 404));
  }

  const matches = await Match.find({
    tournament: req.params.id,
  })
    .populate("teamA", "name")
    .populate("teamB", "name")
    .sort({ date: 1 });

  res.status(200).json({
    success: true,
    matches,
  });
});

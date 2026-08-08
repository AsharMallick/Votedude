const router = require("express").Router();

const {
  getSports,
  getLeagues,
  getTournaments,
  getTournamentById,
  getTeamsByLeague,
  getTeamById,
  registerTeam,
  joinTeam,
  joinTournament,
  getStandings,
  getSchedule,
  getTournamentSchedule,
} = require("../controllers/sport.controllers");

const { isAuthenticated } = require("../middlewares/auth");

router.route("/sports").get(getSports);

router.route("/sports/leagues").get(getLeagues);

router.route("/sports/leagues/search").post(getLeagues);

router.route("/sports/leagues/:id/teams").get(getTeamsByLeague);

router.route("/sports/leagues/:id/standings").get(getStandings);

router.route("/sports/leagues/:id/schedule").get(getSchedule);

router.route("/sports/tournaments").get(getTournaments);

router.route("/sports/tournaments/:id").get(getTournamentById);

router.route("/sports/tournaments/:id/schedule").get(getTournamentSchedule);

router
  .route("/sports/tournaments/:id/join")
  .put(isAuthenticated, joinTournament);

router.route("/sports/teams").post(isAuthenticated, registerTeam);

router.route("/sports/teams/:id").get(getTeamById);

router.route("/sports/teams/:id/join").put(isAuthenticated, joinTeam);

module.exports = router;

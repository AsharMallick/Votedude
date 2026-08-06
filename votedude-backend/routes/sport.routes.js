const router = require("express").Router();
const {
  getSports,
  getLeagues,
  getTeamsByLeague,
  registerTeam,
  joinTeam,
  getStandings,
  getSchedule,
} = require("../controllers/sport.controllers");
const { isAuthenticated } = require("../middlewares/auth");

router.route("/sports").get(getSports);
router.route("/sports/leagues").get(getLeagues);
router.route("/sports/leagues/search").post(getLeagues);
router.route("/sports/leagues/:id/teams").get(getTeamsByLeague);
router.route("/sports/leagues/:id/standings").get(getStandings);
router.route("/sports/leagues/:id/schedule").get(getSchedule);
router.route("/sports/teams").post(isAuthenticated, registerTeam);
router.route("/sports/teams/:id/join").put(isAuthenticated, joinTeam);

module.exports = router;

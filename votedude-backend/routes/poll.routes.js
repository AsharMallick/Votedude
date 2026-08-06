const router = require("express").Router();
const {
  getPolls,
  getFeaturedPoll,
  createPoll,
  vote,
} = require("../controllers/poll.controllers");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

router
  .route("/polls")
  .get(getPolls)
  .post(isAuthenticated, authorizeAdmin, createPoll);
router.route("/polls/featured").get(getFeaturedPoll);
router.route("/polls/:id/vote").put(isAuthenticated, vote);

module.exports = router;

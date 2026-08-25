const router = require("express").Router();
const {
  register,
  login,
  logout,
  getMyDetails,
  getProfile,
  getLeaderboard,
} = require("../controllers/user.controllers");
const { isAuthenticated } = require("../middlewares/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getMyDetails);
router.route("/leaderboard").post(getLeaderboard);
router.route("/user/:id/profile").get(getProfile);

module.exports = router;

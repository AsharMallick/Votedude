const router = require("express").Router();
const {
  getPosts,
  getPostById,
  createPost,
  addReply,
  toggleLike,
  reportPost,
} = require("../controllers/discuss.controllers");
const { isAuthenticated } = require("../middlewares/auth");

router.route("/discuss").get(getPosts).post(isAuthenticated, createPost);
router.route("/discuss/search").post(getPosts);
router.route("/discuss/:id").get(getPostById);
router.route("/discuss/:id/reply").post(isAuthenticated, addReply);
router.route("/discuss/:id/like").put(isAuthenticated, toggleLike);
router.route("/discuss/:id/report").put(isAuthenticated, reportPost);

module.exports = router;

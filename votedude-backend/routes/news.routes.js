const router = require("express").Router();
const {
  getNews,
  getNewsById,
  createNews,
  toggleLike,
  addComment,
  ensureNewsDiscussion,
} = require("../controllers/news.controllers");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

router
  .route("/news")
  .get(getNews)
  .post(isAuthenticated, authorizeAdmin, createNews);
router.route("/news/search").post(getNews);
router.route("/news/:id").get(getNewsById);
router.route("/news/:id/like").put(isAuthenticated, toggleLike);
router.route("/news/:id/comment").post(isAuthenticated, addComment);
router
  .route("/news/:id/ensure-discussion")
  .post(isAuthenticated, ensureNewsDiscussion);

module.exports = router;

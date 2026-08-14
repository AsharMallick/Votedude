const router = require("express").Router();
const {
  getIssues,
  getIssueById,
  createIssue,
  followIssue,
  ensureIssueDiscussion,
} = require("../controllers/issue.controllers");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

router
  .route("/issues")
  .get(getIssues)
  .post(isAuthenticated, authorizeAdmin, createIssue);
router.route("/issues/search").post(getIssues);
router.route("/issues/:id").get(getIssueById);
router.route("/issues/:id/follow").put(isAuthenticated, followIssue);
router
  .route("/issues/:id/ensure-discussion")
  .post(isAuthenticated, ensureIssueDiscussion);

module.exports = router;

const router = require("express").Router();
const {
  getPending,
  approveNews,
  approveEvent,
  removePost,
  getAnalytics,
} = require("../controllers/admin.controllers");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

router.use(isAuthenticated, authorizeAdmin);

router.route("/admin/pending").get(getPending);
router.route("/admin/analytics").get(getAnalytics);
router.route("/admin/news/:id/approve").put(approveNews);
router.route("/admin/events/:id/approve").put(approveEvent);
router.route("/admin/posts/:id").delete(removePost);

module.exports = router;

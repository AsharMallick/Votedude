const router = require("express").Router();
const {
  getPending,
  getAnalytics,
  approveNews,
  approveEvent,
  approvePost,
  approvePetition,
  removePost,
  deleteNews,
  deleteEvent,
  deletePetition,
  deleteLaw,
  deletePoll,
  deleteCandidate,
} = require("../controllers/admin.controllers");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

router.use(isAuthenticated, authorizeAdmin);

router.route("/admin/pending").get(getPending);
router.route("/admin/analytics").get(getAnalytics);

router.route("/admin/news/:id/approve").put(approveNews);
router.route("/admin/events/:id/approve").put(approveEvent);
router.route("/admin/posts/:id/approve").put(approvePost);
router.route("/admin/petitions/:id/approve").put(approvePetition);

router.route("/admin/news/:id").delete(deleteNews);
router.route("/admin/events/:id").delete(deleteEvent);
router.route("/admin/posts/:id").delete(removePost); // already had this
router.route("/admin/petitions/:id").delete(deletePetition);
router.route("/admin/laws/:id").delete(deleteLaw);
router.route("/admin/polls/:id").delete(deletePoll);
router.route("/admin/candidates/:id").delete(deleteCandidate);

module.exports = router;

const router = require("express").Router();
const {
  getLaws,
  getLawById,
  createLaw,
  updateLaw,
  ensureLawDiscussion,
} = require("../controllers/law.controllers");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

router
  .route("/laws")
  .get(getLaws)
  .post(isAuthenticated, authorizeAdmin, createLaw);
router.route("/laws/search").post(getLaws);
router
  .route("/laws/:id")
  .get(getLawById)
  .put(isAuthenticated, authorizeAdmin, updateLaw);
router
  .route("/laws/:id/ensure-discussion")
  .post(isAuthenticated, ensureLawDiscussion);

module.exports = router;

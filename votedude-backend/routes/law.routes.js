const router = require("express").Router();
const {
  getLaws,
  getLawById,
  createLaw,
  updateLaw,
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

module.exports = router;

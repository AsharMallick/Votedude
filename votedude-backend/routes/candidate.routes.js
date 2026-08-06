const router = require("express").Router();
const {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
} = require("../controllers/candidate.controllers");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

router
  .route("/candidates")
  .get(getCandidates)
  .post(isAuthenticated, authorizeAdmin, createCandidate);
router.route("/candidates/search").post(getCandidates);
router
  .route("/candidates/:id")
  .get(getCandidateById)
  .put(isAuthenticated, authorizeAdmin, updateCandidate);

module.exports = router;

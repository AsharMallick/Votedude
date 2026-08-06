const router = require("express").Router();
const {
  getPetitions,
  getPetitionById,
  createPetition,
  signPetition,
} = require("../controllers/petition.controllers");
const { isAuthenticated } = require("../middlewares/auth");

router
  .route("/petitions")
  .get(getPetitions)
  .post(isAuthenticated, createPetition);
router.route("/petitions/search").post(getPetitions);
router.route("/petitions/:id").get(getPetitionById);
router.route("/petitions/:id/sign").put(isAuthenticated, signPetition);

module.exports = router;

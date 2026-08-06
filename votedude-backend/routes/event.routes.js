const router = require("express").Router();
const {
  getEvents,
  getEventById,
  createEvent,
  rsvpEvent,
  addComment,
} = require("../controllers/event.controllers");
const { isAuthenticated } = require("../middlewares/auth");

router.route("/events").get(getEvents).post(isAuthenticated, createEvent);
router.route("/events/search").post(getEvents);
router.route("/events/:id").get(getEventById);
router.route("/events/:id/rsvp").put(isAuthenticated, rsvpEvent);
router.route("/events/:id/comment").post(isAuthenticated, addComment);

module.exports = router;

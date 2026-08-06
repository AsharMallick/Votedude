const router = require("express").Router();
const {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notification.controllers");
const { isAuthenticated } = require("../middlewares/auth");

router.route("/notifications").get(isAuthenticated, getMyNotifications);
router.route("/notifications/read-all").put(isAuthenticated, markAllAsRead);
router.route("/notifications/:id/read").put(isAuthenticated, markAsRead);

module.exports = router;

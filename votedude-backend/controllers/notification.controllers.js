const Notification = require("../models/Notification.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.getMyNotifications = catchAsyncError(async (req, res, next) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json({ success: true, notifications });
});

exports.markAsRead = catchAsyncError(async (req, res, next) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { read: true },
    { new: true }
  );

  if (!notification) {
    return next(new ErrorHandler("Notification not found", 404));
  }

  res.status(200).json({ success: true, notification });
});

exports.markAllAsRead = catchAsyncError(async (req, res, next) => {
  await Notification.updateMany(
    { user: req.user._id, read: false },
    { read: true }
  );

  res.status(200).json({ success: true, message: "All notifications marked as read" });
});

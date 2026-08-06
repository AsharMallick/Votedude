const News = require("../models/News.model");
const Event = require("../models/Event.model");
const User = require("../models/User.model");
const { Post } = require("../models/Discuss.model");
const Petition = require("../models/Petition.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.getPending = catchAsyncError(async (req, res, next) => {
  const [pendingNews, pendingEvents] = await Promise.all([
    News.find({ status: "pending" }),
    Event.find({ status: "pending" }).populate("organizer", "name"),
  ]);

  res.status(200).json({ success: true, pendingNews, pendingEvents });
});

exports.approveNews = catchAsyncError(async (req, res, next) => {
  const news = await News.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
  if (!news) return next(new ErrorHandler("Article not found", 404));

  res.status(200).json({ success: true, news });
});

exports.approveEvent = catchAsyncError(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
  if (!event) return next(new ErrorHandler("Event not found", 404));

  res.status(200).json({ success: true, event });
});

exports.removePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return next(new ErrorHandler("Post not found", 404));

  res.status(200).json({ success: true, message: "Post removed" });
});

exports.getAnalytics = catchAsyncError(async (req, res, next) => {
  const [userCount, newsCount, eventCount, postCount, petitionCount] = await Promise.all([
    User.countDocuments(),
    News.countDocuments(),
    Event.countDocuments({ status: "approved" }),
    Post.countDocuments(),
    Petition.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    analytics: { userCount, newsCount, eventCount, postCount, petitionCount },
  });
});

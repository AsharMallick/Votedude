const News = require("../models/News.model");
const Event = require("../models/Event.model");
const User = require("../models/User.model");
const { Post } = require("../models/Discuss.model");
const Petition = require("../models/Petition.model");
const Law = require("../models/Law.model");
const Poll = require("../models/Poll.model");
const Candidate = require("../models/Candidate.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.getPending = catchAsyncError(async (req, res, next) => {
  const news = await News.aggregate([
    {
      $addFields: {
        pendingFirst: {
          $cond: [{ $eq: ["$status", "pending"] }, 0, 1],
        },
      },
    },
    {
      $sort: {
        pendingFirst: 1,
        createdAt: -1,
      },
    },
    {
      $project: {
        pendingFirst: 0,
      },
    },
  ]);
  const events = await Event.aggregate([
    {
      $addFields: {
        pendingFirst: {
          $cond: [{ $eq: ["$status", "pending"] }, 0, 1],
        },
      },
    },
    {
      $sort: {
        pendingFirst: 1,
        createdAt: -1,
      },
    },
    {
      $project: {
        pendingFirst: 0,
      },
    },
  ]);
  const posts = await Post.aggregate([
    {
      $addFields: {
        pendingFirst: {
          $cond: [{ $eq: ["$status", "pending"] }, 0, 1],
        },
      },
    },
    {
      $sort: {
        pendingFirst: 1,
        createdAt: -1,
      },
    },
    {
      $project: {
        pendingFirst: 0,
      },
    },
  ]);
  const petition = await Petition.aggregate([
    {
      $addFields: {
        pendingFirst: {
          $cond: [{ $eq: ["$status", "pending"] }, 0, 1],
        },
      },
    },
    {
      $sort: {
        pendingFirst: 1,
        createdAt: -1,
      },
    },
    {
      $project: {
        pendingFirst: 0,
      },
    },
  ]);
  const [pendingNews, pendingEvents, allPosts, petitions] = await Promise.all([
    await News.populate(news, {
      path: "author",
    }),
    await Event.populate(events, {
      path: "organizer",
    }),
    await Post.populate(posts, {
      path: "author",
    }),
    await Petition.populate(petition, {
      path: "author",
    }),
  ]);

  res
    .status(200)
    .json({ success: true, pendingNews, pendingEvents, allPosts, petitions });
});

exports.approveNews = catchAsyncError(async (req, res, next) => {
  const news = await News.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true },
  );
  if (!news) return next(new ErrorHandler("Article not found", 404));

  res.status(200).json({ success: true, news });
});

exports.approveEvent = catchAsyncError(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true },
  );
  if (!event) return next(new ErrorHandler("Event not found", 404));

  res.status(200).json({ success: true, event });
});

exports.removePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return next(new ErrorHandler("Post not found", 404));

  res.status(200).json({ success: true, message: "Post removed" });
});

exports.getAnalytics = catchAsyncError(async (req, res, next) => {
  const [userCount, newsCount, eventCount, postCount, petitionCount] =
    await Promise.all([
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

exports.approvePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true },
  );
  if (!post) return next(new ErrorHandler("Post not found", 404));
  res.status(200).json({ success: true, post });
});

exports.approvePetition = catchAsyncError(async (req, res, next) => {
  const petition = await Petition.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true },
  );
  if (!petition) return next(new ErrorHandler("petition not found", 404));
  res.status(200).json({ success: true, petition });
});
exports.deleteNews = catchAsyncError(async (req, res, next) => {
  const item = await News.findByIdAndDelete(req.params.id);
  if (!item) return next(new ErrorHandler("Article not found", 404));
  res.status(200).json({ success: true, message: "News deleted" });
});

exports.deleteEvent = catchAsyncError(async (req, res, next) => {
  const item = await Event.findByIdAndDelete(req.params.id);
  if (!item) return next(new ErrorHandler("Event not found", 404));
  res.status(200).json({ success: true, message: "Event deleted" });
});

// posts: you already have removePost — keep it

exports.deletePetition = catchAsyncError(async (req, res, next) => {
  const item = await Petition.findByIdAndDelete(req.params.id);
  if (!item) return next(new ErrorHandler("Petition not found", 404));
  res.status(200).json({ success: true, message: "Petition deleted" });
});

exports.deleteLaw = catchAsyncError(async (req, res, next) => {
  const item = await Law.findByIdAndDelete(req.params.id);
  if (!item) return next(new ErrorHandler("Law not found", 404));
  res.status(200).json({ success: true, message: "Law deleted" });
});

exports.deletePoll = catchAsyncError(async (req, res, next) => {
  const item = await Poll.findByIdAndDelete(req.params.id);
  if (!item) return next(new ErrorHandler("Poll not found", 404));
  res.status(200).json({ success: true, message: "Poll deleted" });
});

exports.deleteCandidate = catchAsyncError(async (req, res, next) => {
  const item = await Candidate.findByIdAndDelete(req.params.id);
  if (!item) return next(new ErrorHandler("Candidate not found", 404));
  res.status(200).json({ success: true, message: "Candidate deleted" });
});

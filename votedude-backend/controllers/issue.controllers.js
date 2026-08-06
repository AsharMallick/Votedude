const Issue = require("../models/Issue.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.getIssues = catchAsyncError(async (req, res, next) => {
  const { search, trend } = req.body || {};
  const filter = {};

  if (trend) filter.trend = trend;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { summary: { $regex: search, $options: "i" } },
    ];
  }

  const issues = await Issue.find(filter).sort({ followerCount: -1 });
  res.status(200).json({ success: true, issues });
});

exports.getIssueById = catchAsyncError(async (req, res, next) => {
  const issue = await Issue.findById(req.params.id)
    .populate("relatedNews")
    .populate("relatedCandidates");
  if (!issue) return next(new ErrorHandler("Issue not found", 404));

  res.status(200).json({ success: true, issue });
});

exports.createIssue = catchAsyncError(async (req, res, next) => {
  const issue = await Issue.create(req.body);
  res.status(201).json({ success: true, issue });
});

exports.followIssue = catchAsyncError(async (req, res, next) => {
  const issue = await Issue.findByIdAndUpdate(
    req.params.id,
    { $inc: { followerCount: 1 } },
    { new: true }
  );
  if (!issue) return next(new ErrorHandler("Issue not found", 404));

  res.status(200).json({ success: true, followerCount: issue.followerCount });
});

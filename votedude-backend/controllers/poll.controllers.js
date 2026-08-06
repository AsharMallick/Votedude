const Poll = require("../models/Poll.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { awardPoints } = require("../utils/gamification");

exports.getPolls = catchAsyncError(async (req, res, next) => {
  const polls = await Poll.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, polls });
});

exports.getFeaturedPoll = catchAsyncError(async (req, res, next) => {
  const poll = await Poll.findOne({ isFeatured: true }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, poll });
});

exports.createPoll = catchAsyncError(async (req, res, next) => {
  const { question, options, isFeatured } = req.body;

  if (!question || !options || !Array.isArray(options) || options.length < 2) {
    return next(
      new ErrorHandler("Question and at least 2 options are required", 400)
    );
  }

  const poll = await Poll.create({
    question,
    options: options.map((text) =>
      typeof text === "string" ? { text, voteCount: 0 } : text
    ),
    isFeatured: !!isFeatured,
  });

  res.status(201).json({ success: true, poll });
});

exports.vote = catchAsyncError(async (req, res, next) => {
  const { optionIndex } = req.body;

  if (optionIndex === undefined || optionIndex === null) {
    return next(new ErrorHandler("optionIndex is required", 400));
  }

  const poll = await Poll.findById(req.params.id);
  if (!poll) return next(new ErrorHandler("Poll not found", 404));

  const alreadyVoted = poll.votedUsers.some(
    (id) => String(id) === String(req.user._id)
  );
  if (alreadyVoted) {
    return next(new ErrorHandler("You already voted on this poll", 400));
  }

  if (optionIndex < 0 || optionIndex >= poll.options.length) {
    return next(new ErrorHandler("Invalid option", 400));
  }

  poll.options[optionIndex].voteCount += 1;
  poll.votedUsers.push(req.user._id);
  await poll.save();
  await awardPoints(req.user, "VOTE_POLL");

  res.status(200).json({ success: true, poll });
});

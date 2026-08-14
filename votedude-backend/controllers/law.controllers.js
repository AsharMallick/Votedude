const Law = require("../models/Law.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { createLinkedDiscussion } = require("../utils/createLinkedDiscussion");

exports.getLaws = catchAsyncError(async (req, res, next) => {
  const { search, status, chamber } = req.body || {};
  const filter = {};

  if (status) filter.status = status;
  if (chamber) filter.chamber = chamber;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { billNumber: { $regex: search, $options: "i" } },
      { summary: { $regex: search, $options: "i" } },
    ];
  }

  const laws = await Law.find(filter).sort({ updatedAt: -1 });
  res.status(200).json({ success: true, laws });
});

exports.getLawById = catchAsyncError(async (req, res, next) => {
  const law = await Law.findById(req.params.id).populate("discussionPost");
  if (!law) return next(new ErrorHandler("Bill not found", 404));

  res.status(200).json({ success: true, law });
});

exports.createLaw = catchAsyncError(async (req, res, next) => {
  const law = await Law.create(req.body);
  res.status(201).json({ success: true, law });
});

exports.updateLaw = catchAsyncError(async (req, res, next) => {
  const law = await Law.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!law) return next(new ErrorHandler("Bill not found", 404));

  res.status(200).json({ success: true, law });
});

exports.ensureLawDiscussion = catchAsyncError(async (req, res, next) => {
  const law = await Law.findById(req.params.id);
  if (!law) return next(new ErrorHandler("Bill not found", 404));

  if (law.discussionPost) {
    return res.status(200).json({ success: true, postId: law.discussionPost });
  }

  const post = await createLinkedDiscussion({
    title: law.title,
    content: law.summary,
    authorId: req.user._id,
    related: { relatedLaw: law._id },
    type: "Law",
  });
  law.discussionPost = post._id;
  await law.save();

  res.status(200).json({ success: true, postId: post._id });
});

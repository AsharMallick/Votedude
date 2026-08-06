const { Post, Reply } = require("../models/Discuss.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { awardPoints } = require("../utils/gamification");

exports.getPosts = catchAsyncError(async (req, res, next) => {
  const { search, category } = req.body || {};
  const filter = {};

  if (category) filter.category = category;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const posts = await Post.find(filter)
    .sort({ createdAt: -1 })
    .populate("author", "name photo");

  res.status(200).json({ success: true, posts });
});

exports.getPostById = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "name photo"
  );
  if (!post) return next(new ErrorHandler("Post not found", 404));

  const replies = await Reply.find({ post: post._id })
    .populate("author", "name photo")
    .sort({ createdAt: 1 });

  res.status(200).json({ success: true, post, replies });
});

exports.createPost = catchAsyncError(async (req, res, next) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return next(new ErrorHandler("Title, content and category are required", 400));
  }

  const post = await Post.create({
    title,
    content,
    category,
    author: req.user._id,
  });

  await awardPoints(req.user, "COMMENT");

  res.status(201).json({ success: true, post });
});

exports.addReply = catchAsyncError(async (req, res, next) => {
  const { content } = req.body;
  if (!content) return next(new ErrorHandler("Reply content is required", 400));

  const post = await Post.findById(req.params.id);
  if (!post) return next(new ErrorHandler("Post not found", 404));

  const reply = await Reply.create({
    post: post._id,
    author: req.user._id,
    content,
  });

  post.replyCount = (post.replyCount || 0) + 1;
  await post.save();
  await awardPoints(req.user, "COMMENT");

  res.status(201).json({ success: true, reply });
});

exports.toggleLike = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new ErrorHandler("Post not found", 404));

  const alreadyLiked = post.likes.some(
    (id) => String(id) === String(req.user._id)
  );

  if (alreadyLiked) {
    post.likes.pull(req.user._id);
  } else {
    post.likes.push(req.user._id);
  }
  await post.save();

  res.status(200).json({ success: true, likes: post.likes.length });
});

exports.reportPost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $inc: { reportCount: 1 } },
    { new: true }
  );
  if (!post) return next(new ErrorHandler("Post not found", 404));

  res.status(200).json({ success: true, reportCount: post.reportCount });
});

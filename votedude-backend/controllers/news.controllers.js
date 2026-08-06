const News = require("../models/News.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.getNews = catchAsyncError(async (req, res, next) => {
  const { search, category } = req.body || {};
  const filter = { status: "approved" };

  if (category) filter.category = category;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const news = await News.find(filter)
    .sort({ createdAt: -1 })
    .populate("author", "name photo");

  res.status(200).json({
    success: true,
    news,
  });
});

exports.getNewsById = catchAsyncError(async (req, res, next) => {
  const article = await News.findById(req.params.id).populate(
    "author",
    "name photo"
  );
  if (!article) return next(new ErrorHandler("Article not found", 404));

  res.status(200).json({
    success: true,
    article,
  });
});

exports.createNews = catchAsyncError(async (req, res, next) => {
  const { title, content, category, image } = req.body;

  if (!title || !content || !category) {
    return next(new ErrorHandler("Title, content and category are required", 400));
  }

  const article = await News.create({
    title,
    content,
    category,
    image: image || "",
    author: req.user._id,
    status: "approved",
  });

  res.status(201).json({
    success: true,
    article,
  });
});

exports.toggleLike = catchAsyncError(async (req, res, next) => {
  const article = await News.findById(req.params.id);
  if (!article) return next(new ErrorHandler("Article not found", 404));

  const alreadyLiked = article.likes.some(
    (id) => String(id) === String(req.user._id)
  );

  if (alreadyLiked) {
    article.likes.pull(req.user._id);
  } else {
    article.likes.push(req.user._id);
  }
  await article.save();

  res.status(200).json({
    success: true,
    likes: article.likes.length,
  });
});

exports.addComment = catchAsyncError(async (req, res, next) => {
  const { text } = req.body;
  if (!text) return next(new ErrorHandler("Comment text is required", 400));

  const article = await News.findById(req.params.id);
  if (!article) return next(new ErrorHandler("Article not found", 404));

  article.comments.push({ user: req.user._id, text });
  await article.save();

  res.status(201).json({
    success: true,
    comments: article.comments,
  });
});

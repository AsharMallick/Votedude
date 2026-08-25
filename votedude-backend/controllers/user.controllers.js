const User = require("../models/User.model");
const { Team } = require("../models/Sports.model");
const Event = require("../models/Event.model");
const { Post } = require("../models/Discuss.model");
const Poll = require("../models/Poll.model");
const Petition = require("../models/Petition.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { awardPoints } = require("../utils/gamification");

exports.register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, city } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Name, email and password are required", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(
      new ErrorHandler("An account with this email already exists", 400),
    );
  }

  user = await User.create({
    name,
    email,
    password,
    city: city || "",
    provider: "local",
  });

  await awardPoints(user, "REGISTER");

  const token = await user.generateToken();

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    .json({
      success: true,
      user,
      token,
    });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.password) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await user.passwordCompare(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = await user.generateToken();

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    .json({
      success: true,
      user,
      token,
    });
});

exports.logout = catchAsyncError(async (req, res) => {
  // clear cookie no matter how it was set
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.clearCookie("token");

  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
    maxAge: 0,
  });

  res.status(200).json({ success: true, message: "Logged out" });
});

exports.getMyDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.getProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id).select(
    "name email photo city points badges role createdAt",
  );
  if (!user) return next(new ErrorHandler("User not found", 404));

  const [teamsJoined, eventsAttended, postsCount, pollsVoted, petitionsSigned] =
    await Promise.all([
      Team.countDocuments({ players: user._id }),
      Event.countDocuments({ rsvpList: user._id }),
      Post.countDocuments({ author: user._id }),
      Poll.countDocuments({ votedUsers: user._id }),
      Petition.countDocuments({ signedUsers: user._id }),
    ]);

  res.status(200).json({
    success: true,
    user,
    activity: {
      teamsJoined,
      eventsAttended,
      postsCount,
      pollsVoted,
      petitionsSigned,
    },
  });
});

exports.getLeaderboard = catchAsyncError(async (req, res, next) => {
  const { city } = req.body;
  const filter = city ? { city } : {};

  const leaders = await User.find(filter)
    .select("name city points badges photo")
    .sort({ points: -1 })
    .limit(50);

  res.status(200).json({
    success: true,
    leaders,
  });
});

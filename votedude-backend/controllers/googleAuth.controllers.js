const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { awardPoints } = require("../utils/gamification");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = catchAsyncError(async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return next(new ErrorHandler("Google token is required", 400));
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    return next(new ErrorHandler("Google auth is not configured", 501));
  }

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { sub, email, name, picture } = payload;

  if (!email) {
    return next(new ErrorHandler("Unable to get email from Google", 400));
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name: name || email.split("@")[0],
      email,
      googleId: sub,
      provider: "google",
      photo: picture || "",
    });
    await awardPoints(user, "REGISTER");
  } else if (!user.googleId) {
    user.googleId = sub;
    user.provider = user.password ? user.provider : "google";
    if (picture && !user.photo) user.photo = picture;
    await user.save();
  }

  const jwtToken = await user.generateToken();

  res
    .status(200)
    .cookie("token", jwtToken, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
    })
    .json({
      success: true,
      user,
      token: jwtToken,
    });
});

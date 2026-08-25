const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticated = async (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorHandler("Please login first", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 401));
    }

    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};

exports.authorizeAdmin = async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        `${req.user ? req.user.role : "Guest"} is not allowed`,
        403,
      ),
    );
  }
  next();
};

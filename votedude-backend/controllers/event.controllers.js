const Event = require("../models/Event.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { awardPoints } = require("../utils/gamification");

exports.getEvents = catchAsyncError(async (req, res, next) => {
  const { search, category } = req.body || {};
  const filter = { status: "approved" };

  if (category) filter.category = category;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  const events = await Event.find(filter)
    .sort({ date: 1 })
    .populate("organizer", "name photo");

  res.status(200).json({
    success: true,
    events,
  });
});

exports.getEventById = catchAsyncError(async (req, res, next) => {
  const event = await Event.findById(req.params.id).populate(
    "organizer",
    "name photo"
  );
  if (!event) return next(new ErrorHandler("Event not found", 404));

  res.status(200).json({
    success: true,
    event,
  });
});

exports.createEvent = catchAsyncError(async (req, res, next) => {
  const { title, description, category, date, location, image } = req.body;

  if (!title || !description || !category || !date || !location) {
    return next(
      new ErrorHandler(
        "Title, description, category, date and location are required",
        400
      )
    );
  }

  const event = await Event.create({
    title,
    description,
    category,
    date,
    location,
    image: image || "",
    organizer: req.user._id,
    status: "pending",
  });

  res.status(201).json({
    success: true,
    message: "Event submitted for admin approval",
    event,
  });
});

exports.rsvpEvent = catchAsyncError(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) return next(new ErrorHandler("Event not found", 404));

  const alreadyRsvpd = event.rsvpList.some(
    (id) => String(id) === String(req.user._id)
  );

  if (alreadyRsvpd) {
    event.rsvpList.pull(req.user._id);
  } else {
    event.rsvpList.push(req.user._id);
    await awardPoints(req.user, "ATTEND_EVENT");
  }
  await event.save();

  res.status(200).json({
    success: true,
    joined: !alreadyRsvpd,
    rsvpCount: event.rsvpList.length,
  });
});

exports.addComment = catchAsyncError(async (req, res, next) => {
  const { text } = req.body;
  if (!text) return next(new ErrorHandler("Comment text is required", 400));

  const event = await Event.findById(req.params.id);
  if (!event) return next(new ErrorHandler("Event not found", 404));

  event.comments.push({ user: req.user._id, text });
  await event.save();

  res.status(201).json({
    success: true,
    comments: event.comments,
  });
});

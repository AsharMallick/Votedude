const Petition = require("../models/Petition.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.getPetitions = catchAsyncError(async (req, res, next) => {
  const { search, category } = req.body || {};
  const filter = {};

  if (category) filter.category = category;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const petitions = await Petition.find(filter)
    .sort({ createdAt: -1 })
    .populate("createdBy", "name photo");

  res.status(200).json({ success: true, petitions });
});

exports.getPetitionById = catchAsyncError(async (req, res, next) => {
  const petition = await Petition.findById(req.params.id).populate(
    "createdBy",
    "name photo"
  );
  if (!petition) return next(new ErrorHandler("Petition not found", 404));

  res.status(200).json({ success: true, petition });
});

exports.createPetition = catchAsyncError(async (req, res, next) => {
  const { title, description, category, goal } = req.body;

  if (!title || !description || !goal) {
    return next(
      new ErrorHandler("Title, description and goal are required", 400)
    );
  }

  const petition = await Petition.create({
    title,
    description,
    category: category || "",
    goal,
    createdBy: req.user._id,
    signedUsers: [],
  });

  res.status(201).json({ success: true, petition });
});

exports.signPetition = catchAsyncError(async (req, res, next) => {
  const petition = await Petition.findById(req.params.id);
  if (!petition) return next(new ErrorHandler("Petition not found", 404));

  const alreadySigned = petition.signedUsers.some(
    (id) => String(id) === String(req.user._id)
  );

  if (alreadySigned) {
    return next(new ErrorHandler("You already signed this petition", 400));
  }

  petition.signedUsers.push(req.user._id);
  await petition.save();

  res.status(200).json({
    success: true,
    signatureCount: petition.signedUsers.length,
  });
});

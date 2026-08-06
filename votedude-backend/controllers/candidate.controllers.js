const Candidate = require("../models/Candidate.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

exports.getCandidates = catchAsyncError(async (req, res, next) => {
  const { search, office, city, district } = req.body || {};
  const filter = {};

  if (office) filter.office = office;
  if (city) filter.city = city;
  if (district) filter.district = district;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { office: { $regex: search, $options: "i" } },
      { city: { $regex: search, $options: "i" } },
      { district: { $regex: search, $options: "i" } },
    ];
  }

  const candidates = await Candidate.find(filter).sort({ name: 1 });

  res.status(200).json({ success: true, candidates });
});

exports.getCandidateById = catchAsyncError(async (req, res, next) => {
  const candidate = await Candidate.findById(req.params.id);
  if (!candidate) return next(new ErrorHandler("Candidate not found", 404));

  res.status(200).json({ success: true, candidate });
});

exports.createCandidate = catchAsyncError(async (req, res, next) => {
  const candidate = await Candidate.create(req.body);
  res.status(201).json({ success: true, candidate });
});

exports.updateCandidate = catchAsyncError(async (req, res, next) => {
  const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!candidate) return next(new ErrorHandler("Candidate not found", 404));

  res.status(200).json({ success: true, candidate });
});

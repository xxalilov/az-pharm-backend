const Enroll = require("../models/Enroll");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc    GET Enrols for admin
 * @route   GET /admin/enrolls
 * @access  Private
 */
exports.getEnrolls = asyncHandler(async (req, res, next) => {
  const enrolls = await Enroll.find();

  res.render("admin/enroll", {
    path: "/admin/enrolls",
    pageTitle: "Enrolls",
    enrolls: enrolls,
  });
});

/**
 * @desc    GET Enroll
 * @route   GET api/v1/admin/enrols/:enrollId
 * @access  Private
 */
exports.getEnroll = asyncHandler(async (req, res, next) => {
  const enroll = await Enroll.findById(req.params.id);

  if (!enroll) {
    return next(new ErrorResponse("Enroll not found that id", 404));
  }

  res.status(200).json({
    success: true,
    data: enroll,
  });
});

/**
 * @desc    Create enroll
 * @route   POST api/v1/enrolls
 * @access  Public
 */
exports.createEnroll = asyncHandler(async (req, res, next) => {
  const enroll = await Enroll.create(req.body);

  res.status(201).json({
    success: true,
    data: enroll,
  });
});

/**
 * @desc    DELETE Enroll
 * @route   DELETE api/v1/admin/enrolls/:enrollId
 * @access  Private
 */
exports.deleteEnroll = asyncHandler(async (req, res, next) => {
  let enroll = await Enroll.findById(req.params.id);

  if (!enroll) {
    return next(new ErrorResponse("Slide not found that id", 404));
  }

  enroll.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

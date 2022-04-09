const About = require("../models/About");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { aboutSchema } = require("../utils/validator");

/**
 * @desc    GET About for admin
 * @route   GET /admin/about
 * @access  Private
 */
exports.getAbout = asyncHandler(async (req, res, next) => {
  const about = await About.find();

  res.render("admin/about", {
    path: "/admin/about",
    pageTitle: "About",
    about: about,
  });
});

/**
 * @desc    GET About
 * @route   GET api/v1/admin/about
 * @access  Private
 */
exports.getAboutJson = asyncHandler(async (req, res, next) => {
  const about = await About.findOne();

  if (!about) {
    return next(new ErrorResponse("About not found", 404));
  }

  res.status(200).json({
    success: true,
    data: about,
  });
});

/**
 * @desc    Create about
 * @route   POST api/v1/admin/about
 * @access  Private
 */
exports.createAbout = asyncHandler(async (req, res, next) => {
  const { error } = await aboutSchema.validate(req.body);

  if (error) {
    return next(new ErrorResponse(error, 400));
  }

  const about = await About.create(req.body);

  res.status(201).json({
    success: true,
    data: about,
  });
});

/**
 * @desc    Update About
 * @route   PUT api/v1/admin/about
 * @access  Private
 */
exports.updateAbout = asyncHandler(async (req, res, next) => {
  let about = await About.findOne();

  if (!about) {
    return next(new ErrorResponse("About not found", 404));
  }

  const { error } = await aboutSchema.validate(req.body);

  if (error) {
    return next(new ErrorResponse(error, 400));
  }

  about = await About.findByIdAndUpdate(about._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: about,
  });
});

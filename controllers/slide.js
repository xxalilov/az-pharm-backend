const Slide = require("../models/Slide");
const asyncHandler = require("../middleware/async");
const { deleteFile } = require("../utils/file");
const ErrorResponse = require("../utils/errorResponse");
const { slideSchema } = require("../utils/validator");

/**
 * @desc    GET Slides for admin
 * @route   GET /admin/slides
 * @access  Private
 */
exports.getSlides = asyncHandler(async (req, res, next) => {
  const slides = await Slide.find();

  res.render("admin/slides", {
    path: "/admin/slides",
    pageTitle: "Slides",
    slides: slides,
  });
});

/**
 * @desc    GET Slide
 * @route   GET api/v1/admin/slides/:slideId
 * @access  Private
 */
exports.getSlide = asyncHandler(async (req, res, next) => {
  const slide = await Slide.findById(req.params.id);

  if (!slide) {
    return next(new ErrorResponse("Slide not found that id", 404));
  }

  res.status(200).json({
    success: true,
    data: slide,
  });
});

/**
 * @desc    Create slide
 * @route   POST api/v1/admin/slides
 * @access  Private
 */
exports.createSlide = asyncHandler(async (req, res, next) => {
  const file = req.file;

  console.log(file);

  if (!file) {
    req.body.image = undefined;
  } else {
    req.body.image = file.path;
  }

  const { error } = await slideSchema.validate(req.body);

  if (error) {
    return next(new ErrorResponse(error, 400));
  }

  const slides = await Slide.create(req.body);

  res.status(201).json({
    success: true,
    data: slides,
  });
});

/**
 * @desc    Update
 * @route   PUT api/v1/admin/slides/:slideId
 * @access  Private
 */
exports.updateSlide = asyncHandler(async (req, res, next) => {
  const file = req.file;
  let slide = await Slide.findById(req.params.id);

  if (!slide) {
    return next(new ErrorResponse("Slide not found that id", 404));
  }
  if (!file) {
    req.body.image = slide.image;
  } else {
    req.body.image = file.path;
    deleteFile(slide.image);
  }

  const { error } = await slideSchema.validate(req.body);

  if (error) {
    return next(new ErrorResponse(error, 400));
  }

  slide = await Slide.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: slide,
  });
});

/**
 * @desc    DELETE Slide
 * @route   DELETE api/v1/admin/slides/:slideId
 * @access  Private
 */
exports.deleteSlide = asyncHandler(async (req, res, next) => {
  let slide = await Slide.findById(req.params.id);

  if (!slide) {
    return next(new ErrorResponse("Slide not found that id", 404));
  }

  deleteFile(slide.image);

  slide.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

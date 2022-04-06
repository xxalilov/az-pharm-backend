const Slide = require("../models/Slide");
const asyncHandler = require("../middleware/async");

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
 * @desc    Create slide
 * @route   PUT api/v1/admin/slides
 * @access  Private
 */
exports.createSlide = asyncHandler(async (req, res, next) => {
  let slides = await Slide.create(req.body);

  res.status(201).json({
    success: true,
    data: slides,
  });
});

const Feedback = require("../models/Feedback");
const asyncHandler = require("../middleware/async");
const { deleteFile } = require("../utils/file");
const ErrorResponse = require("../utils/errorResponse");
const { feedbackSchema } = require("../utils/validator");

/**
 * @desc    GET Feedbacks for admin
 * @route   GET /admin/feedbacks
 * @access  Private
 */
exports.getFeedbacks = asyncHandler(async (req, res, next) => {
  const feedbacks = await Feedback.find();

  res.render("admin/feedback", {
    path: "/admin/feedbacks",
    pageTitle: "Feedbacks",
    feedbacks: feedbacks,
  });
});

/**
 * @desc    GET Feedback
 * @route   GET api/v1/admin/feedbacks/:feedbackId
 * @access  Private
 */
exports.getFeedback = asyncHandler(async (req, res, next) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    return next(new ErrorResponse("Feedback not found that id", 404));
  }

  res.status(200).json({
    success: true,
    data: feedback,
  });
});

/**
 * @desc    Create Feedback
 * @route   POST api/v1/admin/feedbacks
 * @access  Private
 */
exports.createFeedback = asyncHandler(async (req, res, next) => {
  const file = req.file;

  if (!file) {
    req.body.image = undefined;
  } else {
    req.body.image = file.path;
  }

  const { error } = await feedbackSchema.validate(req.body);

  if (error) {
    return next(new ErrorResponse(error, 400));
  }

  const feedbacks = await Feedback.create(req.body);

  res.status(201).json({
    success: true,
    data: feedbacks,
  });
});

/**
 * @desc    Update Feedback
 * @route   PUT api/v1/admin/feedbacks/:feedbackId
 * @access  Private
 */
exports.updateFeedback = asyncHandler(async (req, res, next) => {
  const file = req.file;
  let feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    return next(new ErrorResponse("Feedback not found that id", 404));
  }
  if (!file) {
    req.body.image = feedback.image;
  } else {
    req.body.image = file.path;
    deleteFile(feedback.image);
  }

  const { error } = await feedbackSchema.validate(req.body);

  if (error) {
    return next(new ErrorResponse(error, 400));
  }

  feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: feedback,
  });
});

/**
 * @desc    DELETE Feedback
 * @route   DELETE api/v1/admin/feedbacks/:feedbackId
 * @access  Private
 */
exports.deleteFeedback = asyncHandler(async (req, res, next) => {
  let feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    return next(new ErrorResponse("Feedback not found that id", 404));
  }

  deleteFile(feedback.image);

  feedback.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

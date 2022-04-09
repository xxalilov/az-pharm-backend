const Gallery = require("../models/Gallery");
const asyncHandler = require("../middleware/async");
const { deleteFile } = require("../utils/file");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc    GET Gallery for admin
 * @route   GET /admin/gallery
 * @access  Private
 */
exports.getGallery = asyncHandler(async (req, res, next) => {
  const images = await Gallery.find();

  res.render("admin/gallery", {
    path: "/admin/gallery",
    pageTitle: "Gallery",
    gallery: images,
  });
});

/**
 * @desc    GET Image
 * @route   GET api/v1/admin/gallery/:imageId
 * @access  Private
 */
exports.getImage = asyncHandler(async (req, res, next) => {
  const image = await Gallery.findById(req.params.id);

  if (!image) {
    return next(new ErrorResponse("Image not found that id", 404));
  }

  res.status(200).json({
    success: true,
    data: image,
  });
});

/**
 * @desc    Add image
 * @route   POST api/v1/admin/galllery
 * @access  Private
 */
exports.addImage = asyncHandler(async (req, res, next) => {
  const file = req.file;

  if (!file) {
    return next(new ErrorResponse("Please input the file", 400));
  } else {
    req.body.image = file.path;
  }

  let image = await Gallery.create(req.body);

  res.status(201).json({
    success: true,
    data: image,
  });
});

/**
 * @desc    Update Image
 * @route   PUT api/v1/admin/gallery/:galleryId
 * @access  Private
 */
exports.updateImage = asyncHandler(async (req, res, next) => {
  const file = req.file;
  let image = await Gallery.findById(req.params.id);

  if (!image) {
    return next(new ErrorResponse("Image not found that id", 404));
  }
  if (!file) {
    return next(new ErrorResponse("Please input file", 400));
  } else {
    req.body.image = file.path;
    deleteFile(image.image);
  }

  image = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: image,
  });
});

/**
 * @desc    DELETE image
 * @route   DELETE api/v1/admin/gallery/:imageId
 * @access  Private
 */
exports.deleteImage = asyncHandler(async (req, res, next) => {
  let image = await Gallery.findById(req.params.id);

  if (!image) {
    return next(new ErrorResponse("Image not found that id", 404));
  }

  deleteFile(image.image);

  image.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

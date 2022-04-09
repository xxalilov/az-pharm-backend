const Home = require("../models/Home");
const About = require("../models/About");
const Feedback = require("../models/Feedback");
const Gallery = require("../models/Gallery");
const Slide = require("../models/Slide");
const asyncHandler = require("../middleware/async");

exports.getHome = asyncHandler(async (req, res, next) => {
  const home = await Home.findOne();
  const about = await About.find();
  const feedbacks = await Feedback.find();
  const gallery = await Gallery.find();
  const slides = await Slide.find();

  if (!home) {
    await Home.create({});
  }

  const homeDatas = {
    home,
    about,
    feedbacks,
    gallery,
    slides,
  };

  res.status(200).render("index", { title: "Az Pharm", data: homeDatas });
});

/**
 * @desc    Get Home For Admin
 * @route   GET /admin/dashboard
 * @access  Private
 */
exports.getHomeForAdmin = asyncHandler(async (req, res, next) => {
  const homeDatas = await Home.findOne();

  res.render("admin/dashboard", {
    pageTitle: "AZ-Pharm",
    path: "/admin/dashboard",
    homeDatas: homeDatas,
  });
});

/**
 * @desc    Update Home
 * @route   PUT api/v1/edit-header
 * @access  Private
 */
exports.updateHome = asyncHandler(async (req, res, next) => {
  let homeDatas = await Home.findOneAndUpdate(req.body);

  homeDatas = await Home.findOne();

  res.status(200).json({
    success: true,
    data: homeDatas,
  });
});

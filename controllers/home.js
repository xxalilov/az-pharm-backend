const Home = require("../models/Home");
const asyncHandler = require("../middleware/async");

exports.getHome = asyncHandler(async (req, res, next) => {
  const homeDatas = await Home.findOne();

  if (!homeDatas) {
    await Home.create({});
  }

  res.status(200).render("index", { title: "Az Pharm" });
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

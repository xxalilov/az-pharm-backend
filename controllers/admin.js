const Admin = require("../models/Admin");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const crypto = require("crypto");

/**
 * @desc    Get Login admin
 * @route   GET /admin/login
 * @access  Public
 */
exports.getLoginAdmin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Admin | Login",
  });
};

/**
 * @desc    Post Login admin
 * @route   POST api/v1/admin/login
 * @access  Public
 */
exports.postLoginAdmin = asyncHandler(async (req, res, next) => {
  const currentAdmin = await Admin.find();

  if (!currentAdmin || currentAdmin.length === 0) {
    const admin = await Admin.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
  }

  const admin = await Admin.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!admin) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await admin.matchPassword(req.body.password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(admin, 200, res);
});

/**
 * @desc    Log out admin / clear cookie
 * @route   GET /api/v1/admin/logout
 * @access  Private
 */
exports.logoutAdmin = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (admin, statusCode, res) => {
  // Create token
  const token = admin.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: token,
      },
    });
};

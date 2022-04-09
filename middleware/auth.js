const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const asyncHandler = require("./async");

// Protect Admin routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer in header
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    // Set token from cookie
    token = req.cookies.token;
  }

  // Make sure token exist
  if (!token) {
    return res.redirect("/");
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.redirect("/");
    }
    req.admin = admin;

    next();
  } catch (err) {
    return res.redirect("/");
  }
});

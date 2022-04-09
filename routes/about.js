const express = require("express");

const {
  getAbout,
  createAbout,
  getAboutJson,
  updateAbout,
} = require("../controllers/about");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/about", protect, getAbout);

router
  .route("/api/v1/admin/about")
  .get(protect, getAboutJson)
  .post(protect, createAbout)
  .put(protect, updateAbout);

module.exports = router;

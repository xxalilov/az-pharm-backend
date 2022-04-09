const express = require("express");

const {
  getSlides,
  createSlide,
  updateSlide,
  getSlide,
  deleteSlide,
} = require("../controllers/slide");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/slides", protect, getSlides);

router.post("/api/v1/admin/slides", protect, createSlide);

router
  .route("/api/v1/admin/slides/:id")
  .get(protect, getSlide)
  .put(protect, updateSlide)
  .delete(protect, deleteSlide);

module.exports = router;

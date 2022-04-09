const express = require("express");

const {
  getGallery,
  addImage,
  deleteImage,
  getImage,
  updateImage,
} = require("../controllers/gallery");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/gallery", protect, getGallery);

router.post("/api/v1/admin/gallery", protect, addImage);

router
  .route("/api/v1/admin/gallery/:id")
  .get(protect, getImage)
  .put(protect, updateImage)
  .delete(protect, deleteImage);

module.exports = router;

const express = require("express");

const {
  getFeedbacks,
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedback");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/feedbacks", protect, getFeedbacks);

router.post("/api/v1/admin/feedbacks", protect, createFeedback);

router
  .route("/api/v1/admin/feedbacks/:id")
  .get(protect, getFeedback)
  .put(protect, updateFeedback)
  .delete(protect, deleteFeedback);

module.exports = router;

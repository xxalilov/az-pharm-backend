const express = require("express");

const {
  getEnrolls,
  createEnroll,
  getEnroll,
  deleteEnroll,
} = require("../controllers/enroll");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/enrolls", protect, getEnrolls);

router.post("/api/v1/enrolls", createEnroll);

router
  .route("/api/v1/admin/enrolls/:id")
  .get(protect, getEnroll)
  .delete(protect, deleteEnroll);

module.exports = router;

const express = require("express");

const { getSlides, createSlide } = require("../controllers/slide");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/slides", getSlides);

router.post("/api/v1/admin/slides", createSlide);

module.exports = router;

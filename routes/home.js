const express = require("express");

const { getHome, getHomeForAdmin, updateHome } = require("../controllers/home");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getHome);
router.get("/admin/dashboard", protect, getHomeForAdmin);

router.put("/api/v1/edit-header", protect, updateHome);

module.exports = router;

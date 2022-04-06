const express = require("express");

const {
  getLoginAdmin,
  postLoginAdmin,
  logoutAdmin,
} = require("../controllers/admin");

const router = express.Router();

router.get("/admin/login", getLoginAdmin);
router.post("/api/v1/admin/login", postLoginAdmin);
router.get("/api/v1/admin/logout", logoutAdmin);

module.exports = router;

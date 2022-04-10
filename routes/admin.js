const express = require("express");

const {
  getLoginAdmin,
  postLoginAdmin,
  logoutAdmin,
  getAdmin,
  updateAdminDetails,
  updatePassword,
  getAdminPage,
} = require("../controllers/admin");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/login", getLoginAdmin);

router.get("/admin", getAdminPage);

router.get("/admin/me", protect, getAdmin);

router.post("/api/v1/admin/login", postLoginAdmin);
router.get("/api/v1/admin/logout", protect, logoutAdmin);

router.put("/api/v1/admin/updatedetails", protect, updateAdminDetails);
router.put("/api/v1/admin/updatepassword", protect, updatePassword);

module.exports = router;

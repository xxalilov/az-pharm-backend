const express = require("express");

const {
  getContact,
  getContacts,
  createContact,
  deleteContact,
} = require("../controllers/contact");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/admin/contacts", protect, getContacts);

router.post("/api/v1/contacts", createContact);

router
  .route("/api/v1/admin/contacts/:id")
  .get(protect, getContact)
  .delete(protect, deleteContact);

module.exports = router;

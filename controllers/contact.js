const Contact = require("../models/Contact");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

/**
 * @desc    GET Contacts for admin
 * @route   GET /admin/contacts
 * @access  Private
 */
exports.getContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find();

  res.render("admin/contact", {
    path: "/admin/contacts",
    pageTitle: "Contacts",
    contacts: contacts,
  });
});

/**
 * @desc    GET Contact
 * @route   GET api/v1/admin/contacts/:contactId
 * @access  Private
 */
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse("Contact not found that id", 404));
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

/**
 * @desc    Create contact
 * @route   POST api/v1/contact
 * @access  Public
 */
exports.createContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  res.status(201).json({
    success: true,
    data: contact,
  });
});

/**
 * @desc    DELETE Contact
 * @route   DELETE api/v1/admin/contacts/:contactId
 * @access  Private
 */
exports.deleteContact = asyncHandler(async (req, res, next) => {
  let contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorResponse("Contact not found that id", 404));
  }

  contact.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

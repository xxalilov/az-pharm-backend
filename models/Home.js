const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    default: "+998999639773",
  },
  slides: {
    type: mongoose.Schema.ObjectId,
    ref: "Slide",
  },
  about: {
    type: mongoose.Schema.ObjectId,
    ref: "About",
  },
  gallery: {
    type: mongoose.Schema.ObjectId,
    ref: "Gallery",
  },
  feedbacks: {
    type: mongoose.Schema.ObjectId,
    ref: "Feedback",
  },
  instagram: {
    type: String,
    default: "https://www.instagram.com/xolbek_xalilov/",
  },
  facebook: {
    type: String,
    default: "https://www.facebook.com/xolbek.xalilov/",
  },
  telegram: {
    type: String,
    default: "https://t.me/xalilov_01",
  },
});

module.exports = mongoose.model("Home", homeSchema);

const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    default: "+998999639773",
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

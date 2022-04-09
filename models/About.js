const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Az pharm companiyasi",
  },
  description: {
    type: String,
    default:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  video: {
    type: String,
  },
});

module.exports = mongoose.model("About", aboutSchema);

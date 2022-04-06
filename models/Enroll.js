const mongoose = require("mongoose");

const enrollSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pillName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Enroll", enrollSchema);

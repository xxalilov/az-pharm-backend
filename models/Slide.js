const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Biz sizni kasal bo’linishngizga yo’l qo’ymaymiz",
  },
  description: {
    type: String,
    default: "Istagan doringizga buyurtma bering, biz yetkazib beramiz",
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Slide", slideSchema);

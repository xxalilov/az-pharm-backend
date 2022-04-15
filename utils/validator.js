const Joi = require("joi");

exports.slideSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),
  image: Joi.string().required(),
});

exports.feedbackSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),
  authorName: Joi.string().min(3).required(),
  authorProfession: Joi.string().min(3).required(),
  image: Joi.string().required(),
});

exports.aboutSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(5).required(),
  video: Joi.string().required(),
});

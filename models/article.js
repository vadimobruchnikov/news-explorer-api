const mongoose = require('mongoose');
const validator = require('validator');
const { ErrorMessages } = require('../resources/response-messages');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, ErrorMessages.KEYWORD_IS_EMPTY_ERROR_ERROR],
    minlength: 2,
    maxlength: 30,
  },
  title: {
    type: String,
    required: [true, ErrorMessages.TITLE_IS_EMPTY_ERROR],
    minlength: 2,
    maxlength: 30,
  },
  text: {
    type: String,
    required: [true, ErrorMessages.TEXT_IS_EMPTY_ERROR],
    minlength: 2,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  link: {
    type: String,
    required: [true, ErrorMessages.LINK_IS_EMPTY_ERROR],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: () => ErrorMessages.LINK_IS_INCORRECT_ERROR,
    },
  },
  source: {
    type: String,
    required: [true, ErrorMessages.LINK_IS_EMPTY_ERROR],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: () => ErrorMessages.LINK_IS_INCORRECT_ERROR,
    },
  },
  image: {
    type: String,
    required: [true, ErrorMessages.IMAGE_IS_EMPTY_ERROR],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: () => ErrorMessages.IMAGE_IS_INCORRECT_ERROR,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

});

articleSchema.index({owner: 1, link: 1}, {unique: true});

module.exports = mongoose.model('article', articleSchema);

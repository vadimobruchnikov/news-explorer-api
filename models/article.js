const mongoose = require('mongoose');
const validator = require('validator');

// TODO проверить схемы
const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Не указана поисковая фраза[keyword]'],
    minlength: 2,
    maxlength: 30,
  },
  title: {
    type: String,
    required: [true, 'Заголовок[title] должн быть заполнен'],
    minlength: 2,
    maxlength: 30,
  },
  text: {
    type: String,
    required: [true, 'Текст статьи[text] должн быть не пустым'],
    minlength: 2,
    maxlength: 30,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  link: {
    type: String,
    required: [true, 'Ссылка должна быть заполнена'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: () => 'Значение не является корректной ссылкой',
    },
  },
  image: {
    type: String,
    required: [true, 'Ссылка на картинку (image) должна быть заполнена'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: () => 'Значение (image) не является корректной ссылкой',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

});

module.exports = mongoose.model('article', articleSchema);

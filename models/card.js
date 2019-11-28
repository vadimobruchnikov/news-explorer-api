const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Укажите имя пользователя'],
    minlength: 2,
    maxlength: 30,
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

});

module.exports = mongoose.model('card', cardSchema);

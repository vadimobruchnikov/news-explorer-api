const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const ExceptionError = require('../errors/exception-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, 'Ссылка должна быть заполнена'],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: () => 'Значение не является корректной ссылкой',
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Значение не является корректным email-ом'],
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: () => 'Значение не является корректным email-ом',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function f(email, password, next) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        // return Promise.reject(new Error('Неправильные почта или пароль'));
        throw new ExceptionError(404, 'Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          // return Promise.reject(new Error('Неправильные почта или пароль'));
          throw new ExceptionError(404, 'Неправильные почта или пароль');
        }
        return user;
      });
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);

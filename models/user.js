const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { ErrorMessages } = require('../resources/response-messages');
const NotFoundError = require('../errors/not-found-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: [true, ErrorMessages.EMAIL_IS_EMPTY_ERROR],
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: () => ErrorMessages.EMAIL_IS_INCORRECT_ERROR,
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
        throw new NotFoundError(ErrorMessages.USER_OR_PASS_NOT_FOUND_ERROR);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotFoundError(ErrorMessages.USER_OR_PASS_NOT_FOUND_ERROR);
        }
        return user;
      });
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);

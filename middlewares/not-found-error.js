const { ErrorMessages } = require('../resources/response-messages');
const NotFoundError = require('../errors/not-found-error');

const notFoundError = function auth(req, res, next) {
  const err = new NotFoundError(ErrorMessages.NOT_FOUND_ERROR);
  next(err);
};

module.exports = notFoundError;

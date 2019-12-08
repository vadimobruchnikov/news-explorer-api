const { ErrorMessages } = require('../resources/response-messages');

const globalError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  const errorMessage = statusCode === 500 ? ErrorMessages.SERVER_ERROR : message;
  res.status(statusCode).send({ message: errorMessage });
  next();
};

module.exports = globalError;

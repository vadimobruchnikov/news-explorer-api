const { ErrorMessages } = require('../resources/response-messages');

const globalErrors = (err, req, res) => {
  const { statusCode = 500, message } = err;
  const errorMessage = statusCode === 500 ? ErrorMessages.SERVER_ERROR : ` !000! ${message}`;
  return res.status(statusCode).send({ message: errorMessage });
};

module.exports = globalErrors;

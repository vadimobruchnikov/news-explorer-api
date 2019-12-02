const { ErrorMessages } = require('../resources/response-messages');

const page404 = (req, res) => {
  res.status(404).send({ message: ErrorMessages.NOT_FOUND_ERROR });
};

module.exports = page404;

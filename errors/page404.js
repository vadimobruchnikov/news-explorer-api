
const { ErrorMessages } = require('../resources/response-messages');

const page404 = (req, res) => {
  // res.sendStatus(404);
  res.status(404);
  res.send({ message: ErrorMessages.NOT_FOUND_ERROR });
};

module.exports = page404;

/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const ExceptionError = require('../errors/exception-error');
const { ErrorMessages } = require('../resources/response-messages');

const { NODE_ENV, JWT_SECRET } = process.env;

const devSecretKey = 'cbfdt-gfdgr-hgfx-CRXRTX';
module.exports.secretKey = devSecretKey;

module.exports.auth = function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ExceptionError(401, res, ErrorMessages.AUTORIZATION_NEEDED_ERROR);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devSecretKey);
  } catch (e) {
    console.log(e);
    const err = new ExceptionError(401, res, ErrorMessages.AUTORIZATION_ERROR);
    next(err);
  }
  req.user = payload;
  next();
};

/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { ErrorMessages } = require('../resources/response-messages');
const UnautorizedError = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const devSecretKey = 'cbfdt-gfdgr-hgfx-CRXRTX';
module.exports.secretKey = devSecretKey;

module.exports.auth = function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedError(ErrorMessages.AUTORIZATION_NEEDED_ERROR);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devSecretKey);
  } catch (e) {
    const err = new UnautorizedError(ErrorMessages.AUTORIZED_ERROR);
    next(err);
  }
  req.user = payload;
  next();
};

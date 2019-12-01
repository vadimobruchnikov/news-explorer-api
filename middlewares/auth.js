/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const ExceptionError = require('../errors/exception-error');

const { NODE_ENV, JWT_SECRET } = process.env;

// const secretKey = 'cbfdt-gfdgr-hgfx-CRXRTX';
module.exports.secretKey = 'cbfdt-gfdgr-hgfx-CRXRTX';

module.exports.auth = function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ExceptionError(401, res, 'Необходима авторизация (1)');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : this.auth.secretKey);
  } catch (e) {
    // отправим ошибку, если не получилось
    const err = new ExceptionError(401, res, 'Необходима авторизация (2)');
    // err.statusCode = 401;
    // err.res = res;
    // err.message = 'Необходима авторизация2';
    next(err);
  }
  req.user = payload;
  next();
};

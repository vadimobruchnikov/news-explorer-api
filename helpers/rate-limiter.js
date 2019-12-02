const rateLimit = require('express-rate-limit');

/* Модуль защиты от ДДос атак или черезмерной активности
 */

const expressRateLimitter = (req, res, next) => {
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  return next();
};

module.exports = expressRateLimitter;

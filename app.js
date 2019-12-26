/* eslint-disable no-console */
require('dotenv').config();
require('./mongo');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const routes = require('./routes/index');
const expressRateLimitter = require('./helpers/rate-limiter');
const globalError = require('./errors/global-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(expressRateLimitter);
app.use(requestLogger); // логгер запросов

app.use('/', routes); // /routes/index.js

app.use(errorLogger); // логгер ошибок
app.use(errors());
app.use(globalError); // глобальная функция отработки ошибок

app.listen(PORT, (err) => {
  const message = err ? err.message : `App listening on port ${PORT}`;
  console.log(message);
});

// module.exports = app;

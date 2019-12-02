/* eslint-disable no-console */
require('dotenv').config();
require('./mongo');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const routes = require('./routes/index');
const expressRateLimitter = require('./helpers/rate-limiter');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(expressRateLimitter);
app.use('/', routes);

app.listen(PORT, (err) => {
  const message = err ? err.message : `App listening on port ${PORT}`;
  console.log(message);
});

module.exports = app;

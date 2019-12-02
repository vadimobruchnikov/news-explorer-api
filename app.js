/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const { DATABASENAME = 'news-explorer' } = process.env;

const app = express();

mongoose.connect(`mongodb://localhost:27017/${DATABASENAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB database connection error: ${err}`);
  process.exit(2);
});

mongoose.connection.on('connected', () => {
  console.info('Succesfully connected to MongoDB Database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use('/', routes);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});

module.exports = app;

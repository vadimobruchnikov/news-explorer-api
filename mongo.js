/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

const { ErrorMessages, InfoMessages } = require('./resources/response-messages');

const { MONGODB_ADDRESS = 'mongodb://localhost:27017/news-explorer' } = process.env;

mongoose.connect(MONGODB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error(`${ErrorMessages.MONGO_CONNECTION_ERROR} ${err}`);
  process.exit(2);
});

mongoose.connection.on('connected', () => {
  console.info(InfoMessages.SUCCESS_CONNECT_TO_MONGO);
});

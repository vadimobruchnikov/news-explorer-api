/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

const { ErrorMessages, InfoMessages } = require('./resources/response-messages');

const { DATABASENAME = 'news-explorer' } = process.env;
const { MONGOHOST = 'localhost' } = process.env;
const { MONGOPORT = 27017 } = process.env;

mongoose.connect(`mongodb://${MONGOHOST}:${MONGOPORT}/${DATABASENAME}`, {
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

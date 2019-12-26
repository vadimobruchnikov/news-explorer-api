/* eslint-disable no-console */
const mongoose = require('mongoose');

const { ErrorMessages, InfoMessages } = require('./resources/response-messages');

const { NODE_ENV, MONGODB_ADDRESS } = process.env;
const { DEV_MONGO_DB } = require('./config/dev-env-variables');

mongoose.connect(NODE_ENV === 'production' ? MONGODB_ADDRESS : DEV_MONGO_DB, {
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

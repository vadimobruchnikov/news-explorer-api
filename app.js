/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const routes = require('./routes/index');

const { PORT = 3000 } = process.env;
const { DATABASENAME = 'newsexplorer' } = process.env;


const app = express();

mongoose.connect(`mongodb://localhost:27017/${DATABASENAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error(`Database Connection Error: ${err}`);
  console.error('Do not run MongoDB server.');
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

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// глобальная функция отработки ошибок
app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});

module.exports = app;

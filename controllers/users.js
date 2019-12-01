/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const { secretKey } = require('../middlewares/auth');
const ExceptionError = require('../errors/exception-error');
const { ErrorMessages, InfoMessages } = require('../resources/response-messages');

/**
 * Создание нового пользователя по req.body { name, about, avatar, email, password }
 *
 * @param {Object} req - запрос body {name, about}
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      name,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      // Не возвращаем хэш пароля
      delete user._doc.password;
      return res.send(user);
    })
    .catch(next);
};

/**
 * Возвращает список пользователя по id
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      if (!user) {
        throw new ExceptionError(404, res, ErrorMessages.NO_USER_ERROR);
      }
      return res.send(user);
    })
    .catch(next);
};

/**
 * Обновляет указанного (по id) пользователя
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.updateUser = (req, res, next) => {
  // TODO Поля проверить и изменить
  const { name, about } = req.body;
  const { _id } = req.user;
  // TODO Проверить, что с таким именем уже нет пользователя в БД
  Users.findByIdAndUpdate(_id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new ExceptionError(404, res, ErrorMessages.NO_USER_ERROR);
      }
      // TODO: Проверить права
      return res.send(user);
    })
    .catch(next);
};

/**
 * Возвращает список пользователей
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.getUsers = (req, res, next) => {
  Users.find({})
    // TODO: Проверить на пустой ответ
    .then((users) => res.send(users))
    .catch(next);
};

/**
 * Запрос авторизации (по req.body { email, password }) пользователя
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  return Users.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : secretKey, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).end();
    })
    .catch(next);
};

/**
 * Разлогинивание авторизованного пользователя
 * обнуляется cookies['jwt'] у любого пользователя
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.logout = (req, res) => res.status(200).clearCookie('jwt').json({ message: InfoMessages.LOGOUT_COMPLETE_INFO });

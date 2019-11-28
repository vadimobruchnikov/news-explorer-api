/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { secretKey } = require('../middlewares/auth');
const ExceptionError = require('../errors/exception-error');

/**
 * Создание нового пользователя по req.body { name, about, avatar, email, password }
 *
 * @param {Object} req - объект запроса body {name, about}
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  // хешируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      delete user._doc.password; // Не возвращаем хэш пароля
      return res.send(user);
    })
    .catch(next);
};

/**
 * Возвращает список пользователя по id
 *
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        // return res.status(404).json({ message: `Нет пользователя с id ${id}` });
        throw new ExceptionError(404, res, `Нет пользователя с id [${id}]`);
      }
      return res.send(user);
    })
    .catch(next);
};

/**
 * Обновляет указанного (по id) пользователя
 *
 * @param {Object} req - объект запроса body {name, about}
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new ExceptionError(404, res, `Нет пользователя с id [${_id}]`);
      }
      // TODO: Проверить права
      return res.send(user);
    })
    .catch(next);
};

/**
 * Обновляет аваар у указанного (по id) пользователя
 *
 * @param {Object} req - объект запроса body {name, about}
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.params;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new ExceptionError(404, res, `Нет пользователя с id [${_id}]`);
      }
      return res.send(user);
    })
    .catch(next);
};

/**
 * Обновляет аваар у указанного (по id) пользователя
 *
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.getUsers = (req, res, next) => {
  User.find({})
    // TODO: Проверить на пустой ответ
    .then((users) => res.send(users))
    .catch(next);
};

/**
 * Запрос авторизации (по req.body { email, password }) пользователя
 *
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  return User.findUserByCredentials(email, password, next)
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
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.logout = (req, res) => res.status(200).clearCookie('jwt').json({ message: 'Logout complite!' });

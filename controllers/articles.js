/* eslint-disable consistent-return */

const Articles = require('../models/article');
const ExceptionError = require('../errors/exception-error');

/**
 * Возвращает массив (своих) новостей
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.getArticles = (req, res, next) => {
  // Добавить условие владельца
  Articles.find({})
    // TODO: Проверить на пустое значение
    .then((articles) => res.send(articles))
    .catch(next);
};

/**
 * Создает новость
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  // TODO: Проверить, что такой нет в БД
  Articles.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send(article))
    .catch(next);
};

/**
 * Получает конкретную карточку по req.params.id
 *
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.getCard = (req, res, next) => {
  Articles.find({ _id: req.params.id })
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      throw new ExceptionError(404, res, `Нет карточки с id ${req.params.id}`);
      // return res.status(404).json({ message: `Нет карточки с id ${req.params.id}` });
    })
    .catch(next);
};

/**
 * Удаляет конкретную карточку по req.params.id
 * при удалении проверяется владелец карточки из req.user._id
 *
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.deleteCard = (req, res, next) => {
  Articles.findById({ _id: req.params.id })
    .then((card) => {
      if (card) {
        // Проверяем владельца катрочки, только он может удалять
        if (card.owner.toString() === req.user._id.toString()) {
          Articles.findByIdAndRemove({ _id: req.params.id })
            .then((user) => res.send({ data: user }))
            .catch(next);
        } else {
          // return res.status(403).json({ message: 'Недостаточно прав' });
          throw new ExceptionError(403, res, 'Недостаточно прав');
        }
      } else {
        // return res.status(404).json({ message: 'Карточка не найдена' });
        throw new ExceptionError(404, res, 'Карточка не найдена');
      }
    })
    .catch(next);
};

/**
 * Сохраняет новость c articleId
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.doSave = (req, res, next) => {
  const { _id } = req.user;
  const articleId = req.params.id;
  // TODO Переделать процедуру на создание
  Articles.findByIdAndUpdate(articleId, { $addToSet: { likes: _id } }, { new: true })
    .then((article) => {
      if (!article) {
        throw new ExceptionError(404, res, `Нет новости с id ${articleId}`);
      }
      return res.send(article);
    })
    .catch(next);
};

/**
 * Удаляет новость c articleId (с проверкой авторства)
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.doClear = (req, res, next) => {
  const { _id } = req.user;
  const articleId = req.params.id;
  // TODO Проверить авторство, переделать на удаление
  Articles.findByIdAndUpdate(articleId, { $pull: { likes: _id } }, { new: true })
    .then((article) => {
      if (!article) {
        // TODO Нужна ли ошибка если мы хотели удалить то, чего нет?
        throw new ExceptionError(404, res, `Нет карточки с id ${articleId}`);
      }
      return res.send(article);
    })
    .catch(next);
};

/* eslint-disable consistent-return */
const Articles = require('../models/article');
const ExceptionError = require('../errors/exception-error');
const ErrorMessages = require('../resources/response-messages');

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
    .then((articles) => res.send({ data: articles }))
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
  // TODO: Проверить, что такой еще нет в БД
  // Articles.find({ })
  console.log(2);
  Articles.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

/**
 * Получает конкретную карточку по req.params.id
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.getArticle = (req, res, next) => {
  Articles.find({ _id: req.params.id })
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      throw new ExceptionError(404, res, `${ErrorMessages.NO_ARTICLE_ERROR} ${req.params.id}`);
    })
    .catch(next);
};

/**
 * Удаляет конкретную карточку по req.params.id
 * при удалении проверяется владелец карточки из req.user._id
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
module.exports.deleteArticle = (req, res, next) => {
  Articles.findById({ _id: req.params.id })
    .then((article) => {
      if (article) {
        // Проверяем владельца статьи, только он может удалять
        if (article.owner.toString() === req.user._id.toString()) {
          Articles.findByIdAndRemove({ _id: req.params.id })
            .then((user) => res.send({ data: user }))
            .catch(next);
        } else {
          throw new ExceptionError(403, res, ErrorMessages.FORBIDDEN_ERROR);
        }
      } else {
        throw new ExceptionError(404, res, ErrorMessages.NO_ARTICLE_ERROR);
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
module.exports.saveArticle = (req, res, next) => {
  const { _id } = req.user;
  const articleId = req.params.id;
  // TODO Переделать процедуру на создание
  Articles.findByIdAndUpdate(articleId, { $addToSet: { likes: _id } }, { runValidators: true, new: true })
    .then((article) => {
      if (!article) {
        throw new ExceptionError(404, res, ErrorMessages.NO_ARTICLE_ERROR);
      }
      return res.send({ data: article });
    })
    .catch(next);
};

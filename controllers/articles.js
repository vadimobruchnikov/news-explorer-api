/* eslint-disable consistent-return */
const Articles = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { ErrorMessages } = require('../resources/response-messages');

/**
 * Возвращает массив (своих) новостей
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
const getArticles = (req, res, next) => {
  // Условие по владельцу
  const owner = req.user._id;
  Articles.find({owner: owner})
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
const createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Articles.find({source: source, link:link, owner:owner})
    .then((articles) => {
		if(articles.length > 0) {
	 		return res.send({ data: articles });
	    } else {
 			Articles.create({
    			keyword, title, text, date, source, link, image, owner
  			})
    		.then((article) => res.send({ data: article }))
    		.catch(next);
		}
	})
    .catch(next);
};

/**
 * Получает конкретную карточку по req.params.id
 *
 * @param {Object} req - запрос
 * @param {Object} res - ответ
 * @param {Object} next - следующий обработчик
 */
const getArticle = (req, res, next) => {
  Articles.find({ _id: req.params.id })
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      throw new NotFoundError(`${ErrorMessages.NO_ARTICLE_ERROR} ${req.params.id}`);
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
const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Articles.findById({ _id: articleId })
    .then((article) => {
      if (article) {
        // Проверяем владельца статьи, только он может удалять
        if (article.owner.toString() === req.user._id.toString()) {
          Articles.findByIdAndRemove(articleId)
            .then((deletedArticle) => res.send({ data: deletedArticle }))
            .catch(next);
        } else {
          throw new ForbiddenError(ErrorMessages.FORBIDDEN_ERROR);
        }
      } else {
        throw new NotFoundError(ErrorMessages.NO_ARTICLE_ERROR);
      }
    })
    .catch(next);
};

module.exports = {
  getArticles, createArticle, getArticle, deleteArticle,
};

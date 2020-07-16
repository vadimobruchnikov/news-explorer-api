/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const Articles = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const { ErrorMessages } = require('../resources/response-messages');

const getNewsArticles = (req, res, next) => {
  // Формат ссылки
  // ?q=${options.newsQuery} &from=${options.dateFrom} &to=${options.dateTo}
  // &language=ru &pageSize=100 &apiKey=${this.newsApiKey}
  // Когда будет много статей доделать работу с датами
  // const dateFrom = req.query.from || undefined;
  // const dateTo = req.query.to || undefined;
  const pageSize = parseInt(req.query.pageSize, 10) || 20;
  const searchQuery = req.query.q || undefined;
  let selectObj = {};
  if (searchQuery) {
    const searchRegExp = new RegExp(`.*${searchQuery}.*`, 'i');
    selectObj = {
      $or: [
        { keyword: { $regex: searchRegExp } },
        { title: { $regex: searchRegExp } },
        { text: { $regex: searchRegExp } },
      ],
    };
  }
  Articles.find(selectObj)
    // TODO: Проверить на пустое значение
    .select('-_id')
    .select('-owner')
    .select('-__v')
    .select('-createdAt')
    .select('-keyword')
    .limit(pageSize)
    .then((articles) => {
      // преобразуем к виду newsapi.org
      const newsArr = articles.map((element) => {
        // корректно ли так переопределять элементы?
        element._doc.description = element.text;
        delete element._doc.text;
        element._doc.url = element.link;
        element._doc.source = {
          name: element.source,
        };
        delete element._doc.link;
        element._doc.urlToImage = element.image;
        delete element._doc.image;
        delete element.keyword;
        element._doc.publishedAt = element.date;
        return element;
      });
      res.send({ status: 'ok', articles: newsArr });
    })
    .catch(next);
};

const checkNewsArticles = (req, res, next) => {
  const owner = req.user._id;
  const { body } = req;
  if (body.links) {
    // const selectLinks = JSON.stringify(body.links)
    // проверить формат ссылок
    // const searchRegExp = new RegExp(`.*${searchQuery}.*`,'i');
    //    { "keyword" : { $regex: searchRegExp } },

    Articles.find({ $or: body.links, owner }, { link: 1 })
      .select('-_id')
      .then((articles) => res.send({ data: articles }))
      .catch(next);
    // res.status(200).send(body);
  } else {
    throw new BadRequestError(`${ErrorMessages.BAD_REQUEST_ERROR} `);
  }
};

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
  Articles.find({ owner })
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
  Articles.find({ source, link, owner })
    .then((articles) => {
      if (articles.length > 0) {
        // если карточка уже есть, то удаляем ее
        const articleId = articles[0]._id;
        Articles.findByIdAndRemove(articleId)
          .then((deletedArticle) => res.send({ data: deletedArticle, status: 'deleted' }))
          .catch(next);
        // return res.send({ data: articles });
      } else {
        // или создаем
        Articles.create({
          keyword, title, text, date, source, link, image, owner,
        })
          .then((article) => res.send({ data: article, status: 'created' }))
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
  getArticles, createArticle, getArticle, deleteArticle, getNewsArticles, checkNewsArticles,
};

const articlesRoute = require('express').Router();

const {
  getArticles, createArticle, getArticle, deleteArticle,
} = require('../controllers/articles');

const {
  saveArticleValidationSettings,
} = require('../validators/requestValidation');

articlesRoute.get('/articles', getArticles);
articlesRoute.post('/articles', saveArticleValidationSettings, createArticle);
articlesRoute.get('/articles/:articleId', getArticle);
articlesRoute.delete('/articles/:articleId', deleteArticle);

module.exports = articlesRoute;

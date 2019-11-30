const articlesRouter = require('express').Router();

const {
  getArticles, saveArticle, getArticle, deleteArticle,
} = require('../controllers/articles');

const {
  saveArticleValidationSettings,
} = require('../validators/requestValidation');

articlesRouter.get('/articles', getArticles);
articlesRouter.post('/articles', saveArticleValidationSettings, saveArticle);
articlesRouter.get('/articles/:articleId', getArticle);
articlesRouter.delete('/articles/:articleId', deleteArticle);

module.exports = articlesRouter;

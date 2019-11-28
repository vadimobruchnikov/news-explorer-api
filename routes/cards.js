const cardsRoute = require('express').Router();
const { celebrate, Joi } = require('celebrate');


const {
  getCards, createCard, getCard, deleteCard, doLike, doDislike,
} = require('../controllers/card');

cardsRoute.get('/cards', getCards);
cardsRoute.post('/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().min(5).max(30)
        .uri({ allowRelative: true }),
    }).unknown(true),
  }),
  createCard);
cardsRoute.get('/cards/:id', getCard);
cardsRoute.delete('/cards/:id', deleteCard);
cardsRoute.put('/cards/:id/likes', doLike);
cardsRoute.delete('/cards/:id/likes', doDislike);

module.exports = cardsRoute;

const {
  celebrate, Joi,
} = require('celebrate');

const signinInValidationSettings = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(5).max(30),
    password: Joi.string().required().min(8).max(30),
  }),
});

const signupInValidationSettings = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2)
      .max(30),
    about: Joi.string().required().max(50),
    avatar: Joi.string().required().max(50).regex(/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/),
    // avatar: Joi.string().required().max(50).uri({ allowRelative: true }),
    email: Joi.string().required().max(120).email(),
    password: Joi.string().required().min(2).max(30),
  }),
});

// TODO Проверить типы в моделях
const saveArticleValidationSettings = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(3).max(30),
    text: Joi.string().required().min(2).max(30),
    date: Joi.string().required().min(2).max(30),
    source: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(5).max(30)
      // TODO Заменить на регулярку
      .uri({ allowRelative: true }),
    image: Joi.string().required().min(5).max(30)
      .uri({ allowRelative: true }),
    owner: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

const getUsersValidationSettings = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

module.exports = {
  signinInValidationSettings,
  signupInValidationSettings,
  saveArticleValidationSettings,
  getUsersValidationSettings,
};

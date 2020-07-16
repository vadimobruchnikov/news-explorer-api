/* eslint-disable no-useless-escape */
const {
  celebrate, Joi,
} = require('celebrate');

const signinInValidationSettings = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(5).max(30),
    password: Joi.string().required().min(8),
  }),
});

const signupInValidationSettings = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line max-len
    // avatar: Joi.string().required().max(50).regex(/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/),
    // avatar: Joi.string().required().max(50).uri({ allowRelative: true }),
    email: Joi.string().required().max(120).email(),
    password: Joi.string().required().min(2),
  }),
});

const saveArticleValidationSettings = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(3).max(30),
    text: Joi.string().required().min(2),
    date: Joi.date().iso().required(),
    source: Joi.string().required().min(2),
    link: Joi.string().required().min(5)
    // TODO Заменить на регулярку
    // .uri({ allowRelative: true }),
    // .uri(),
      .regex(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/),
    // .regex(/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/),
    image: Joi.string().required().min(5)
      // .uri({ allowRelative: true })
      .uri(),
    // .regex(/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/)
  }).unknown(true),
});

module.exports = {
  signinInValidationSettings,
  signupInValidationSettings,
  saveArticleValidationSettings,
};

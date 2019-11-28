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

module.exports = { signinInValidationSettings, signupInValidationSettings };

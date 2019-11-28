const usersRoute = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUsers, updateUser, updateUserAvatar,
} = require('../controllers/user');

usersRoute.get('/users', 
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(2).max(30),
      password: Joi.string().required().min(2).max(30),
    }).unknown(true),
  }),
  getUsers);

usersRoute.get('/users/:id', getUser);
usersRoute.patch('/users/me', updateUser);
usersRoute.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRoute;

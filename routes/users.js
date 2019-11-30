const usersRoute = require('express').Router();

const {
  getUser, getUsers, updateUser,
} = require('../controllers/users');

const {
  getUsersValidationSettings,
} = require('../validators/requestValidation');

usersRoute.get('/users', getUsersValidationSettings, getUsers);
usersRoute.get('/users/:id', getUser);
usersRoute.patch('/users/me', updateUser);
// usersRoute.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRoute;

const usersRoute = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');

usersRoute.get('/users/:id', getUser);
usersRoute.patch('/users/me', updateUser);
// usersRoute.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRoute;

const usersRoute = require('express').Router();

const { getUser } = require('../controllers/users');

usersRoute.get('/users/me', getUser);

module.exports = usersRoute;

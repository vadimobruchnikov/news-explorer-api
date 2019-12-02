const router = require('express').Router();
const { errors } = require('celebrate');

const { crashTest } = require('../helpers/crash-test');
const usersRoute = require('../routes/users');
const articlesRoute = require('../routes/articles');
const page404 = require('../errors/page404');
const { signinInValidationSettings, signupInValidationSettings } = require('../validators/requestValidation');
const { createUser, login, logout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const globalErrors = require('../errors/global-errors');

router.use(requestLogger); // подключаем логгер запросов
router.get('/crash-test', crashTest); // TODO Убрать после отладки!
// роуты не требующие авторизации
router.post('/signin', signinInValidationSettings, login); // авторизация
router.post('/signup', signupInValidationSettings, createUser); // регистрация
router.post('/signout', logout); // выход
router.use(auth);
router.use(usersRoute); // /users
router.use(articlesRoute); // /articles
router.use(errorLogger); // подключаем логгер ошибок
router.use(errors());
router.use(page404);
router.use(globalErrors); // глобальная функция отработки ошибок

module.exports = router;

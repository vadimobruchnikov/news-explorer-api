const router = require('express').Router();
const { errors } = require('celebrate');
const { crashTest } = require('../helpers/crash-test');

const usersRoute = require('../routes/users');
const articlesRoute = require('../routes/articles');

// const path = require("path");
const page404 = require('../errors/page404');
const {
  signinInValidationSettings, signupInValidationSettings,
} = require('../validators/requestValidation');
const {
  createUser, login, logout,
} = require('../controllers/users');
const {
  auth,
} = require('../middlewares/auth');
const {
  requestLogger, errorLogger,
} = require('../middlewares/logger');

router.use(requestLogger); // подключаем логгер запросов
router.use(errorLogger); // подключаем логгер ошибок
router.get('/crash-test', crashTest); // TODO Убрать после отладки!
router.use(errors()); // обработчик ошибок celebrate

// роуты не требующие авторизации
router.post('/signin', signinInValidationSettings, login); // авторизация
router.post('/signup', signupInValidationSettings, createUser); // регистрация
router.post('/signout', logout); // выход

router.use(auth);

router.use(usersRoute); // /users
router.use(articlesRoute); // /articles

// отдавать содержимое файлов, если указан точный путь
// app.use(express.static(path.join(__dirname, "public")));

router.use(page404);

module.exports = router;

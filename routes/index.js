const router = require('express').Router();
const errors = require('celebrate');

const usersRoute = require('../routes/users');
const articlesRouter = require('./articles').default;
// const path = require("path");
const page404 = require('../routes/page404');
const {
  signinInValidationSettings, signupInValidationSettings,
} = require('../validators/requestValidation');

const {
  createUser, login, logout,
} = require('../controllers/user');

const {
  auth,
} = require('../middlewares/auth');

const {
  requestLogger, errorLogger,
} = require('../middlewares/logger');

router.use(requestLogger); // подключаем логгер запросов
router.use(errorLogger); // подключаем логгер ошибок

// TODO Убрать после отладки!
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(errors()); // обработчик ошибок celebrate

// роуты не требующие авторизации
router.post('/signin', signinInValidationSettings, login); // авторизация
router.post('/signup', signupInValidationSettings, createUser); // регистрация
router.post('/signout', logout); // выход

router.use(auth);

router.use(usersRoute); // /users
router.use(articlesRouter); // /articles

// отдавать содержимое файлов, если указан точный путь
// app.use(express.static(path.join(__dirname, "public")));

router.use(page404);

module.exports = router;

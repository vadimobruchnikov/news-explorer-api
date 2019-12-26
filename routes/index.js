const router = require('express').Router();
const { crashTest } = require('../helpers/crash-test');
const usersRoute = require('../routes/users');
const articlesRoute = require('../routes/articles');
const { signinInValidationSettings, signupInValidationSettings } = require('../validators/requestValidation');
const { createUser, login, logout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const notFoundError = require('../middlewares/not-found-error');
const { InfoMessages } = require('../resources/response-messages');
const { cors } = require('../middlewares/cors');

const indexPage = (req, res) => {
  res.send({ message: InfoMessages.INDEX_MESSAGE_INFO });
};

router.use(cors);

router.get('/', indexPage);
router.get('/crash-test', crashTest); // TODO Убрать после отладки!
// роуты не требующие авторизации
router.post('/signin', signinInValidationSettings, login); // авторизация
router.post('/signup', signupInValidationSettings, createUser); // регистрация
router.post('/signout', logout); // выход

router.use(auth);
router.use(usersRoute); // /users
router.use(articlesRoute); // /articles
router.use(notFoundError);

module.exports = router;

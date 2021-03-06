module.exports.ErrorMessages = {
  UNAUTORIZED_ERROR: 'Ошибка овторизации',
  AUTORIZATION_NEEDED_ERROR: 'Требуется авторизация',
  NO_ARTICLE_ERROR: 'Нет карточки c таким Id',
  NO_USER_ERROR: 'Нет такого пользователя',
  FOUNT_DUPLICATE_USER_ERROR: 'Уже есть пользователь с такой почтой',
  NOT_FOUND_ERROR: 'Запрашиваемый ресурс не найден',
  FORBIDDEN_ERROR: 'У вас недостаточно прав',
  KEYWORD_IS_EMPTY_ERROR: 'Не указана поисковая фраза[keyword]',
  TITLE_IS_EMPTY_ERROR: 'Заголовок[title] должн быть заполнен',
  TEXT_IS_EMPTY_ERROR: 'Текст статьи[text] должн быть не пустым',
  LINK_IS_EMPTY_ERROR: 'Ссылка должна быть заполнена',
  LINK_IS_INCORRECT_ERROR: 'Значение не является корректной ссылкой',
  IMAGE_IS_INCORRECT_ERROR: 'Ссылка на картинку (image) должна быть заполнена',
  IMAGE_IS_EMPTY_ERROR: 'Ссылка на картинку (image) должна быть заполнена',
  EMAIL_IS_EMPTY_ERROR: 'Email должен быть заполнен',
  EMAIL_IS_INCORRECT_ERROR: 'Значение не является корректным Email-ом',
  USER_OR_PASS_NOT_FOUND_ERROR: 'Неправильные почта или пароль',
  SERVER_ERROR: 'На сервере произошла ошибка',
  MONGO_CONNECTION_ERROR: 'MongoDB database connection error',
};

module.exports.InfoMessages = {
  LOGOUT_COMPLETE_INFO: 'Вы успешно вышли',
  SUCCESS_CONNECT_TO_MONGO: 'Succesfully connected to MongoDB Database',
  INDEX_MESSAGE_INFO: 'API news-explorer v0.0.1',
};

module.exports.DebugMessages = {
  SERVER_WILL_BE_CRASHED_DEBUG: 'Сервер сейчас упадёт',
};

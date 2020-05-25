const { DebugMessages } = require('../resources/response-messages');
const InternalServerError = require('../errors/internal-server-error');

// Отладочный модуль для тестирования падения сервера

module.exports.crashTest = () => {
  setTimeout(() => {
    throw new InternalServerError(DebugMessages.SERVER_WILL_BE_CRASHED_DEBUG);
  }, 0);
};

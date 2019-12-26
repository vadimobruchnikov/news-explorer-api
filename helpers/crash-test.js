const { DebugMessages } = require('../resources/response-messages');

// Отладочный модуль для тестирования падения сервера

module.exports.crashTest = () => {
  setTimeout(() => {
    throw new Error(DebugMessages.SERVER_WILL_BE_CRASHED_DEBUG);
  }, 0);
};

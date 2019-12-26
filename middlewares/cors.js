// Разешённые домены
const allowedCors = [
  'https://cloudsnews.ru',
  'http://cloudsnews.ru',
  'localhost:3000',
];

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;

  // Проверяем, что значение origin есть среди разрешённых доменов
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  // TODO Если нет можно вставить ошибку доступа 403

  next();
};

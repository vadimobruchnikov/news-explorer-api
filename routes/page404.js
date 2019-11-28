const page404 = (req, res) => {
  // res.sendStatus(404);
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
};

module.exports = page404;

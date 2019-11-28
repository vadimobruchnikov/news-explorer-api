/* eslint-disable consistent-return */

const Card = require('../models/card');
const ExceptionError = require('../errors/exception-error');

/**
 * Возвращает массив карточек
 *
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.getCards = (req, res, next) => {
  Card.find({})
    // TODO: Проверить на пустое значение
    .then((cards) => res.send(cards))
    .catch(next);
};

/**
 * Создает карточку по req.body { name, link }
 *
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  // TODO: Проверить, что такого нет в БД
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

/**
 * Получает конкретную карточку по req.params.id
 *
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.getCard = (req, res, next) => {
  Card.find({ _id: req.params.id })
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      throw new ExceptionError(404, res, `Нет карточки с id ${req.params.id}`);
      // return res.status(404).json({ message: `Нет карточки с id ${req.params.id}` });
    })
    .catch(next);
};

/**
 * Удаляет конкретную карточку по req.params.id
 * при удалении проверяется владелец карточки из req.user._id
 *
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.deleteCard = (req, res, next) => {
  Card.findById({ _id: req.params.id })
    .then((card) => {
      if (card) {
        // Проверяем владельца катрочки, только он может удалять
        if (card.owner.toString() === req.user._id.toString()) {
          Card.findByIdAndRemove({ _id: req.params.id })
            .then((user) => res.send({ data: user }))
            .catch(next);
        } else {
          // return res.status(403).json({ message: 'Недостаточно прав' });
          throw new ExceptionError(403, res, 'Недостаточно прав');
        }
      } else {
        // return res.status(404).json({ message: 'Карточка не найдена' });
        throw new ExceptionError(404, res, 'Карточка не найдена');
      }
    })
    .catch(next);
};

/**
 * Выполняет лайк по карточке с req.user.id
 *
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.doLike = (req, res, next) => {
  const { _id } = req.user;
  const cardId = req.params.id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((card) => {
      if (!card) {
        // return res.status(404).json({ message: `Нет карточки с id ${cardId}` });
        throw new ExceptionError(404, res, `Нет карточки с id ${cardId}`);
      }
      return res.send(card);
    })
    .catch(next);
};

/**
 * Снимает лайк у карточки с req.user.id
 *
 * @param {Object} req - объект запроса
 * @param {Object} res - объект ответа
 * @param {Object} next - следующий обработчик
 */
module.exports.doDislike = (req, res, next) => {
  const { _id } = req.user;
  const cardId = req.params.id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((card) => {
      if (!card) {
        // return res.status(404).json({ message: `Нет карточки с id ${cardId}` });
        throw new ExceptionError(404, res, `Нет карточки с id ${cardId}`);
      }
      return res.send(card);
    })
    .catch(next);
};

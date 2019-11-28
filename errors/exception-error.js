class ExceptionError extends Error {
  constructor(statusCode = 500, res, message) {
    super(message);
    this.statusCode = statusCode;
    if (res) {
      return res.status(this.statusCode).send({ message: this.message });
    }
    // когда нет возможности задать промис как параметр,
    // то возвращающий промис передаем в this.res
    if (this.res) {
      return this.res.status(this.statusCode).send({ message: this.message });
    }
  }
}

module.exports = ExceptionError;

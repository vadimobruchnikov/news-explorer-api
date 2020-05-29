const winston = require('winston');
//winston.remove(winston.transports.Console);
//winston.add(winston.transports.Console(), {'timestamp':true});

const expressWinston = require('express-winston');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
	//new winston.transports.Console({'timestamp': true }),
    new winston.transports.File({ filename: 'error.log', 'timestamp': true }),
  ],
  //format: winston.format.json(),
/*  
format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.timestamp()
  ),
  meta: true,
  expressFormat: true,
  dynamicMeta: function(req, res) {
     return {
       data: new DateTime(),
     }
  }
  //metaField: null, //this causes the metadata to be stored at the root of the log entry
  //responseField: null, // this prevents the response from being included in the metadata (including body and status code)
  //requestWhitelist: ['query'],  //these are not included in the standard StackDriver httpRequest
	*/
});

module.exports = {
  requestLogger,
  errorLogger,
};

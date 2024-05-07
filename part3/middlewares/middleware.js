const logger = require('../utils/logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('kello: ', new Date());
  logger.info('---');
  logger.info('render vai localhost?');
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  const { path } = request;
  response.status(404).send({ error: 'unknown endpoint', path });
};

// https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling
const handleErrors = (error, request, response, next) => {
  logger.error(error);
  response.status(400).json({ error: error.message || error });
};

module.exports = { requestLogger, unknownEndpoint, handleErrors };

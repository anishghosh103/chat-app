const response = require('../libs/response');
const logger = require('../libs/logger');

let errorHandler = (err, req, res, next) => {
  logger.log('GlobalErrorHandler', response.error(res, err));
};

let notFoundHandler = (req, res, next) => {
  logger.log('RouteNotFoundHandler', response.error(res, 'Route Not Found.', 404));
};

module.exports = { errorHandler, notFoundHandler };
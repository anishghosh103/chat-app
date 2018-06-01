
const logger = require('../libs/logger');

let log = (req, res, next) => {
  logger.log(
    'RouteLogger',
    `${req.method} Request Made for ${req.originalUrl}`
  );
  next();
};

module.exports = { log };
const { createLogger, format, transports } = require('winston');
const config = require('../config/app');

const logger = createLogger({
  level: config.logger.level,
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.simple(),
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;

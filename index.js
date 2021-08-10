const app = require('./app');
const config = require('./config/app');
const logger = require('./libs/logger');

app.listen(config.port, config.host, () => {
  logger.info(`App is running on ${config.host}:${config.port}`);
});

const logger = require('../libs/logger');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
    } else {
      logger.error({ message: err.message, stack: err.stack || {} });
      ctx.status = 500;
    }
    ctx.body = '';
  }
};

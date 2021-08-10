module.exports = async function handleSequelizeValidationError(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = 422;

    switch (err.name) {
      case 'SequelizeValidationError':
      case 'SequelizeUniqueConstraintError':
        break;
      default:
        throw err;
    }

    const errors = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const field of Object.keys(err.errors)) {
      errors[field] = {
        field: err.errors[field].path,
        message: err.errors[field].message,
      };
    }

    ctx.body = { errors };
  }
};

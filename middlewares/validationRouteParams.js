module.exports = async function validationRouteParams(ctx, next) {
  if (ctx.params.id) {
    if (!isNumeric(ctx.params.id)) {
      ctx.throw(404, '');
    }
  }

  function isNumeric(value) {
    return /^\d+$/.test(value);
  }

  return next();
};

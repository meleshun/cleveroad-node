module.exports = async function validationFileSize(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.message.startsWith('maxFileSize exceeded')) {
      ctx.throw(422, 'The file is too big.');
    }
  }
};

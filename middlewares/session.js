const { Session } = require('../models');

module.exports = async function session(ctx, next) {
  const token = ctx.request.get('Authorization');
  if (!token) return next();

  const session = await Session.findOne({
    where: { token },
    include: 'user',
  });

  if (!session) {
    ctx.throw(401, '');
  }

  session.setDataValue('last_visit', new Date());
  await session.save();

  ctx.user = session.user;
  return next();
};

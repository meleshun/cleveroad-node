const uuid = require('uuid');
const { Session } = require('../models');

module.exports = async (ctx, next) => {
  ctx.login = async function login(user) {
    const token = uuid.v4();

    await Session.create({ token, user_id: user.id, lastVisit: new Date() });

    ctx.set('token', token);

    return token;
  };

  return next();
};

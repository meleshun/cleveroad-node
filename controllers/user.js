const passport = require('../libs/passport');
const { User } = require('../models');

module.exports.registration = async function registration(ctx) {
  const user = await User.create({
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    phone: ctx.request.body.phone,
    password: ctx.request.body.password,
  });

  const token = await ctx.login(user);

  ctx.body = { token };
};

module.exports.login = async function login(ctx, next) {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = {
        errors: {
          0: {
            field: 'password',
            message: info,
          },
        },
      };
      return;
    }

    const token = await ctx.login(user);

    ctx.body = { token };
  })(ctx, next);
};

module.exports.get = async function get(ctx) {
  ctx.body = ctx.user;
};

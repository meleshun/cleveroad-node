const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../models');

module.exports = new LocalStrategy(
  { usernameField: 'email', session: false },
  (async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, 'Wrong email or password');
      }

      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) {
        return done(null, false, 'Wrong email or password');
      }

      return done(null, user);
    } catch (err) {
      done(err);
    }
  }),
);

const { Model } = require('sequelize');
const crypto = require('crypto');
const config = require('../config/app');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      this.hasMany(Product, { foreignKey: 'user_id', as: 'products' });
    }

    toJSON() {
      return { ...this.get(), password: undefined, salt: undefined };
    }
  }

  User.init({
    name: {
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name' },
        notEmpty: { msg: 'Name must not be empty' },
      },
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a email' },
        notEmpty: { msg: 'email must not be empty' },
        isEmail: { msg: 'Must be a valid email address' },
      },
      type: DataTypes.STRING,
    },
    phone: {
      validate: {
        isPhone(value) {
          const regex = new RegExp(/^\+380[0-9]{9}$/);
          if (!regex.test(value)) {
            throw new Error('Phone number must start with +380 and contain 12 digits');
          }
        },
      },
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Wrong current password' },
        notEmpty: { msg: 'Wrong current password' },
      },
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: false,
  });

  User.beforeCreate(async (user) => {
    user.salt = await generateSalt();
    user.password = await generatePassword(user.salt, user.password);
  });

  User.prototype.checkPassword = async function checkPassword(password) {
    if (!password) return false;

    const hash = await generatePassword(this.salt, password);
    return hash === this.password;
  };

  return User;
};

function generatePassword(salt, password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password, salt,
      config.crypto.iterations,
      config.crypto.length,
      config.crypto.digest,
      (err, key) => {
        if (err) return reject(err);
        resolve(key.toString('hex'));
      },
    );
  });
}

function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(config.crypto.length, (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString('hex'));
    });
  });
}

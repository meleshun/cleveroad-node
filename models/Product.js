const { Model } = require('sequelize');
const path = require('path');
const config = require('../config/app');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    }

    toJSON() {
      const image = this.image ? path.join(config.domain, this.image) : null;
      return { ...this.get(), image };
    }
  }

  Product.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      validate: {
        notNull: { msg: 'Title is required' },
        notEmpty: { msg: 'Title must not be empty' },
        len: {
          args: [3],
          msg: 'Title should contain at least 3 characters.',
        },
      },
      type: DataTypes.STRING,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(19, 2),
      validate: {
        notNull: { msg: 'Price is required' },
        isDecimal: {
          msg: 'Price must be decimal',
        },
      },
    },
    image: {
      validate: {
        notEmpty: { msg: 'Image must not be empty' },
      },
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
    updatedAt: false,
    createdAt: 'created_at',
  });

  return Product;
};

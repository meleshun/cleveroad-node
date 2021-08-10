const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    }
  }

  Session.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    token: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'sessions',
    modelName: 'Session',
    updatedAt: 'last_visit',
    createdAt: false,
  });

  Session.removeAttribute('id');

  return Session;
};

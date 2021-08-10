module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(19, 2),
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        // type: Sequelize.DATE,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.fn('NOW'),
        field: 'created_at',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};

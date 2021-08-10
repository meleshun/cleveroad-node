module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          user_id: 1,
          title: 'Notebook',
          price: 5500.00,
        },
        {
          user_id: 1,
          title: 'Laptop',
          price: 1200.00,
        },
        {
          user_id: 2,
          title: 'Table',
          price: 200.00,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Alex',
          email: 'alex@mail.com',
          phone: '+380999999999',
          password: '4f82544cbe235faa8725fd48f42b9efb6b4232b05f9337b1007b3b6da7b444771ff3ff9df33dd95f05d0c6ea6ba9dc5f81630cb6d623da6f36304b8c71fbcc77',
          salt: '89a95cd0c8d4622249406714003ec25e57449025b9ad22e8674806ac5e65410a6fbd04035d2e373d515c8d9530110c96e14d1c6e7989888c659a026d46205abf',
        },
        {
          name: 'Jane',
          email: 'jane@mail.com',
          password: '921a236ceff0d67fe893007a8b906c51aa9ac8eaf6968b0492d821c2d10d3ecb8af0576e2a315f0169caba2dad1ca904274f38380f3103447dd9fcedd9485c03',
          salt: 'fe9b981fec82302649f07294bf9ed852562a588cf4735ee61d33d50c85ca91b1fc83592fe2c53694d8c339cfa622fe60a13918e471bfeb4f8a4814deb6d55346',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};

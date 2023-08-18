'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'superadmin@gmail.com',
      password: 'It@@246357',
      firstName: 'Nguyễn Kim',
      lastName: 'Chí',
      address: 'Quận 9',
      phoneNumber: '0336293669',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

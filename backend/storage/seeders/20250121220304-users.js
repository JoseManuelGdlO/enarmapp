'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{ 
      id: 1,
      name: 'admin',
      last_name: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      picture: 'imgtest',
      user_type_id: 5,
      birthdate: '2025/01/12',
      gender: 'masculino',
    }], {});
    await queryInterface.bulkInsert('user_status', [{ 
      user_id: 1,
      name: 3,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('user_status', null, {});
  }
};

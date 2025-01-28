'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{ 
      name: 'admin',
      last_name: 'admin',
      email: '',
      password: '',
      picture: '',
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
  }
};

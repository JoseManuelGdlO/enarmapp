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
      id_user_type: 5,
      birthdate: '2025/01/12',
      gender: 'masculino',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_types', [
      { name: 'Estudiante' },
      { name: 'Médico Interno de Pregrado' },
      { name: 'Médico Pasante de Servicio Social' },
      { name: 'Médico General' },
      { name: 'Administrador' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_types', null, {});
  }
};

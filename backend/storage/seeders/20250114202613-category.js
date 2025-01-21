'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Medicina Interna' },
      { name: 'Cirugía' },
      { name: 'Pediatría' },
      { name: 'Medicina Familiar' },
      { name: 'Ginecología y Obstetricia' },
      { name: 'Cancerologia' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};

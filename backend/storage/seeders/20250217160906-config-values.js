'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('configs', [
      {
        code: 'EXAM_DATE',
        group: 'EXAM_2',
        type: 'string',
        value: '12/25/2025',
        description: 'dia del examen',
      },
      {
        code: 'EXAM_LOCATE',
        group: 'EXAM',
        type: 'boolean',
        value: 'true',
        description: 'boolean test',
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('configs', null, {});
  }
};

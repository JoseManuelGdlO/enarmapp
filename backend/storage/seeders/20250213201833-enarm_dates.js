'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('enarm_dates', [{ 
      year: 2024,
    },
    {
      year: 2025,
    },
    {
      year: 2026,
    },
    {
      year: 2027,
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('enarm_dates', null, {});
  }
};

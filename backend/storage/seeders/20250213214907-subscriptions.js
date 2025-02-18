'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subscriptions', [{ 
        type: 'Estandar',
        price: 160,
        description: 'plan mensual',
        month_duration: 6,
    },
    {
        type: 'Premium',
        price: 200,
        description: 'plan premium',
        month_duration: 6,
    },
    {
        type: 'Anual',
        price: 200,
        description: 'plan anual',
        month_duration: 6,
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscriptions', null, {});
  }
};

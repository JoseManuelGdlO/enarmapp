'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('universities', [{ 
      name: 'BENEMÉRITA UNIVERSIDAD AUTÓNOMA DE PUEBLA',
      country_id: 1,
      state: 'Puebla',
      is_public: 1,
    },
    {
      name: 'CAMPUS UNIVERSITARIO SIGLO XXI, S.C. (ESTADO DE MÉXICO)',
      country_id: 1,
      state: 'Estado de Mexico',
      is_public: 1,
    },
    {
      name: 'CENTRO UNIVERSITARIO DE CIENCIAS DE LA SALUD',
      country_id: 1,
      state: 'Jalisco',
      is_public: 1,
    },
    {
      name: 'CENTRO DE ESTUDIOS SUPERIORES DE TEPEACA, A.C.',
      country_id: 1,
      state: 'Puebla',
      is_public: 1,
    },
    {
      name: 'CENTRO DE ESTUDIOS UNIVERSITARIOS XOCHICALCO, A.C.',
      country_id: 1,
      state: 'Morelos',
      is_public: 1,
    }

  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('universities', null, {});
  }
};

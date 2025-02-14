'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('careers', [{ 
      name: 'ANESTESIOLOGÍA',
    },
    {
      name: 'ANGIOLOGÍA',
    },
    {
      name: 'CARDIOLOGÍA',
    },
    {
      name: 'CIRUGÍA',
    },
    {
      name: 'DERMATOLOGÍA',
    },
    {
      name: 'ENDOCRINOLOGÍA',
    },
    {
      name: 'EPIDEMIOLOGÍA',
    },
    {
      name: 'GASTROENTEROLOGÍA',
    },
    {
      name: 'GERIATRÍA',
    },
    {
      name: 'GINECOLOGÍA',
    },
    {
      name: 'HEMATOLOGÍA',
    },
    {
      name: 'INFECTOLOGÍA',
    },
    {
      name: 'MEDICINA FAMILIAR',
    },
    {
      name: 'MEDICINA INTERNA',
    },
    {
      name: 'NEFROLOGÍA',
    },
    {
      name: 'NEUMOLOGÍA',
    },
    {
      name: 'NEUROCIRUGÍA',
    },
    {
      name: 'NEUROLOGÍA',
    },
    {
      name: 'OFTALMOLOGÍA',
    },
    {
      name: 'ONCOLOGÍA',
    },
    {
      name: 'ORTOPEDIA',
    },
    {
      name: 'OTORRINOLARINGOLOGÍA',
    },
    {
      name: 'PEDIATRÍA',
    },
    {
      name: 'PSIQUIATRÍA',
    },
    {
      name: 'RADIOLOGÍA',
    },
    {
      name: 'REUMATOLOGÍA',
    },
    {
      name: 'TRAUMATOLOGÍA',
    },
    {
      name: 'UROLOGÍA',
    },
    {
      name: 'MEDICINA GENERAL',
    },
    {
      name: 'MEDICINA DEPORTIVA',
    },
    {
      name: 'MEDICINA ESTÉTICA',
    },
    {
      name: 'MEDICINA FORENSE',
    },
    {
      name: 'MEDICINA LEGAL',
    },
    {
      name: 'MEDICINA NUCLEAR',
    },

  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('careers', null, {});
  }
};

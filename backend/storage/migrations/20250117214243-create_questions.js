'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clinic_case_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'clinic_cases',
          },
          key: 'id',
        },
        allowNull: false,
      },
      order: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      question: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      highlight_start: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      highlight_end: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      summary: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      reference: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      active: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('questions');
  }
};

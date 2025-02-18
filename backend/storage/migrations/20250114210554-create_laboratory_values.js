'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('laboratory_values', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      laboratory_category_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'laboratory_categories',
          },
          key: 'id',
        },
        allowNull: false,
      },
      example: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      value: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('laboratory_values');
  }
};

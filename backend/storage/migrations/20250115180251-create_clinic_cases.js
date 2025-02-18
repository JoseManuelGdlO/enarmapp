'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('clinic_cases', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      subcategory_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'subcategories',
          },
          key: 'id',
        },
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      is_spanish: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('clinic_cases');
  }
};

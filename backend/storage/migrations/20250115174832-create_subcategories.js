'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('subcategories', {
      id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      name: {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
      },
      id_category: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'categories',
          },
          key: 'id',
        },
        allowNull: false,
    },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('subcategories');
  }
};

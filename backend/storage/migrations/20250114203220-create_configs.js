'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('configs', {
      id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      code: {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
          unique: true,
      },
      group: {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
      },
      type: {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
      },
      value: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
      },
      description: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('configs');
  }
};

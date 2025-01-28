'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('phrases', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      phrase: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      author: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('phrases');
  }
};

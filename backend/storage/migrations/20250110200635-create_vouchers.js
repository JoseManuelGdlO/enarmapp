'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('vouchers', {
      id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      name: {
          type: Sequelize.DataTypes.STRING(100),
          allowNull: false,
      },
      code: {
          type: Sequelize.DataTypes.STRING(20),
          allowNull: false,
      },
      discount: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
      },
      type: {
          type: Sequelize.DataTypes.ENUM('percentage', 'fixed'),
          allowNull: false,
      },
      usage_count: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
      },
      usage_limit: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
      },
      expiration_date: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('vouchers');
  }
};

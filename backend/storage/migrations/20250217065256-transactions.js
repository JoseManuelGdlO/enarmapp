'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        allowNull: false,
      },
      transaction_date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      finished_date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};

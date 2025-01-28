'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_status', {
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
      name: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },
  // 3 estatus.- nuevo = 0, prueba = 3, corriente=1, vencido=99, cancelado=88

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_status');
  }
};

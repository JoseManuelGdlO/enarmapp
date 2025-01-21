'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('universities', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      country_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'countries',
          },
          key: 'id',
        },
        allowNull: false,
      },
      state: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      is_public: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('universities');
  }
};

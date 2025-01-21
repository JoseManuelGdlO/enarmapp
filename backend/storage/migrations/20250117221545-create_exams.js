'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('exams', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_type: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'exam_types',
          },
          key: 'id',
        },
        allowNull: false,
      },
      id_user: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        allowNull: false,
      },
      dificulty: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      question_quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      is_spanish: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      creation_date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      study_mode: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      is_simulation: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('exams');
  }
};

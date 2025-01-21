'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('exam_questions', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_exam: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'exams',
          },
          key: 'id',
        },
        allowNull: false,
      },
      id_question: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'questions',
          },
          key: 'id',
        },
        allowNull: false,
      },
      id_answer: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'answers',
          },
          key: 'id',
        },
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('exam_questions');
  }
};

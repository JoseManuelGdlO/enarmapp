'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('answers', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      question_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'questions',
          },
          key: 'id',
        },
        allowNull: false,
      },
      answer: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      is_correct: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      feedback: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('answers');
  }
};

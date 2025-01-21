const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const ExamQuestion = sequelize.define('exam_questions',
  {
    id_exam: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'exams',
        },
        key: 'id',
      },
      allowNull: false,
    },
    id_question: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'questions',
        },
        key: 'id',
      },
      allowNull: false,
    },
    id_answer: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'answers',
        },
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = ExamQuestion;
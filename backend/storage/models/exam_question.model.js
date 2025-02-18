const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const ExamQuestion = sequelize.define('exam_questions',
  {
    exam_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'exams',
        },
        key: 'id',
      },
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'questions',
        },
        key: 'id',
      },
      allowNull: false,
    },
    answer_id: {
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
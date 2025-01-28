const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Answer = sequelize.define('answers',
  {
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
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Answer;
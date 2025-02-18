const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");
const Answer = require('./answer.model.js');

const Question = sequelize.define('questions',
  {
    clinic_case_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'clinic_cases',
        },
        key: 'id',
      },
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    highlight_start: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    highlight_end: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reference: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

Question.hasMany(Answer, { foreignKey: 'question_id'});

module.exports = Question;
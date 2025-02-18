const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const ExamType = sequelize.define('exam_types',
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = ExamType;
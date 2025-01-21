const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Score = sequelize.define('scores',
  {
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Score;
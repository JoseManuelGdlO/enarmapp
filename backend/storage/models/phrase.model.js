const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Phrase = sequelize.define('phrases',
  {
    phrase: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Phrase;
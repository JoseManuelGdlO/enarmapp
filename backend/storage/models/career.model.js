const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Career = sequelize.define('careers',
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

module.exports = Career;
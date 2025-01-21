const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const EnarmDate = sequelize.define('enarm_dates',
  {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = EnarmDate;
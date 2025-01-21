const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Country = sequelize.define('countries',
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

module.exports = Country;
const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Category = sequelize.define('categories',
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

module.exports = Category;
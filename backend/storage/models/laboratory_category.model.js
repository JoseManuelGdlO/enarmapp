const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const LaboratoryCategory = sequelize.define('laboratory_categories',
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

module.exports = LaboratoryCategory;
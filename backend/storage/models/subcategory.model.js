const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Subcategory = sequelize.define('subcategories',
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_category: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'categories',
        },
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Subcategory;
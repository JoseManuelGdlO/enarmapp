const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Subcategory = sequelize.define('subcategories',
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'categories',
        },
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Subcategory;
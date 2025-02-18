const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");
const Subcategory = require('./subcategory.model');

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

Category.hasMany(Subcategory, { foreignKey: 'category_id' });

module.exports = Category;
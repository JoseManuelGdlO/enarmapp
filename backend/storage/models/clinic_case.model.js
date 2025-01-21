const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const ClinicCase = sequelize.define('clininc_cases',
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'subcategories',
        },
        key: 'id',
      },
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_spanish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = ClinicCase;
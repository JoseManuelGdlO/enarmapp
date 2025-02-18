const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Config = sequelize.define('configs',
  {
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    group: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Config;
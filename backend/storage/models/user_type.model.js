const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const UserType = sequelize.define('user_types',
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

module.exports = UserType;
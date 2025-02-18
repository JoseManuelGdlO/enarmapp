const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Voucher = sequelize.define('vouchers',
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('percentage', 'fixed'),
      allowNull: false,
    },
    usage_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    usage_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Voucher;
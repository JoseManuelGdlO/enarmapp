const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Subscription = sequelize.define('transactions',
  {
    user_id: {
        type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'id',
      },
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    finished_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Subscription;
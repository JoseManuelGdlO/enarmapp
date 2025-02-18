const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const UserStatus = sequelize.define('user_status',
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
      unique: true,
    },
    name: {
      // 3 estatus.- nuevo = 0, prueba = 3, corriente=1, vencido=99, cancelado=88
      type: DataTypes.ENUM('new', 'test', 'active', 'expired', 'canceled'),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'user_status',
  },
);

module.exports = UserStatus;
const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const UserStatus = sequelize.define('user_status',
  {
    id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        allowNull: false,
      },
      name: {
        // 3 estatus.- nuevo = 0, prueba = 3, corriente=1, vencido=99, cancelado=88
        type: DataTypes.ENUM('new', 'test', 'active', 'expired', 'canceled'),
        allowNull: false,
      },
  },
  {
    timestamps: false,
  },
);

module.exports = UserStatus;
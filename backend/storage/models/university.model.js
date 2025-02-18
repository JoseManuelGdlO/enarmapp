const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const University = sequelize.define('universities',
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'countries',
        },
        key: 'id',
      },
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = University;
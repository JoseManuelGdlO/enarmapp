const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const User = sequelize.define('users',
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_subscription: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'subscriptions',
          },
          key: 'id',
        },
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_user_type: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'user_types',
          },
          key: 'id',
        },
        allowNull: false,
      },
      id_university: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'universities',
          },
          key: 'id',
        },
        allowNull: false,
      },
      id_enarm_date: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'enarm_dates',
          },
          key: 'id',
        },
        allowNull: false,
      },
      id_career: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'careers',
          },
          key: 'id',
        },
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('masculino', 'femenino'),
        allowNull: false,
      },
      id_social_media: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    timestamps: false,
  },
);

module.exports = User;
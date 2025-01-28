const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const User = sequelize.define('users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subscription_id: {
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
    user_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'user_types',
        },
        key: 'id',
      },
      allowNull: false,
    },
    university_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'universities',
        },
        key: 'id',
      },
      allowNull: false,
    },
    enarm_date_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'enarm_dates',
        },
        key: 'id',
      },
      allowNull: false,
    },
    career_id: {
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
    social_media_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = User;
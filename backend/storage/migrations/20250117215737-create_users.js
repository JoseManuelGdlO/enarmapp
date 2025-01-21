'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_subscription: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'subscriptions',
          },
          key: 'id',
        },
      },
      name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      picture: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      id_user_type: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'user_types',
          },
          key: 'id',
        },
        allowNull: false,
      },
      id_university: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'universities',
          },
          key: 'id',
        },
      },
      id_enarm_date: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'enarm_dates',
          },
          key: 'id',
        },
      },
      id_career: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'careers',
          },
          key: 'id',
        },
      },
      birthdate: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
      gender: {
        type: Sequelize.DataTypes.ENUM('masculino', 'femenino'),
        allowNull: false,
      },
      id_social_media: {
        type: Sequelize.DataTypes.STRING
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};

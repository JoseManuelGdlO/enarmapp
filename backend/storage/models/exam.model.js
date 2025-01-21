const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const Exam = sequelize.define('exams',
  {
    id_type: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'types',
        },
      },
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'users',
        },
      },
      allowNull: false,
    },
    dificulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_spanish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    creation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    study_mode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_simulation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

Exam.belongsTo(require('./type.model.js'), { foreignKey: 'id_type' });
Exam.belongsTo(require('./user.model.js'), { foreignKey: 'id_user' });

module.exports = Exam;
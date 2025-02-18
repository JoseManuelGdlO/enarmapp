const { DataTypes } = require('sequelize');
const sequelize = require("../conn.js");

const LaboratoryValue = sequelize.define('laboratory_values',
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    laboratory_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'laboratory_categories',
        },
        key: 'id',
      },
      allowNull: false,
    },
    example: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

LaboratoryValue.belongsTo(require('./laboratory_category.model.js'), { foreignKey: 'id_laboratory_category' });

module.exports = LaboratoryValue;
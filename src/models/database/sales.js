const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sales', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sales',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK_Sales_Id",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

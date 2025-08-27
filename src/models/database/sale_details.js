const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sale_details', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sales',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sale_details',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_SaleDetails_Id",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

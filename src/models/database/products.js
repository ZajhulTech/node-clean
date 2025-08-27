const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
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
    tableName: 'products',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK_Products_Id",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

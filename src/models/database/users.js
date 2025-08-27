const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "UQ_Users_UserName"
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING(150),
      allowNull: true
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
    tableName: 'users',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK_Users_Id",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UQ_Users_UserName",
        unique: true,
        fields: [
          { name: "userName" },
        ]
      },
    ]
  });
};

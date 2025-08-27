const DataTypes = require("sequelize").DataTypes;
const _products = require("../../models/database/products");
const _sale_details = require("../../models/database/sale_details");
const _sales = require("../../models/database/sales");
const _users = require("../../models/database/users");


function initModels(sequelize) {
  const products = _products(sequelize, DataTypes);
  const sale_details = _sale_details(sequelize, DataTypes);
  const sales = _sales(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  sale_details.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(sale_details, { as: "sale_details", foreignKey: "productId"});
  sale_details.belongsTo(sales, { as: "sale", foreignKey: "saleId"});
  sales.hasMany(sale_details, { as: "sale_details", foreignKey: "saleId"});

  return {
    products,
    sale_details,
    sales,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

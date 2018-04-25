/* eslint-disable */
const { conn } = require('./conn');
const Category = require('./models/Category');
const LineItem = require('./models/LineItem');
const Order = require('./models/Order');
const Product = require('./models/Product');
const User = require('./models/User');
const ProductCategory = require('./models/ProductCategory');

Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

// Category.hasMany(Product);
// Product.belongsTo(Category);
LineItem.belongsTo(Product);
Order.hasMany(LineItem, { as: 'lineItems', foreignKey: 'orderId' });
LineItem.belongsTo(Order, { as: 'order' });
User.hasMany(Order);
Order.belongsTo(User);

const sync = () => {
  return conn.sync({ force: true });
};

module.exports = {
  sync,
  models: {
    Category,
    LineItem,
    Order,
    Product,
    User
  }
};

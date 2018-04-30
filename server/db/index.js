/* eslint-disable */
const { conn } = require('./conn');
const Category = require('./models/Category');
const LineItem = require('./models/LineItem');
const Order = require('./models/Order');
const Product = require('./models/Product');
const User = require('./models/User');
const ProductCategory = require('./models/ProductCategory');
const Address = require('./models/Address');
const Review = require('./models/Review');
const CreditCard = require('./models/CreditCard');

Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

LineItem.belongsTo(Product);
Order.hasMany(LineItem, { as: 'lineItems', foreignKey: 'orderId' });
LineItem.belongsTo(Order, { as: 'order' });
User.hasMany(Order);
Order.belongsTo(User);

Address.belongsTo(User);
User.hasMany(Address);

Review.belongsTo(User);
Review.belongsTo(Product);

CreditCard.belongsTo(User);
User.hasMany(CreditCard);
CreditCard.belongsTo(Order);

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
    User,
    Address,
    Review,
    ProductCategory,
    CreditCard
  }
};

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

// Product.belongsToMany(Category, { through: ProductCategory, foreignKey: 'productId', as: 'products' });
// Category.belongsToMany(Product, { through: ProductCategory, foreignKey: 'categoryId', as: 'categories '});

ProductCategory.belongsTo(Product);
Product.hasMany(ProductCategory);
ProductCategory.belongsTo(Category);
Category.hasMany(ProductCategory);

LineItem.belongsTo(Product);
Order.hasMany(LineItem, { as: 'lineItems', foreignKey: 'orderId' });
LineItem.belongsTo(Order, { as: 'order' });
User.hasMany(Order);
Order.belongsTo(User);

Address.belongsTo(User);
User.hasMany(Address);

Review.belongsTo(User);
Review.belongsTo(Product);

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
    ProductCategory
  }
};

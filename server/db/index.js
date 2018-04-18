/* eslint-disable */
const { conn } = require('./conn')
const Category = require('./models/Category')
const LineItem = require('./models/LineItem')
const Order = require('./models/Order')
const Product = require('./models/Product')
const User = require('./models/User')
const faker = require('faker')

const sync = () => {
  return conn.sync({ force: true })
}

Category.hasMany(Product)
Product.belongsTo(Category)
Product.belongsTo(LineItem)
Order.hasMany(LineItem)
LineItem.belongsTo(Order)
User.hasMany(Order)
Order.belongsTo(User)

const generateCategory = () => {
  return {
    name: faker.commerce.name()
  }
}

// create generator functions for the rest of the models

const seed = () => {
  return Promise.all([
    //...
  ])
}

module.exports = {
  sync,
  seed,
  models: {
    Category,
    LineItem,
    Order,
    Product,
    User
  }
}

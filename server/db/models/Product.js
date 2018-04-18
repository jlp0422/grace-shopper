/* eslint-disable */
const { conn, Sequelize } = require('../conn')

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  // color
  // size
  // gender???
})

module.exports = Product;

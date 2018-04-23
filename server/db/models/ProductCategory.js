/* eslint-disable */
const { conn, Sequelize } = require('../conn');

const ProductCategory = conn.define('productcategory', {

}, {
  timestamps: false
})

module.exports = ProductCategory;

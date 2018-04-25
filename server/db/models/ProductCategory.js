/* eslint-disable */
const { conn, Sequelize } = require('../conn');

const ProductCategory = conn.define('product_category', {}, { timestamps: false });

module.exports = ProductCategory;

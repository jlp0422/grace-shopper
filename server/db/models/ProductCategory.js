/* eslint-disable */
const { conn, Sequelize } = require('../conn');

const ProductCategory = conn.define('product_category', {
  categoryId: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }

  }, {
    timestamps: false
  }
);

module.exports = ProductCategory;

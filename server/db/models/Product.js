/* eslint-disable */
const { conn, Sequelize } = require('../conn');

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Your product must have a name.'
      }
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Your product must have a price.'
      }
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Your product must have a quantity.'
      }
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Your product must have a description.'
      }
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://theroofershow.com/wp-content/plugins/recent-post-widget-thumbnail/assets/images/thumbnail-default-gold.png'
  }
}, {
  timestamps: false
})



module.exports = Product;

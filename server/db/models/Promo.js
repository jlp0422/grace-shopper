/* eslint-disable */
const { conn, Sequelize } = require('../conn');

const Promo = conn.define('promo', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Promotion code must have a name.'
      }
    }
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Promotion code must have a value.'
      }
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Promotion code must have a quantity.'
      }
    }
  }
}, {
    timestamps: false
})

module.exports = Promo;
/* eslint-disable */
const { conn, Sequelize } = require('../conn');

const CreditCard = conn.define('credit_card', {
  ccType: {
    type: Sequelize.STRING
  },
  ccNum: {
    type: Sequelize.STRING
  },
  ccExp: {
    type: Sequelize.STRING
  },
  ccSec: { // visa, mc, discover = 3 digits, amex = 4 digits
    type: Sequelize.STRING
  },
}, {
  timestamps: false
})

module.exports = CreditCard;

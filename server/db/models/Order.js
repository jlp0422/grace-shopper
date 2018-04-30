const { conn, Sequelize } = require('../conn');

const Order = conn.define('order', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  date: {
    type: Sequelize.DATE,
  },
  confirmation: {
    type: Sequelize.STRING,
    defaultValue: null
  }
}, {
  timestamps: false
})

Order.getCartForUser = function(user) {

}

module.exports = Order;

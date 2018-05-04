const { conn, Sequelize } = require('../conn');

const Order = conn.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart'
  },
  date: {
    type: Sequelize.DATE,
  }
}, {
  timestamps: false
})

Order.getCartForUser = function(user) {

}

module.exports = Order;

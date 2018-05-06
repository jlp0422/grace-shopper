const { conn, Sequelize } = require('../conn');

const { LineItem } = './LineItem';

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
  return this.findOne({ where: { userId: user.id } })
}

Order.getCartWithoutUser = function() {
  return this.findOne({ where: { userId: null } })
}

module.exports = Order;

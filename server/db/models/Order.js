const { conn, Sequelize } = require('../conn')

const Order = conn.define('order', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  date: {
    type: Sequelize.DATE,
  }
})

module.exports = Order;

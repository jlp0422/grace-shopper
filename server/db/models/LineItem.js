const { conn, Sequelize } = require('../conn');

const LineItem = conn.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
}, {
  timestamps: false
})

module.exports = LineItem;

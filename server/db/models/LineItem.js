const { conn, Sequelize } = require('../conn');

const LineItem = conn.define('line_item', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
}, {
  timestamps: false
})

module.exports = LineItem;

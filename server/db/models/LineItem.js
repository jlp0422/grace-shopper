const { conn, Sequelize } = require('../conn');

const LineItem = conn.define('line_item', {
  quantity: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
})

module.exports = LineItem;

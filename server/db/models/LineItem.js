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

LineItem.getItemsFromCart = function(cart) {
  return this.findAll({ where: { orderId: cart.id} })
}

LineItem.prototype.updateCartOnItem = function(cart, _cart) {
  return LineItem.update({ orderId: cart.id }, { where: { orderId: _cart.id } })
}

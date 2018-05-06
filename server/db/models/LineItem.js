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

  console.log('new cart:', cart, 'old cart:', _cart)

  return this.update({ orderId: cart.id }, { where: { orderId: _cart.id } })
}

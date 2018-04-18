/* eslint-disable */
const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  // color
  // size
  // gender???
})

/* eslint-disable */
const { conn, Sequelize } = require('../conn');

const Category = conn.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: false
})

module.exports = Category;

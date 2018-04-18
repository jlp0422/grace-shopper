const { conn, Sequelize } = require('../conn')

const User = conn.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  street: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  city: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  state: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  },
  zip: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

module.exports = User;

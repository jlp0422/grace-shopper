const { conn, Sequelize } = require('../conn');

const User = conn.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
   /* allowNull: false,
    validate: {
      notEmpty: true
    } */
  },
  street: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    /* allowNull: false,
    validate: {
      notEmpty: true
    } */
  },
  city: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    /* allowNull: false,
    validate: {
      notEmpty: true
    } */
  },
  state: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    /* allowNull: false,
    validate: {
      notEmpty: true
    } */
  },
  zip: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    /* allowNull: false,
    validate: {
      notEmpty: true
    } */
  }
}, {
  timestamps: false
})

module.exports = User;

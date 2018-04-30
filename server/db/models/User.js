const { conn, Sequelize } = require('../conn');
const jwt = require('jwt-simple');
const KEY = process.env.KEY

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
  ccType: {
    type: Sequelize.STRING
  },
  ccNum: {
    type: Sequelize.STRING
  },
  ccExp: {
    type: Sequelize.STRING
  },
  ccSec: { // visa, mc, discover = 3 digits, amex = 4 digits
    type: Sequelize.STRING
  },

}, {
  timestamps: false
})

User.authenticate = function(credentials) {
  const { username, password } = credentials
  return this.findOne({
    where: {
      username,
      password
    }
  })
  .then( user => {
    if (user) return jwt.encode({id: user.id}, KEY)
    throw { status: 401 }
  })
}

User.exchangeTokenForUser = function(token) {
  try {
    const userId = jwt.decode(token, KEY).id
    return this.findById(userId)
      .then( user => {
        if(user) return user
        throw { status: 401 }
      })
  }
  catch(ex) {
    return Promise.reject({
      status: 401
    })
  }
}

module.exports = User;

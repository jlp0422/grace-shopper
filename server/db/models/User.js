const { conn, Sequelize } = require('../conn');
const jwt = require('jwt-simple');
const { KEY } = require('../../../secret');
const { Order } = './Order'

const User = conn.define('user', {
  // id: {
  //   type: Sequelize.UUID,
  //   defaultValue: Sequelize.UUIDV4,
  //   primaryKey: true
  // },
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
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
}, {
  timestamps: false
})

User.createUserAndCart = function(user) {
  User.create(user)
    .then( newUser => {
      Order.create({ status: 'cart', date: null, userId: newUser.id })
      res.send(newUser)
    })
}

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

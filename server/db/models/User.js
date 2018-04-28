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
  }
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
    if (user) {
      return jwt.encode({id: user.id}, KEY)
    }
    throw { status: 401 }
  })
}

module.exports = User;

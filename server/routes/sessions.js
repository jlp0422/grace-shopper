const app = require('express').Router();
module.exports = app;
const { User, Order, LineItem } = require('../db').models
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const { KEY } = require('../../secret')

app.get('/:token', (req, res, next) => {
  User.exchangeTokenForUser(req.params.token)
    .then( user => res.send(user))
    .catch(next)
})

app.post('/', (req, res, next) => {
  let _user;
  let _items;
  let _cart;
  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      _user = user
      const hashPass = user.password
      bcrypt.compare(req.body.password, hashPass)
        .then(res => {
          if (res) return user
          throw { status: 401 }
        })
        .then(user => {
          const { username, password } = user
          User.authenticate({ username, password })
            .then(token => res.send(token))
        })
    })
    .then(() => Order.getCartWithoutUser())
    .then(cart => {
      _cart = cart
      return LineItem.getItemsFromCart(cart)
    })
    .then(items => {
      _items = items;
      return items;
    })
    .then(() => Order.getCartForUser(_user))
    .then(cart => {
      _items.forEach(item => item.updateCartOnItem(cart, _cart))
    })
    .catch(next)
})

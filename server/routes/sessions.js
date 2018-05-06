const app = require('express').Router();
const jwt = require('jwt-simple');
const { User, Order, LineItem } = require('../db').models
module.exports = app;

const KEY = process.env.KEY

app.get('/:token', (req, res, next) => {
  try {
    const id = jwt.decode(req.params.token, KEY).id
    User.findById(id)
      .then( user => {
        if (user) return res.send(user)
        const error = {status: 401}
        throw error
      })
  }
  catch (ex) {
    throw ex
  }
})

let _user;
let _items;
let _cart;
app.post('/', (req, res, next) => {
  User.findOne({ where: req.body })
    .then( user => {
      if (user) {
        _user = user
        const token = jwt.encode({ id: user.id }, KEY)
        return res.send(token)
      }
      const error = { status: 401 };
      throw error
    })
    .then(() => {
      return Order.getCartWithoutUser()
    })
    .then(cart => {
      _cart = cart
      // console.log('1-cart without user:', cart)
      return LineItem.getItemsFromCart(cart)
    })
    .then(items => {
      _items = items;
      // console.log('2-items from non-user cart:', items)
      return items;
    })
    .then(() => {
      // console.log('3-user:', _user)
      return Order.getCartForUser(_user)
    })
    .then(cart => {
      // console.log('4a-cart with user:', cart)
      // console.log('4b-cart without user:', _cart)
      _items.forEach(item => {
        // console.log('5a-item pre-update:', item)
        item.updateCartOnItem(cart, _cart)
        // console.log('5b-item post-update:', item)
      })
    })
    .catch(next)
})


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
      Order.getCartWithoutUser()
        .then(cart => {
          _cart = cart
          LineItem.getItemsFromCart(cart)
            .then(items => {
              _items = items;
              return items
            })
            .then(() => {
              Order.getCartForUser(_user)
                .then(cart => {
                  _items.forEach(item => {
                    console.log(cart)
                    console.log(item) // the item/s log/s!
                    return item.updateCartOnItem(cart, _cart)
                  })
                })
            })
        })
    })
    .catch(next)
})


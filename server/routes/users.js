const app = require('express').Router();
const { User, Order } = require('../db').models;
const bcrypt = require('bcrypt');
module.exports = app;

const saltRounds = 10;

app.get('/', (req, res, next) => {
  User.findAll({
    order: [[ 'lastName', 'ASC' ]]
  })
    .then(users => res.send(users))
    .catch(next);
});

let _user;
app.post('/', (req, res, next) => {
  let newPass = req.body.password
  let user;
  bcrypt.hash(newPass, saltRounds)
    .then(hashPass => {
      req.body.password = hashPass
      return req.body
    })
    .then(body => {
      User.create(body)
        .then( _user => {
          user = _user
          Order.create({ status: 'cart', userId: _user.id })
            .then(order => res.send(user))
          })
      })
      .catch(next)
});

app.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Object.assign(user, req.body)
      return user.save();
    })
    .then(user => res.send(user))
    .catch(next);
});

app.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});


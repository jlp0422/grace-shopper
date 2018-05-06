const app = require('express').Router();
const jwt = require('jwt-simple');
const { User } = require('../db').models
const bcrypt = require('bcrypt');
module.exports = app;
const KEY = process.env.KEY

app.get('/:token', (req, res, next) => {
  User.exchangeTokenForUser(req.params.token)
    .then( user => res.send(user))
    .catch(next)
  // try {
  //   const id = jwt.decode(req.params.token, KEY).id
  //   User.findById(id)
  //     .then( user => {
  //       if (user) return res.send(user)
  //       const error = {status: 401}
  //       throw error
  //     })
  // }
  // catch (ex) {
  //   throw ex
  // }
})

app.post('/', (req, res, next) => {
  User.findOne({ where: { username: req.body.username }})
    .then( user => {
      const hashPass = user.password
      bcrypt.compare(req.body.password, hashPass)
        .then( res => {
          if (res) return user
          throw { status: 401 }
        })
        .then( user => {
          const { username, password } = user
          User.authenticate({username, password})
            .then( token => res.send(token))
        })
    })
    .catch(next)
  // const { username, password } = req.body
  // const hash = bcrypt.hash(password, saltRounds)
  // bcrypt.compare(password, hash)
    // .then( res => console.log(res))
  // User.findOne({ where: req.body })
  //   .then( user => {
  //     if (user) {
  //       const token = jwt.encode({ id: user.id }, KEY)
  //       return res.send(token)
  //     }
  //     const error = { status: 401 };
  //     throw error
  //   })
  //   .catch(next)
})

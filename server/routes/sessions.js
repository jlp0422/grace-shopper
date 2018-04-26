const app = require('express').Router();
const jwt = require('jwt-simple');
const { User } = require('../db').models
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

app.post('/', (req, res, next) => {
  User.findOne({ where: req.body })
    .then( user => {
      if (user) {
        const token = jwt.encode({ id: user.id }, KEY)
        return res.send(token)
      }
      const error = { status: 401 };
      throw error
    })
    .catch(next)
})


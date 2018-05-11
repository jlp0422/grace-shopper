const app = require('express').Router();
module.exports = app;
const stripe = require('stripe')('sk_test_i1WQiMWphkAwtflNJjhTFNr4')

app.post('/', (req, res, next) => {
  // console.log('Stripe server:', req.body)
  stripe.charges.create(req.body, (err) => {
    if(err) {
      res.status(500).send(err)
    }
  })
})

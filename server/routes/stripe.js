const app = require('express').Router();
module.exports = app;

// const cors = require('cors');
// const bodyParser = require('body-parser');

// app.get('/', (req, res, next) => {

// })

const stripe = require('stripe')('sk_test_i1WQiMWphkAwtflNJjhTFNr4')

app.post('/', (req, res, next) => {
  let amount = 500;
  stripe.customers.create({
    // amount: req.body.amount,
    email: req.body.email,
    card: req.body.token
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "USD",
      customer: customer.id
    }))
  .then(charge => res.send(charge))
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  });
});

// app.listen(3000);

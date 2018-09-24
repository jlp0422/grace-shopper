require('dotenv').config();
const app = require('express').Router();
module.exports = app;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

app.post('/', (req, res, next) => {
  // console.log(req.body.source);
  const tokenId = req.body.source;
  stripe.charges.create(req.body)
    .then(() => res.status(200).send(tokenId))
});

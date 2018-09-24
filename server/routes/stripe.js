require('dotenv').config();
const app = require('express').Router();
module.exports = app;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

app.post('/', (req, res, next) => {
  stripe.charges.create(req.body)
    .then(() => res.sendStatus(200))
});

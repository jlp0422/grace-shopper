const app = require('express').Router();
module.exports = app;
const { Review } = require('../db').models;

app.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.send(reviews))
    .catch(next)
});

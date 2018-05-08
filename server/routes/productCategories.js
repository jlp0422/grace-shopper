const app = require('express').Router();
module.exports = app;
const { ProductCategory } = require('../db').models;

app.get('/', (req, res, next) => {
  ProductCategory.findAll()
    .then(productCategories => res.send(productCategories))
    .catch(next);
});



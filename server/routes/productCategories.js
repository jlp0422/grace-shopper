const app = require('express').Router();
module.exports = app;
const { ProductCategory } = require('../db').models;

app.get('/', (req, res, next) => {
  ProductCategory.findAll()
    .then(productCategories => res.send(productCategories))
    .catch(next);
});

app.post('/', (req, res, next) => {
  ProductCategory.create(req.body)
    .then(productCategory => res.send(productCategories))
    .catch(next);
});



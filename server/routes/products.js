const app = require('express').Router();
module.exports = app;
const { Product, Category, ProductCategory } = require('../db').models;

app.get('/', (req, res, next) => {
  Product.findAll({
    include: [{
      model: ProductCategory,
      include: [ Category ]
    }]
  })
    .then(products => res.send(products))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next);
});

app.put('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      Object.assign(product, req.body)
      return product.save();
    })
    .then(product => res.send(product))
    .catch(next);
});

app.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

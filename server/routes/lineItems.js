const app = require('express').Router();
module.exports = app;
const { LineItem, Product } = require('../db').models;

app.get('/', (req, res, next) => {
  LineItem.findAll({
    include: [ Product ]
  })
    .then(lineItems => res.send(lineItems))
    .catch(next);
});

app.post('/', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

app.put('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => {
      Object.assign(lineItem, req.body)
      return lineItem.save();
    })
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

app.delete('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => lineItem.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

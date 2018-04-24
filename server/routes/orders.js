const app = require('express').Router();
module.exports = app;
const { Order, LineItem } = require('../db').models;

app.get('/', (req, res, next) => {
  Order.findAll({
    include: [
      { model: LineItem , as: 'lineItems' }
    ]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.send(order))
    .catch(next);
});

app.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => {
      Object.assign(order, req.body)
      return order.save();
    })
    .then(order => res.send(order))
    .catch(next);
});

app.delete('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

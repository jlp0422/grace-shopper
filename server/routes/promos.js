const app = require('express').Router();
module.exports = app;
const { Promo } = require('../db').models;

app.get('/', (req, res, next) => {
  Promo.findAll()
    .then(promos => res.send(promos))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Promo.create(req.body)
  .then(promo => res.send(promo))
  .catch(next);
});

app.put('/:id', (req, res, next) => {
  Promo.findById(req.params.id)
  .then(promo => {
    Object.assign(promo, req.body)
    return promo.save();
  })
  .then(promo => res.send(promo))
  .catch(next);
});

app.delete('/:id', (req, res, next) => {
  Promo.findById(req.params.id)
  .then(promo => promo.destroy())
  .then(() => res.sendStatus(204))
  .catch(next);
});


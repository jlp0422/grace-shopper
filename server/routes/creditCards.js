const app = require('express').Router();
module.exports = app;
const { CreditCard } = require('../db').models;

app.get('/', (req, res, next) => {
  CreditCard.findAll()
    .then(creditCards => res.send(creditCards))
    .catch(next);
});

app.post('/', (req, res, next) => {
  CreditCard.create(req.body)
    .then(creditCard => res.send(creditCard))
    .catch(next);
});

app.delete('/:id', (req, res, next) => {
  CreditCard.findById(req.params.id)
    .then(creditCard => creditCard.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
})

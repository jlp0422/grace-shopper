const app = require('express').Router();
module.exports = app;
const { Product, Category, ProductCategory } = require('../db').models;

app.get('/', (req, res, next) => {
  Product.findAll(/*{
    include: [{
      model: ProductCategory,
      inlcude: [ Category ]
    }]
  }*/)
    .then(products => res.send(products))
    .catch(next);
});

app.post('/', (req, res, next) => {
  const { name, price, quantity, imageUrl, description, categoryArray } = req.body;
  const input = { name, price, quantity, imageUrl, description };
  let pcArray
  Product.create(input)
    .then(product => product.addCategories(categoryArray))
    .then(_pcArray => {
      pcArray = _pcArray
      return Product.findById(pcArray[0][0].productId)
    })
        .then(product => res.send({ product, pcArray }))
    .catch(next);
});

app.put('/:id', (req, res, next) => {
  const { name, price, quantity, imageUrl, description, categoryArray } = req.body;
  const { id } = req.params
  let pcArray
  Product.findById(id)
    .then(product => {
      Object.assign(product, req.body)
      console.log('****** PRODUCT *****', product.get())
      return product.save();
    })
    .then(product => product.addCategories(cate))
      //res.send({product, categoryArray}))
    .catch(next);
});

app.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

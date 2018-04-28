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
  // console.log(req.body)

  const { name, price, quantity, imageUrl, description } = req.body;
  const input = { name, price, quantity, imageUrl, description };

  // console.log(req.body);

  // console.log(req.body.categoryArray)

  Product.create(input)
    .then(product => {
      // console.log(req.body);
      // req.body.categoryArray.forEach(categoryId => {
        // return ProductCategory.create({ productId: product.id, categoryId })
      // })
      res.send(product)
    })
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

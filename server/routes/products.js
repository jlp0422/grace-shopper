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
  const input = { name, price, quantity, imageUrl, description };
  // let pcArray
  let _product;
  let pcArray;
  Product.findById(id)
    .then(product => {
      Object.assign(product, input)
      // console.log('****** PRODUCT *****', product.get())
      return product.save();
    })
    // .then(product => res.send(product))
    .then(product => {
      _product = product
      return product.getCategories()
    })
      // res.send({product, categoryArray})
    .then(categories => {
      // console.log
      // console.log(_product)
      // console.log(categories)
      return _product.removeCategories(categories)
      // console.log(_product)
    })
    // .then(something => console.log(something))
    .then(() => {
      return _product.addCategories(categoryArray)
      // return _product;
    })
    // .then(product => {
      // _product = product;
      // return product.getCategories()
    // })
    .then(_pcArray => {
      // console.log(_pcArray)
      pcArray = _pcArray
      // return Product.findById(pcArray[0][0].productId)
      return _product;
    })
    .then(product => res.send({ product, pcArray }))
    // .then(_pcArray => {
    //   pcArray = _pcArray
    //   return Product.findById(pcArray[0][0].productId)
    // })
    // .then(product => res.send({ product, pcArray }))
    .catch(next);
});

app.delete('/:id', (req, res, next) => {
  let _product;
  Product.findById(req.params.id)
    .then(product => {
      _product = product
      return product.getCategories()
      // return product.destroy()
    })
    .then(categories => _product.removeCategories(categories))
    .then(() => _product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

const app = require('express').Router();
module.exports = app;

app.use('/categories', require('./categories'));
app.use('/lineitems', require('./lineItems'));
app.use('/orders', require('./orders'));
app.use('/products', require('./products'));
app.use('/users', require('./users'));
app.use('/sessions', require('./sessions'));
app.use('/addresses', require('./addresses'));
app.use('/reviews', require('./reviews'));
app.use('/productCategories', require('./productCategories'));
app.use('/creditCards', require('./creditCards'));

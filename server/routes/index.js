const app = require('express').Router();
module.exports = app;

app.use('/categories', require('./categories'));
app.use('/lineitems', require('./lineItems'));
app.use('/orders', require('./orders'));
app.use('/products', require('./products'));
app.use('/users', require('./users'));
app.use('/sessions', require('./sessions'));
app.use('/addresses', require('./addresses'));

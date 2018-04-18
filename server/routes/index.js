const app = require('express').Router()
module.exports = app;

app.use('/categories', require('./categories'))
app.use('/lineitems', require('./lineitems'))
app.use('/orders', require('./orders'))
app.use('/products', require('./products'))
app.use('/users', require('./users'))

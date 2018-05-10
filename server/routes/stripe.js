const app = require('express').Router();
const cors = require('cors');
module.export = app;

// app.use(cors());

app.post('/', cors(), (req, res, next) => {

});

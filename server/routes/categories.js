const app = require('express').Router()
module.exports = app;

app.get('/', (res, res, next) => {
    Category.findAll()
        .then (categories => res.send(categories))
        .catch(next);
})

app.post('/', (req, res, next) => {
    Category.create(req.body)
        .then(category => res.send(category))
        .catch(next);
})

app.put('/:id', (req, res, next) => {
    Category.findById(req.params.id)
        .then(category => {
            Object.assign(category, req.body);
            return category.save();
        })
        .then(category => res.send(category))
        .catch(next);
})

app.delete('/:id', (req, res, next) => {
    Category.findbyId(req.params.id)
        .then(category => {
            return category.destroy()    
        })
        .then(() => res.sendStatus(204))
        .catch(next);
})


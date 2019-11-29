const itemsRouter = require('express').Router()
const Item = require('../models/items')

/**** DATABASE METHODS ****/
//get entry page
itemsRouter.get('/', (req, res) => {
  Item.find({}).then(items => {
    res.json('<p>hello world</p>')
  })
})

//access all items
itemsRouter.get('/items', (req, res) => {
  Item.find({}).then(items => {
    res.json(items)
  })
})

//access specific item
itemsRouter.get('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      if(item) {
        res.json(item.toJSON())
      } else {
        res.status(404).end()
      }
    })
})

module.exports = itemsRouter
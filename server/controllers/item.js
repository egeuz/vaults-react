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

itemsRouter.put('/:id', (req, res, next) => {
  const {item, memory} = req.body
  const newItem = {
    ...item,
    memories: [...item.memories, memory]
  }
  Item.findByIdAndUpdate(req.params.id, newItem, {new: true})
  .then(updatedNote => {
    res.send(updatedNote.toJSON())
  })
  .catch(error => next(error))
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
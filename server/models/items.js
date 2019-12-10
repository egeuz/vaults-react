const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: String,
  sprite: String,
  memories: [String],
  x: Number,
  y: Number
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
  }
})

module.exports = mongoose.model('Item', itemSchema)
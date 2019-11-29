const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.connect(url, {useNewUrlParser: true})
.then(result => {
  console.log('connected to database')
})
.catch(error => {
  console.log('error connecting to mongoDB: ' + error.message)
})

const itemSchema = new mongoose.Schema({
  name: String,
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
  }
})

module.exports = mongoose.model('Item', itemSchema)
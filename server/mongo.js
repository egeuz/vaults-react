const mongoose = require('mongoose')
const config = require('./utils/config')
const Item = require('./models/items')

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})

const item = new Item({
  name: 'jacket'
})

item.save().then(response => {
  console.log('note saved!')
  mongoose.connection.close()
})
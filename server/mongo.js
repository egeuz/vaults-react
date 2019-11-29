const mongoose = require('mongoose')

const url ='mongodb+srv://egeuz:egeuz@vaults-database-kksxz.mongodb.net/vaults-database?retryWrites=true&w=majority'

mongoose.connect(url, {useNewUrlParser: true})

const itemSchema = new mongoose.Schema({
  name: String,
})

const Item = mongoose.model('Item', itemSchema)

const item = new Item({
  name: 'jacket'
})

item.save().then(response => {
  console.log('note saved!')
  mongoose.connection.close()
})
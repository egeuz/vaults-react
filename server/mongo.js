const mongoose = require('mongoose')
const config = require('./utils/config')
const Item = require('./models/items')

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})

const itemNames = [
  "apple", "bed", "bowl", "camera", "chair", "clock", "comb", "couch", "doll", "duck", "flowers", "glasses", "ipod", "knife", "milk", "mirror", "pen", "perfume", "piano", "purse", "radio", "slippers", "table", "television", "toilet", "vase", "watch", "water"
]

const items = itemNames.map(itemName => new Item({
  name: itemName,
  sprite: `../assets/items/${itemName}.png`,
  memories: [],
  x: 0,
  y: 0
}))

items.forEach((item, index) => {
  item.save().then(response => {
    console.log(item.name + " saved!")
    if (index === items.length - 1) mongoose.connection.close()
  })
})
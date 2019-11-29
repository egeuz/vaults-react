/**** SETUP ****/
const express = require('express') //node web app framework
require('dotenv').config() //enable environment variables
const Item = require('./models/items') //our mongodb data model


/**** MIDDLEWARE ****/
const bodyParser = require('body-parser') //body parsing middleware
const cors = require('cors') //allows cross-origin data exchange
const logger = require('morgan') //logs http requests

/**** INIT EXPRESS AND MIDDLEWARE ****/
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))


/**** DATABASE METHODS ****/
//fetch all available data in database, etc.
app.get('/', (req, res) => {
  Item.find({}).then(items => {
    res.json('<p>hello world</p>')
  })
})

app.get('/items', (req, res) => {
  Item.find({}).then(items => {
    res.json(items)
  })
})

/**** LISTEN ON PORT ****/
const PORT = process.env.PORT || 3001
//|| 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`)
})
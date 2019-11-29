/**** SETUP****/
const express = require('express')
const config = require('./utils/config')
const mongoose = require('mongoose')
const app = express()

/**** MIDDLEWARE ****/
const bodyParser = require('body-parser')
const cors = require('cors')

/**** ROUTERS ****/
const itemsRouter = require('./controllers/item')

/**** CONNECT TO DATABASE ****/
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
.then(() => {
  console.log('connected to MongoDB')
})
.catch(error => {
  console.log('error connection to MongoDB', error.message)
})

/**** INITIALIZE APP ****/
app.use(cors())
// app.use(express.static('build')) //activate for production
app.use(bodyParser.json())
app.use('/', itemsRouter)

module.exports = app
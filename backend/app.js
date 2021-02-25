const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://richardOven:V0EvvrcoK7pBX8jA@cluster0.ymmw4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!')
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!')
    console.log(error)
  })
const path = require('path')
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-reqed-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/sauce', sauceRoutes)
app.use('/api/auth', userRoutes)

module.exports = app

// Fast, minimalist web framework
const express = require('express')
// Body parsing middleware
const bodyParser = require('body-parser')
// So Pekocko Web App
const app = express()
// Mongoose for DataBase connection
const mongoose = require('mongoose')
// Establishing Secure DataBase Connection
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb+srv://richardOven:V0EvvrcoK7pBX8jA@cluster0.ymmw4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!')
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!')
    console.log(error)
  })
// Express-Mongo-Sanitize sanitizes user-supplied data to prevent MongoDB Operator Injection
const expressMongoSanitize = require('express-mongo-sanitize')
const path = require('path')
// dotenv - Environment separator
require('dotenv').config()
// Helmet - Secures Express App
const helmet = require('helmet')

// Routes
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

// Authorizing Access and Removing Cross Origin Resource Sharing (CORS) error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-reqed-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(bodyParser.json())
app.use(expressMongoSanitize({ replaceWith: '_' }))
app.use(helmet())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/sauce', sauceRoutes)
app.use('/api/auth', userRoutes)

// Exporting the web application
module.exports = app

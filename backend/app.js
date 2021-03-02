// Fast, minimalist web framework
const express = require('express')

// Body parsing middleware
const bodyParser = require('body-parser')

// Mongoose for DataBase (MongoDB) connection
const mongoose = require('mongoose')

// Path module
const path = require('path')

// Storing configuration in the environment separate from code (.env file)
require('dotenv').config()

// Helps to secure Express apps by setting various HTTP headers
const helmet = require('helmet')

// Sanitizes user-supplied data to prevent MongoDB Operator Injection
const mongoSanitize = require('express-mongo-sanitize')

// Routes
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

// So Pekocko Web App
const app = express()

// Authorizing Access and Removing Cross Origin Resource Sharing (CORS) error
const cors = require('cors')
// Allowed origin has been given because Back-end (localhost:3000) was not able to communicate with Front-end (127.0.0.1:8081)
const allowedOrigin = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8081', 'http://127.0.0.1:8081']
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigin.indexOf(origin) === -1) {
      const message = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.'
      return callback(new Error(message), false)
    }
    return callback(null, true)
  },
  exposedHeaders: ['Origin, X-Requested-With, Content, Content-Length, Accept, Content-Type, Authorization'],
  credentials: true
}))

// Establishing Secure DataBase Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ymmw4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('Connected to Database Successfully!')
})
// Indexing database
mongoose.set('useCreateIndex', true)

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(mongoSanitize({ replaceWith: '_' }))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)

// Exporting the web application
module.exports = app

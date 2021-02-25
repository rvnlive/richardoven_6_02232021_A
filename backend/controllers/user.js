const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const buffering = new Buffer.from(req.body.email)
      const emailCaching = buffering.toString('base64')
      const user = new User({
        email: emailCaching,
        password: hash
      })
      user.save().then(
        () => {
          res.status(201).json({
            message: 'User has been added!'
          })
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          })
        }
      )
    }
  )
}

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!')
        })
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            })
          }
          const token = jwt.sign({ userId: user._id }, `${process.env.DB_USER}`, { expiresIn: '24h' })
          res.status(200).json({
            userId: user._id,
            token: token
          })
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          })
        }
      )
    }
  )
}

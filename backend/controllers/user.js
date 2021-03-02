// Library for password hashing
const bcrypt = require('bcrypt')

// Secret or Private Key (Token) generator for verification purpose
const jwt = require('jsonwebtoken')

// Masking Sensitive User Input (Email)
const MaskData = require('maskdata')

// User models
const User = require('../models/user')

// SignUp function
exports.signup = (req, res, next) => {
  const email = req.body.email
  const maskedEmail = MaskData.maskEmail2(email)
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const user = new User({
        email: maskedEmail,
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
          res.status(400).json({
            error: error
          })
        }
      )
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      })
    }
  )
}

// LogIn function
exports.login = (req, res, next) => {
  const email = req.body.email
  const maskedEmail = MaskData.maskEmail2(email)
  User.findOne({ email: maskedEmail }).then(
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
          const token = jwt.sign({ userId: user._id }, 'RANDOM_SECRET_TOKEN', { expiresIn: '24h' })
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
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      })
    }
  )
}

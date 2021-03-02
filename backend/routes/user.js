// Fast, minimalist web framework
const express = require('express')

// Forwarding the supported requests
const router = express.Router()

// Controller
const userController = require('../controllers/user')

// Basic logic is:
// Creating a route for a method: from this end (/signup) closing at the end
// with the function controller attached with the containing function (userController.signup)
router.post('/signup', userController.signup)
router.post('/login', userController.login)

module.exports = router

// Fast, minimalist web framework
const express = require('express')

// Forwarding the supported requests
const router = express.Router()

// Removing Cross Origin Resource Sharing (CORS) error
const cors = require('cors')

// Controller
const sauceController = require('../controllers/sauce.js')

// Middleware for authentication
const auth = require('../middleware/auth')

// Middleware for handling multipart/form-data
const multer = require('../middleware/multer-config')

// Basic logic is:
// Creating a route for a method: from this end (/) with helping/additional middleware (plugin) (CORS, Authentication, Multer)
// closing at the end with the function controller attached with the containing function (sauceController.createSauce)
router.post('/', cors(), auth, multer, sauceController.createSauce)
router.put('/:id', cors(), auth, multer, sauceController.modifyTheSauce)
router.delete('/:id', cors(), auth, sauceController.deleteTheSauce)
router.get('/', cors(), auth, sauceController.getAllSauces)
router.get('/:id', cors(), auth, sauceController.getOneSauce)
router.post('/:id/like', cors(), auth, sauceController.likeDislikeOneSauce)

module.exports = router

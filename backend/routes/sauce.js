const express = require('express')
const router = express.Router()
const cors = require('cors')
const sauceController = require('../controllers/sauce.js')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/', cors(), auth, multer, sauceController.createSauce)
router.put('/:id', cors(), auth, multer, sauceController.modifyTheSauce)
router.delete('/:id', cors(), auth, sauceController.deleteTheSauce)
router.get('/', cors(), auth, sauceController.getAllSauces)
router.get('/:id', cors(), auth, sauceController.getOneSauce)
router.post('/:id/like', cors(), auth, sauceController.likeDislikeOneSauce)

module.exports = router

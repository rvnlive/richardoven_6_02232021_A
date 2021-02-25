const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const sauceController = require('../controllers/sauce.js')

router.get('/', auth, sauceController.getAllSauces)
router.post('/', auth, multer, sauceController.createSauce)
router.get('/:id', auth, sauceController.getOneSauce)
router.put('/:id', auth, multer, sauceController.modifyTheSauce)
router.delete('/:id', auth, sauceController.deleteTheSauce)
router.post('/:id/like', auth, sauceController.likeDislikeOneSauce)

module.exports = router

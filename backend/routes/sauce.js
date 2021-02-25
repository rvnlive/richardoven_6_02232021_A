const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const sauceController = require('../controllers/sauce')

router.get('/', auth, sauceController.getAllSauces)
router.post('/', auth, multer, sauceController.createSauce)
router.get('/:id', auth, sauceController.getOneSauce)
router.put('/:id', auth, multer, sauceController.modifyTheSauce)
router.delete('/:id', auth, sauceController.deleteTheSauce)

module.exports = router

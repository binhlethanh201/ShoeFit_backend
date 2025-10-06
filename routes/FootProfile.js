const express = require('express')
const router = express.Router()
const footProfileController = require('../controllers/FootProfileController')

router.get('/', footProfileController.getAll)

module.exports = router

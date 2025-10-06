const express = require('express')
const router = express.Router()
const userImageController = require('../controllers/UserImageController')

router.get('/', userImageController.getAll)

module.exports = router

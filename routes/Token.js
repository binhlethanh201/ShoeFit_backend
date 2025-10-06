const express = require('express')
const router = express.Router()
const tokenController = require('../controllers/TokenController')

router.get('/', tokenController.getAll)

module.exports = router

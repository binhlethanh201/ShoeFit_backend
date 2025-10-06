const express = require('express')
const router = express.Router()
const storeController = require('../controllers/StoreController')

router.get('/', storeController.getAll)

module.exports = router

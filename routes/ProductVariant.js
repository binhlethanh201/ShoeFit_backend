const express = require('express')
const router = express.Router()
const productVariantController = require('../controllers/ProductVariantController')

router.get('/', productVariantController.getAll)

module.exports = router

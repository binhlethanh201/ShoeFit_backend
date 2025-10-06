const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')

router.get('/', productController.getAll)
router.get('/:_id', productController.getById)

module.exports = router

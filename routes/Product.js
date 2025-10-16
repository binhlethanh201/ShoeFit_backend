const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')
const verifyToken = require('../middleware/auth')

router.get('/', productController.getAll)
router.get('/:_id', productController.getById)
router.post('/',verifyToken, productController.create)
router.put('/:_id',verifyToken,productController.update)
router.delete('/:_id',verifyToken,productController.delete)

module.exports = router

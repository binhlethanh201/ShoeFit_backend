const express = require('express')
const router = express.Router()
const productVariantController = require('../controllers/ProductVariantController')
const verifyToken = require('../middleware/auth')

router.get('/', productVariantController.getAll)
router.get('/:_id', productVariantController.getById)
router.post('/',verifyToken,productVariantController.create)
router.put('/:_id',verifyToken,productVariantController.update)
router.delete('/:_id',verifyToken,productVariantController.delete)

module.exports = router

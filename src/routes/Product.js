const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')
const verifyToken = require('../middleware/auth')

// Public: Ai cũng xem được sản phẩm
router.get('/', productController.getAll)
router.get('/:_id', productController.getById)

// Protected: Chỉ Admin/Store mới được thêm, sửa, xóa
router.post('/', verifyToken, productController.create)
router.put('/:_id', verifyToken, productController.update)
router.delete('/:_id', verifyToken, productController.delete)

module.exports = router
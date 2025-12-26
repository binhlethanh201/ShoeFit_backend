const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/CategoryController')
const verifyToken = require('../middleware/auth')

// Public: Lấy danh mục để hiển thị menu
router.get('/', categoryController.getAll)
router.get('/:_id', categoryController.getById)

// Protected: Quản lý danh mục
router.post('/', verifyToken, categoryController.create)
router.put('/:_id', verifyToken, categoryController.update)
router.delete('/:_id', verifyToken, categoryController.delete)

module.exports = router
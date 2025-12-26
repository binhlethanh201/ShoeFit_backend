const express = require('express')
const router = express.Router()
const styleTipController = require('../controllers/StyleTipController')
const verifyToken = require('../middleware/auth')

// Public: User xem gợi ý phối đồ
router.get('/', styleTipController.getAll)
router.get('/:_id', styleTipController.getById)

// Protected: Admin tạo bài viết style
router.post('/', verifyToken, styleTipController.create)
router.put('/:_id', verifyToken, styleTipController.update)
router.delete('/:_id', verifyToken, styleTipController.delete)

module.exports = router
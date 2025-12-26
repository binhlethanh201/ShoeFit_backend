const express = require('express')
const router = express.Router()
const feedbackController = require('../controllers/FeedbackController')
const verifyToken = require('../middleware/auth')

// Public: Xem đánh giá sản phẩm
router.get('/', feedbackController.getAll)

// Protected: Phải đăng nhập mới được viết đánh giá
router.post('/', verifyToken, feedbackController.create)

// Protected: Admin xóa đánh giá spam
router.delete('/:_id', verifyToken, feedbackController.delete)

module.exports = router
const express = require('express')
const router = express.Router()
const aiGenerationController = require('../controllers/AIGenerationController')
const verifyToken = require('../middleware/auth')

// Protected: User phải đăng nhập mới được xem lịch sử và tạo ảnh AI
router.get('/', verifyToken, aiGenerationController.getAll)
router.get('/:_id', verifyToken, aiGenerationController.getById)
router.post('/', verifyToken, aiGenerationController.create)
router.put('/:_id', verifyToken, aiGenerationController.update) // Thường dùng để update status từ Webhook
router.delete('/:_id', verifyToken, aiGenerationController.delete)

module.exports = router
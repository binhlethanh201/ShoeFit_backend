const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const verifyToken = require('../middleware/auth')

// Lấy danh sách user (Thường chỉ Admin mới được quyền)
router.get('/', verifyToken, userController.getAll)

// Lấy chi tiết user (User xem profile của chính mình hoặc Admin xem)
router.get('/:_id', verifyToken, userController.getById)

// Tạo user mới (Thường dùng cho Admin tạo thủ công, đăng ký public sẽ dùng AuthRouter riêng)
router.post('/', userController.create)

// Cập nhật thông tin
router.put('/:_id', verifyToken, userController.update)

// Xóa user (Soft delete / Deactivate)
router.delete('/:_id', verifyToken, userController.delete)

module.exports = router
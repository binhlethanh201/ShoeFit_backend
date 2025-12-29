const express = require('express');
const router = express.Router();
const { checkAuth, isAdmin } = require('../middleware/auth'); // Import middleware

// Áp dụng checkAuth (phải đăng nhập) và isAdmin (phải là admin) cho TẤT CẢ routes bên dưới
router.use(checkAuth, isAdmin);

// Route này chỉ Admin mới gọi được
router.get('/dashboard-stats', (req, res) => {
    res.json({ success: true, message: "Đây là dữ liệu mật của Admin" });
});

router.get('/users', (req, res) => {
    // Logic lấy danh sách user
    res.json({ success: true, message: "Admin quản lý user" });
});

module.exports = router;
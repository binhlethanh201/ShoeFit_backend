const express = require('express');
const router = express.Router();
const { checkAuth, isStore } = require('../middleware/auth');

// Chỉ Store mới gọi được
router.use(checkAuth, isStore);

router.get('/my-products', (req, res) => {
    res.json({ success: true, message: "Danh sách sản phẩm của Store" });
});

module.exports = router;
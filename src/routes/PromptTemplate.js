const express = require('express')
const router = express.Router()
const promptTemplateController = require('../controllers/PromptTemplateController')
const verifyToken = require('../middleware/auth')

// Protected: Thường chỉ Admin quản lý template, hoặc Backend gọi nội bộ
router.get('/', verifyToken, promptTemplateController.getAll)
router.get('/:_id', verifyToken, promptTemplateController.getById)
router.post('/', verifyToken, promptTemplateController.create)
router.put('/:_id', verifyToken, promptTemplateController.update)
router.delete('/:_id', verifyToken, promptTemplateController.delete)

module.exports = router
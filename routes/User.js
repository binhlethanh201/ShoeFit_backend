const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const verifyToken = require('../middleware/auth')

router.get('/profile', verifyToken, userController.getProfile)
router.get('/', userController.getAll)
module.exports = router

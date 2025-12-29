const express = require('express')
const router = express.Router()
const authController = require('../controllers/AuthController')
const { checkAuth } = require('../middleware/auth') 

// POST /api/auth/register
router.post('/register', authController.register)

// POST /api/auth/login
router.post('/login', authController.login)

// POST /api/auth/forgot-password
router.post('/forgot-password', authController.forgotPassword)


// --- PROTECTED ROUTES ---
// GET /api/auth/me
router.get('/me', checkAuth, authController.getProfile)

// PUT /api/auth/me
router.put('/me', checkAuth, authController.updateProfile)

// PUT /api/auth/password
router.put('/password', checkAuth, authController.updatePassword)

// PUT /api/auth/role
router.put('/role', checkAuth, authController.changeRole)

module.exports = router